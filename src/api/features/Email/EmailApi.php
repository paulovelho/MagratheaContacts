<?php

namespace MagratheaContacts\Email;

use Magrathea2\Admin\AdminManager;
use Magrathea2\Exceptions\MagratheaApiException;
use Magrathea2\Exceptions\MagratheaModelException;
use Magrathea2\Logger;
use Magrathea2\MagratheaApiControl;
use MagratheaContacts\Apikey\Apikey;
use MagratheaContacts\Apikey\ApikeyControl;
use MagratheaContacts\Cronlogs\CronLog;
use MagratheaContacts\Mailpromises\Mailpromises;
use MagratheaContacts\Mailpromises\MailpromisesControl;
use MagratheaContacts\Source\Source;
use MagratheaContacts\Templates\Templates;
use MagratheaContacts\Templates\TemplatesControl;

/**
 * @property EmailControl $service
 */
class EmailApi extends MagratheaApiControl {
	public function __construct() {
		$this->model = get_class(new Email());
		$this->service = new EmailControl();
	}

	public function GetEx($message) {
		return new MagratheaApiException($message, false, 400);
	}

	private function ValidateKey(string|null $k): Apikey {
		$keyControl = new ApikeyControl();
		try {
			return $keyControl->ValidateKey($k);
		} catch(MagratheaModelException $modelEx) {
			throw $this->GetEx($modelEx->getMessage());
		}
	}

	/**
	 * Finds and validates the template referred by the request
	 * (`template_id` or `template` by name), if any.
	 * Template must be active and belong to the key's source or be global (source_id NULL)
	 */
	private function GetTemplateForKey(array $data, Apikey $key): Templates|null {
		$templateId = @$data["template_id"];
		$templateName = @$data["template"];
		if(!$templateId && !$templateName) return null;
		if($templateId) {
			try {
				$template = new Templates(intval($templateId));
			} catch(\Exception $ex) {
				throw $this->GetEx("template [".$templateId."] not found!");
			}
			if(!$template->active) throw $this->GetEx("template [".$template->name."] is not active!");
			if(!empty($template->source_id) && intval($template->source_id) != intval($key->source_id)) {
				throw $this->GetEx("template [".$template->name."] does not belong to this source!");
			}
			return $template;
		}
		$control = new TemplatesControl();
		$template = $control->GetByName($templateName, intval($key->source_id));
		if(!$template) throw $this->GetEx("template [".$templateName."] not found!");
		return $template;
	}

	private function GetVarsFromRequest(array $data): array {
		$vars = @$data["vars"] ?? [];
		if(is_string($vars)) $vars = json_decode($vars, true);
		if(!is_array($vars)) throw $this->GetEx("'vars' must be a valid JSON object!");
		return $vars;
	}

	/**
	 * Queues a templated e-mail as a mail_promise.
	 * Subject is resolved now: the request's subject, or the template's one (placeholders intact);
	 * rendering happens at processing time (or immediately, if `process` is sent)
	 */
	private function AddPromise(array $data, string $k, Apikey $key, Templates $template): Mailpromises {
		$to = @$data["to"] ? $data["to"] : @$data["mail_to"];
		if(!$to) throw $this->GetEx("'to' field cannot be empty!");
		$vars = $this->GetVarsFromRequest($data);
		$type = @$data["type"] ?? @$data["mail_type"];
		$subject = @$data["subject"];
		$message = @$data["message"];
		$priority = ($key->priority ? $key->priority : 50 );

		$promise = new Mailpromises();
		$promise->source_id = $key->source_id;
		$promise->origin_key = $k;
		$promise->mail_type = $type ?? null;
		$promise->email_from = $key->Source->mail_from;
		$promise->email_replyTo = $key->Source->mail_from;
		$promise->email_to = $to;
		$promise->msg_subject = ($subject ? $subject : $template->msg_subject);
		$promise->message = ($message ? $message : null);
		$promise->priority = $priority;
		$promise->template_id = $template->id;
		$promise->SetVars($vars);
		$promise->Insert();
		if(@$data["process"] && (new MailpromisesControl())->IsOn()) {
			$promise->Process();
		}
		return $promise;
	}

