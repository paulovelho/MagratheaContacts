<?php
namespace MagratheaContacts\Source;

use MagratheaContacts\Smtp\Smtp;
use Magrathea2\Admin\AdminManager;

class Source extends \MagratheaContacts\Source\Base\SourceBase {

	public function Insert() {
		parent::Insert();
		AdminManager::Instance()->Log("Source added", $this);
	}

	public function Ref(): string {
		return "[".$this->id."] ".$this->name;
	}

	public function GetSMTPString(): string {
		$smtpId = $this->smtp_id;
		if(!$smtpId) return "none";
		$smtp = new Smtp($smtpId);
		return $smtp->Ref();
	}
}

