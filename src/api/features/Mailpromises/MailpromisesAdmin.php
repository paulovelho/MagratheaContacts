<?php
namespace MagratheaContacts\Mailpromises;

class MailpromisesAdmin extends \Magrathea2\Admin\Features\CrudObject\AdminCrudObject {
	public string $featureName = "Mailpromises CRUD";

	public function Initialize() {
		$this->SetObject(new Mailpromises());
	}
}
