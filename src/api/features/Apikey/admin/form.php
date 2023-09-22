<?php
$form = new \Magrathea2\Admin\AdminForm();
$formData = [
	[
		"name" => "#ID",
		"key" => "id",
		"type" => "disabled",
		"size" => "col-2",
	],
	[
		"name" => "Source",
		"key" => "source_id",
		"type" => $sources,
		"size" => "col-4",
	],
	[
		"size" => "col-3",
		"type" => "date",
		"key" => "expiration",
		"name" => "Expiration",
	],
	[
		"size" => "col-3",
		"type" => "text",
		"key" => "usage_limit",
		"name" => "Limit of uses",
	],
	[
		"name" => "Key",
		"key" => "val",
		"type" => "disabled",
		"size" => "col-6",
	],
	[
		"name" => "Save",
		"type" => "button",
		"class" => ["w-100", "btn-success"],
		"size" => "col-6",
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
		$form->Build($formData, $key)->Print();
		?>
	</div>
</div>
