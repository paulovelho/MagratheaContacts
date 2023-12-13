<?php
namespace MagratheaContacts\Smtp;

class Smtp extends \MagratheaContacts\Smtp\Base\SmtpBase {
	
	public function Save() {
		$this->tls_encrypt = 1;
		parent::Save();
	}

	public function getMailArray(): array {
		return [
			"smtp_host" => $this->host,
			"smtp_port" => $this->port,
			"smtp_username" => $this->user,
			"smtp_password" => $this->password,
			"auth" => $this->tls_encrypt,
		];
	}

	public function Ref(): string {
		return "[".$this->id."] ".$this->description." (".$this->host.")";
	}

}
