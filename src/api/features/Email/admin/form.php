<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminForm;

$elements = AdminElements::Instance();

$form = new AdminForm();
$formData = [
	[
		"size" => "col-5",
		"id" => "mail_from",
		"type" => "disabled",
		"name" => "Mail from:"
	],
	[
		"size" => "col-4",
		"id" => "key",
		"type" => "disabled",
		"name" => "Api Key:"
	],
	[
		"size" => "col-3",
		"id" => "priority",
		"type" => "text",
		"name" => "Priority:"
	],
	[
		"size" => "col-12",
		"id" => "mail_to",
		"type" => "text",
		"name" => "Mail to:"
	],
	[
		"size" => "col-7",
		"id" => "subject",
		"type" => "text",
		"name" => "Subject:"
	],
	[
		"size" => "col-5",
		"id" => "mail_type",
		"type" => "text",
		"name" => "Type:"
	],
	[
		"size" => "col-12",
		"id" => "message",
		"type" => "textarea",
		"name" => "Message:"
	],
	[
		"type" => "button",
		"class" => ["w-100", "btn-primary"],
		"size" => "col-3 offset-6",
		"id" => "btn-payload",
		"action" => "generatePayload(this)",
		"name" => "Generate Payload"
	],
	[
		"type" => "button",
		"class" => ["w-100", "btn-success"],
		"size" => "col-3",
		"id" => "btn-payload",
		"action" => "createEmail(this)",
		"name" => "Add E-mail"
	]
];
$form
	->SetName("mail-form")
	->Build($formData);

?>

<div class="card">
	<div class="card-header">
		New E-mail
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-12">
				<?
				$elements->Select("sel-key", "Select a key", $selectKey,
					null, null, "Select a key", ["onchange" => "changeApikey()"]);
				?>
			</div>
			<div class="col-6">
				<?
				foreach($keys as $key) { include("card-key.php"); }
				?>
			</div>
			<div class="col-6">
				<?
				foreach($sources as $source) { include("card-source.php"); }
				?>
			</div>
		</div>
		<br/>
		<div class="row mb-2">
			<div class="col-12">
				<? $form->Print(); ?>
			</div>
		</div>
		<div class="row" id="payload-row" style="display: none;">
			<div class="col-12">
				<pre class="code-light" id="payload-rs"></pre>
			</div>
		</div>
		<div class="row" id="rs-row"style="display: none;">
			<div class="col-12 mt-2" id="mail-rs"></div>
		</div>
	</div>
</div>
