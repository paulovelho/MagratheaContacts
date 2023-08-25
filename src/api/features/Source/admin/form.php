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
		"name" => "Name",
		"key" => "name",
		"type" => "text",
		"size" => "col-5",
	],
	[
		"name" => "Mail From",
		"key" => "from",
		"type" => "text",
		"size" => "col-5",
	],
	[
		"name" => "Save",
		"type" => "button",
		"class" => ["w-100", "btn-success"],
		"size" => "col-6 offset-6",
		"action" => "saveSource(this)",
	]
];
?>
<div class="card">
	<div class="card-header">
		<?=($source->id ? "Edit" : "New Source")?> <b><?=$source->name?></b>
		<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
	</div>
	<div class="card-body">
		<?
		$form->Build($formData, $source)->Print();
		?>
	</div>
</div>
