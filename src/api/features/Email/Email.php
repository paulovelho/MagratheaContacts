<?php

namespace MagratheaContacts\Email;

use Magrathea2\Logger;

class Email extends EmailBase {

	public $content_type = "text/html";
	
/* sent status:
	0 = not sent
	1 = sent
	2 = error
	3 = test (not error, not sent)
*/
	public function GetStatus(): string {
		switch($this->sent_status) {
			case 0: return "not sent";
			case 1: return "send";
			case 2: return "error";
			case 3: return "test";
		}
		return "unknown status (".$this->sent_status.")";
	}

	public function Insert() {
		$this->add_date = \Magrathea2\now();
		$this->sent_status = 0;
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

	public function Send(): array {
		if( !filter_var($this->to, FILTER_VALIDATE_EMAIL) ){
			$content["error"] = "E-mail de envio inválido!";
			$content["success"] = false;
		} else {
			$email = new \Magrathea2\MagratheaMail();
			$email->setNewEmail($this->to, $this->from, $this->subject);
			if( !empty($this->email_replyto) ){
				$email->setReplyTo($this->replyto);
			}
			if( strtolower($this->content_type) == "text/html"){
				$email->setHTMLMessage($this->message);
			} else {
				$email->setTXTMessage($this->message);
			}
			if( $email->send() ){ 
				$content["success"] = "true";
				$content["mailto"] = $this->to;
				$this->sent_status = 1;
				$this->sent_date = \Magrathea2\now();
				$this->Save();
			} else { 
				$content["error"] = $email->getError();
				$content["success"] = false;
			}
		}
		return $content;
	}

}
