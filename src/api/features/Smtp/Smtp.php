<?php
namespace MagratheaContacts\Smtp;

class Smtp extends \MagratheaContacts\Smtp\Base\SmtpBase {
	
	public function Ref(): string {
		return "[".$this->id."] ".$this->description;
	}

}
