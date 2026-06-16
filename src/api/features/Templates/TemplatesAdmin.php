<?php
namespace MagratheaContacts\Templates;

class TemplatesAdmin extends \Magrathea2\Admin\Features\CrudObject\AdminCrudObject {
	public string $featureName = "Templates CRUD";

	public function Initialize() {
		$this->SetObject(new Templates());
	}
}
