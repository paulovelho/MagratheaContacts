<?php
namespace MagratheaContacts\Source;

use Magrathea2\Admin\AdminManager;

class Source extends \MagratheaContacts\Source\Base\SourceBase {

	public function Insert() {
		parent::Insert();
		AdminManager::Instance()->Log("Source added", $this);
	}

	public function Ref(): string {
		return "[".$this->id."] ".$this->name;
	}
}

