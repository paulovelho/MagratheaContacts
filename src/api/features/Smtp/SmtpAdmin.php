<?php

namespace MagratheaContacts\Smtp;

use Magrathea2\Admin\Features\CrudObject\AdminCrudObject;

class SmtpAdmin extends AdminCrudObject {

	public string $featureName = "SMTP";

	public function Initialize() {
		$this->SetObject(new Smtp());
		$this->objectName = "SMTP";
	}

}
