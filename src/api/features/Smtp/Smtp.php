<?php
namespace MagratheaContacts\Smtp;

class Smtp extends \MagratheaContacts\Smtp\Base\SmtpBase {
	
	public function Save() {
		$this->tls_encrypt = 1;
		parent::Save();
	}

	public function Ref(): string {
		return "[".$this->id."] ".$this->description;
	}

}
