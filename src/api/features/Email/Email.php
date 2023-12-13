<?php

namespace MagratheaContacts\Email;

use Magrathea2\ConfigApp;
use Magrathea2\Logger;
use Magrathea2\MagratheaMail;
use Magrathea2\MagratheaMailSMTP;
use MagratheaContacts\Apikey\Apikey;
use MagratheaContacts\Apikey\ApikeyControl;
use MagratheaContacts\Smtp\Smtp;
use MagratheaContacts\Source\Source;

class Email extends \MagratheaContacts\Email\Base\EmailBase {

	public $content_type = "text/html";
	
/* sent status:
0 = not sent
1 = sent
2 = error
3 = test (not error, not sent)
4 = simulated
*/
	public function GetStatus(): EnumSentStatus {
		return EnumSentStatus::from($this->sent_status);
	}

	public function Insert() {
		$this->add_date = \Magrathea2\now();
		$this->sent_status = 0;
		$apikeyControl = new ApikeyControl();
		$apikeyControl->IncreaseUse($this->origin_key);
		parent::Insert();
	}

	public function Process() {
		try {
			$rs = $this->Send();
			if($rs["success"]) {
				Logger::Instance()->Log(">===> Sending mail: [id: ".$this->id.", to: ".$this->to."] >===>");
			} else {
				$this->priority = $this->priority - 1;
				if($this->priority < 0) $this->priority = 0;
				$this->Save();
				Logger::Instance()->Log(">===> Error mail: [id: ".$this->id.", to: ".$this->to."] >=> [".$rs["error"]."] >===>");
			}
		} catch(\Exception $ex) {
			throw $ex;
		}
		return $rs;
	}

	public function ShouldSimulate(): bool {
		$apikey = ApikeyControl::GetByKey($this->origin_key);
		return $apikey->simulate;
	}

	public function IsSimulation(): bool {
		$simulate = ConfigApp::Instance()->GetBool("simulate", false);
		if($simulate) return true;
		$api = new Apikey($this->origin_key);
		return $api->simulate;
	}

	public function GetSmtp(): Smtp|null {
		$source = new Source($this->source_id);
		if($source->smtp_id) return new Smtp($source->smtp_id);
		else return null;
	}

	public function GetEmailBase(): MagratheaMail {
		$smtp = $this->GetSmtp();
		if($smtp == null) return new MagratheaMail();
		$mail = new MagratheaMailSMTP();
		$mail->SetSMTPArray($smtp->getMailArray());
		return $mail;
	}

	public function Send(): array {
		if( !filter_var($this->to, FILTER_VALIDATE_EMAIL) ){
			$content["error"] = "E-mail de envio inválido!";
			$content["success"] = false;
		} else {
			$email = $this->GetEmailBase();
			$email->SetNewEmail($this->to, $this->from, $this->subject);
			if( !empty($this->email_replyto) ){
				$email->SetReplyTo($this->replyto);
			}
			if( strtolower($this->content_type) == "text/html"){
				$email->SetHTMLMessage($this->message);
			} else {
				$email->SetTXTMessage($this->message);
			}
			$simulate = $this->IsSimulation();
			if ($simulate) $email->Simulate();
			if( $email->Send() ){ 
				$content["success"] = "true";
				$content["mailto"] = $this->to;
				$this->sent_status = 1;
				$this->sent_date = \Magrathea2\now();
				if($simulate) $this->sent_status = 3;
				$this->Save();
			} else { 
				$content["error"] = $email->getError();
				$content["success"] = false;
			}
		}
		return $content;
	}

}
