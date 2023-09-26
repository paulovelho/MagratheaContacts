<?php

namespace MagratheaContacts\Email;

use Magrathea2\Exceptions\MagratheaApiException;
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
		if(empty($k)) {
			throw $this->GetEx("Key is empty!");
		}
		$keyControl = new ApikeyControl();
		$key = $keyControl->GetByKey($k);
		if(!$key->id) {
			throw $this->GetEx("Invalid key: [".$k."]");
		}
		$valid = $key->ValidateKey();
		if(!$valid["ok"]) {
			throw $this->GetEx("Key invalid [".$k."]: ".@$valid["data"]);
		}
		$key->Source = new Source($key->source_id);
		if(empty($key->Source->mail_from)) {
			throw $this->GetEx("invalid source [source_id: ".$key->source_id."]");
		}
		return $key;
	}

	public function Send($params) {
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
	
			$mail = new Email();
			$mail->source_id = $key->source_id;
			$mail->origin_key = $k;
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

	public function SendNext($params) {
		$data = @$_POST;
		if(@$params["key"]) $k = $params["key"];
		else $k = @$data["key"];

		try {
			if($k) {
				$key = $this->ValidateKey($k);
			}
			$mail = $this->service->GetNextToSend();
			$rs = $mail->Process();
			$rs["mail"] = $mail;
			if($k) return $rs;
			else return $rs["success"];
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