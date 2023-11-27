<?php
namespace MagratheaContacts\Source;

use Magrathea2\MagratheaModelControl;

class SourceControl extends \MagratheaContacts\Source\Base\SourceControlBase {
	public static function GetSelect() {
		return array_map(function($s) {
			return [
				"id" => $s->id,
				"name" => $s->name
			];
		}, SourceControl::GetAll());
	}
}

