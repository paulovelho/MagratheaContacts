<?php
namespace MagratheaContacts\Source;

use Magrathea2\MagratheaModelControl;

class SourceControl extends SourceControlBase {
	public function GetSelect() {
		return array_map(function($s) {
			return [
				"id" => $s->id,
				"name" => $s->name
			];
		}, $this->GetAll());
	}
}

