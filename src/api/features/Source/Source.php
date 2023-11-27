<?php
namespace MagratheaContacts\Source;

use Magrathea2\Admin\AdminManager;

class Source extends \MagratheaContacts\Source\Base\SourceBase {

	public function Insert() {
		AdminManager::Instance()->Log("Source added", $this);
		parent::Insert();
	}
}

