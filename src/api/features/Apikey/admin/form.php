<?php

use Magrathea2\Admin\AdminElements;

$form = new \Magrathea2\Admin\AdminForm();
$formData = [
	[
		"name" => "#ID:",
		"key" => "id",
		"type" => "disabled",
		"size" => "col-1",
	],
	[
		"name" => "Source:",
		"key" => "source_id",
		"type" => $sources,
		"size" => "col-3",
	],
	[
		"name" => "Description:",
		"key" => "description",
		"type" => "text",
		"size" => "col-4",
	],
	[
		"size" => "col-2",
		"type" => "date",
		"key" => "expiration",
		"name" => "Expiration:",
	],
	[
		"size" => "col-2",
		"type" => "text",
		"key" => "usage_limit",
		"name" => "Limit of uses:",
	],
	[
		"name" => "Key:",
		"key" => "val",
		"type" => "disabled",
		"size" => "col-4",
	],
	[
		"name" => "Priority:",
		"key" => "priority",
		"type" => "text",
		"size" => "col-2",
	],
	[
		"name" => "Simulate",
		"key" => "simulate",
		"type" => "switch",
		"size" => "col-2",
		"outerClass" => "mt-4",
	],
	[
		"name" => "Save",
		"type" => "button",
		"class" => ["w-100", "btn-success"],
		"size" => "col-4",
		"action" => "createKey(this)",
	]
];
?>
<div class="card">
	<div class="card-header">
		<?=($key->id ? "Edit Key" : "New Key")?>
		<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
	</div>
	<div class="card-body">
		<?
		if(empty($sources)) {
			AdminElements::Instance()->Alert("You need to have a source to create an API key", "primary", false);
		} else {
			$form->Build($formData, $key)->Print();
		}
		?>
	</div>
</div>
