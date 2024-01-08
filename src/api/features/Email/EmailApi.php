<?php

namespace MagratheaContacts\Email;

use Magrathea2\Admin\AdminManager;
use Magrathea2\Exceptions\MagratheaApiException;
use Magrathea2\Exceptions\MagratheaModelException;
use Magrathea2\MagratheaApiControl;
use MagratheaContacts\Apikey\Apikey;
use MagratheaContacts\Apikey\ApikeyControl;
use MagratheaContacts\Source\Source;

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

	public function Add($params): Email {
		$data = @$_POST;
		if(@$params["key"]) $k = $params["key"];
		else $k = @$data["key"];
		try {
			$key = $this->ValidateKey($k);
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

			$type = @$data["type"] ?? $data["mail_type"];
	
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
			return $mail->Send();
		} catch(\Exception $ex) {
			throw $ex;
		}
	}

	public function SendNext($params) {
		$data = @$_POST;
		if(@$params["key"]) $k = $params["key"];
		else $k = @$data["key"];

		try {
			if($k) {
				$this->ValidateKey($k);
			}
			if(!$this->service->IsOn()) {
				AdminManager::Instance()->Log("send_mail", null, ["active" => false]);
				throw new MagratheaApiException("service is off");
			}
			$mail = $this->service->GetNextToSend();
			if(!$mail) {
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

}
