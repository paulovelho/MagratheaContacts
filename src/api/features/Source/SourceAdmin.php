<?php

namespace MagratheaContacts\Source;

use Magrathea2\Admin\Features\CrudObject\AdminCrudObject;

class SourceAdmin extends AdminCrudObject {

	public function Initialize() {
		$this->SetObject(new Source());
	}
}