	public function Add($params): Email|Mailpromises {
		$data = $this->GetPost();
		if(@$params["key"]) $k = $params["key"];
		else $k = @$data["key"];
		try {
			$key = $this->ValidateKey($k);
			$template = $this->GetTemplateForKey($data, $key);
			if($template) return $this->AddPromise($data, $k, $key, $template);
			$validateArr = [];
			$to = @$data["to"] ? $data["to"] : @$data["mail_to"];
			$subject = @$data["subject"];
			$message = @$data["message"];
			$priority = ($key->priority ? $key->priority : 50 );
			if(!$to) array_push($validateArr, "'to' field cannot be empty!");
			if(!$subject) array_push($validateArr, "'subject' field cannot be empty!");
			if(!$message) array_push($validateArr, "'message' field cannot be empty!");
			if(count($validateArr) > 0) {
				throw $this->GetEx(implode(" | ", $validateArr));
			}

			$type = @$data["type"] ?? @$data["mail_type"];
	
			$mail = new Email();
			$mail->source_id = $key->source_id;
			$mail->origin_key = $k;
			$mail->mail_type = $type ?? null;
			$mail->email_from = $key->Source->mail_from;
			$mail->email_replyTo = $key->Source->mail_from;
			$mail->email_to = $to;
			$mail->msg_subject = $subject;
			$mail->message = $message;
			$mail->priority = $priority;
			$mail->Insert();
			return $mail;
		} catch(\Exception $ex) {
			throw $ex;
		}
	}

	public function Send($params) {
		try {
			$mail = $this->Add($params);
			if($mail instanceof Mailpromises) {
				if(empty($mail->mail_id)) {
					$rs = $mail->Process();
					if(!@$rs["success"]) throw $this->GetEx("could not process template: ".@$rs["error"]);
				}
				$mail = new Email($mail->mail_id);
			}
			return $mail->Send();
		} catch(\Exception $ex) {
			throw $ex;
		}
	}

	public function SendNext($params) {
		$log = CronLog::Instance();
		$log->Add("Sending Next");
		$data = $this->GetPost();
		if(@$params["key"]) $k = $params["key"];
		else $k = @$data["key"];

		try {
			if($k) {
				$this->ValidateKey($k);
			}
			if(!$this->service->IsOn()) {
				Logger::Instance()->Log("E-mail sending is not active!");
				$log->Result("E-mail sending is not active!");
				throw new MagratheaApiException("service is off");
			}
			$mail = $this->service->GetNextToSend();
			if(!$mail) {
				$log->Result("no e-mail to send");
				$log->Done();
				return [
					"success" => true,
					"mail" => null,
					"sent" => false,
					"log" => "no e-mail to send"
				];
			}
			$rs = $mail->Process();
//			$rs["mail"] = $mail;
			AdminManager::Instance()->Log("send_email", $mail);
			$log->Done();
			if($k) return $rs;
			else return $rs;
		} catch(\Exception $ex) {
			throw $ex;
		}
	}

	public function GetByKey($params) {
		$key = @$params["key"];
		return $this->service->GetFromKey($key);
	}
	public function GetBySource($params) {
		$source = $params["source"];
		return $this->service->GetFromSource($source);
	}
	public function GetAll($params) {
		return $this->service->GetFromSource();
	}

	public function Filter($params) {
		$source = $params["source"];
		$query = $_GET;
		$mail_to = @$query["mail_to"] ?? null;
		$mail_from = @$query["mail_from"] ?? null;
		$type = @$query["type"] ?? null;
		$status = @$query["status"] ?? null;
		return $this->service->Filter(
			$source,
			$mail_to, $mail_from,
			$type, $status
		);
	}

}
