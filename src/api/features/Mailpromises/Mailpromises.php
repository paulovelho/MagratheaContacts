<?php
namespace MagratheaContacts\Mailpromises;

use Magrathea2\Logger;
use MagratheaContacts\Cronlogs\CronLog;
use MagratheaContacts\Email\Email;
use MagratheaContacts\Templates\Templates;

class Mailpromises extends \MagratheaContacts\Mailpromises\Base\MailpromisesBase {

	public function __construct($id=0){
		parent::__construct($id);
	}

	/**
	 * Gets the values sent for the template placeholders (vars JSON column)
	 * @return array	[ "var_name" => "value", ... ]
	 */
	public function GetVars(): array {
		if(empty($this->vars)) return [];
		$decoded = json_decode($this->vars, true);
		return is_array($decoded) ? $decoded : [];
	}
	public function SetVars(array $vars): Mailpromises {
		$this->Set("vars", json_encode($vars, JSON_FORCE_OBJECT));
		return $this;
	}

	/**
	 * Renders the promise into a `mail` row, ready for the send queue.
	 * Subject comes from the promise itself (resolved at /add time);
	 * message comes from the promise override or the template's content.
	 * Both go through placeholder replacement with the promise's vars.
	 * On failure: promise is still marked processed, mail_id stays NULL
	 * (the "failed" signature), and the error is logged.
	 * @return array	result info for logging
	 */
	public function Process(): array {
		$log = CronLog::Instance();
		$rs = ["promise" => $this->id];
		try {
			$template = $this->GetTemplates();
			if(empty($template->id)) throw new \Exception("template [".$this->template_id."] not found");
			if(!$template->active) throw new \Exception("template [".$template->name."] is not active");
			if(!empty($this->msg_subject)) $template->msg_subject = $this->msg_subject;
			if(!empty($this->message)) $template->content = $this->message;
			$rendered = $template->Render($this->GetVars());

			$mail = new Email();
			$mail->source_id = $this->source_id;
			$mail->origin_key = $this->origin_key;
			$mail->mail_type = $this->mail_type;
			$mail->email_from = $this->email_from;
			$mail->email_replyTo = $this->email_replyTo;
			$mail->email_to = $this->email_to;
			$mail->msg_subject = $rendered["subject"];
			$mail->message = $rendered["message"];
			$mail->priority = $this->priority;
			$mail->Insert();

			$this->Set("mail_id", $mail->id);
			$rs["success"] = true;
			$rs["mail_id"] = $mail->id;
			$log->Add("promise [".$this->id."] rendered into mail [".$mail->id."]");
		} catch(\Exception $ex) {
			$rs["success"] = false;
			$rs["error"] = $ex->getMessage();
			Logger::Instance()->Log(">===> Error processing promise: [id: ".$this->id."] >=> [".$ex->getMessage()."] >===>");
			$log->Error("error processing promise [".$this->id."]", $ex->getMessage());
		}
		// Set() (not plain assignment) so the fields are marked dirty: when the promise
		// was just built in memory (/add with process=1), SetVars() already dirtied `vars`
		// and Update() would otherwise persist only the dirty fields
		$this->Set("processed", true);
		$this->Set("processed_date", \Magrathea2\now());
		$this->Save();
		return $rs;
	}

}
