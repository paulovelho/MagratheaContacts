<?php

namespace MagratheaContacts\Smtp;

use Magrathea2\Admin\Features\CrudObject\AdminCrudObject;
use Magrathea2\MagratheaModel;

class SmtpAdmin extends AdminCrudObject {

	public string $featureName = "SMTP";

	public function Initialize() {
		$this->SetObject(new Smtp());
		$this->objectName = "SMTP";
	}

	public function Columns(): array {
		return [
			[ "title" => "#ID", "key" => "id" ],
			[ "title" => "Description", "key" => "description" ],
			[ "title" => "Host", "key" => "host" ],
			[ "title" => "Port", "key" => "port" ],
			[ "title" => "Username", "key" => "user" ],
		];
	}

	public function Fields(MagratheaModel $object): array {
		$fields = [
			[
				"name" => "ID", "key" => "id",
				"type" => "disabled", "size" => "col-1",
			],
			[
				"name" => "Description", "key" => "description",
				"type" => "text", "size" => "col-5",
			],
			[
				"name" => "Host", "key" => "host",
				"type" => "text", "size" => "col-4",
			],
			[
				"name" => "Port", "key" => "port",
				"type" => "text", "size" => "col-2",
			],
			[
				"name" => "User", "key" => "user",
				"type" => "text", "size" => "col-3",
			],
			[
				"name" => "Password", "key" => "password",
				"type" => "text", "size" => "col-3",
			],
		];
		$deleteBtn = $this->GetDeleteButton();
		$deleteBtn["size"] = "col-3";
		$saveBtn = $this->GetSaveButton();
		$saveBtn["size"] = "col-3";
		array_push($fields, $deleteBtn, $saveBtn);
		return $fields;
	}

}
