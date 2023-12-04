<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminForm;

$form = new AdminForm();
$onchange = ["onchange" => "buildHeaders();"];
$formData = [
	[
		"name" => "\$to",
		"key" => "to",
		"type" => "text",
		"size" => "col-12",
		"attributes" => $onchange,
	],
	[
		"name" => "\$subject",
		"key" => "subject",
		"type" => "text",
		"size" => "col-12",
	],
	[
		"name" => "\$message",
		"key" => "message",
		"type" => "textarea",
		"size" => "col-12",
	],
	[
		"name" => "\$additional_headers",
		"key" => "headers",
		"type" => "textarea",
		"size" => "col-12",
	],
	[
		"name" => "\$additional_params",
		"key" => "params",
		"type" => "text",
		"size" => "col-12",
	],
	[
		"type" => "empty",
		"key" => "more_div",
		"size" => "col-12",
		"class" => "mt-2",
	],
	[
		"key" => "default_headers",
		"type" => "hidden"
	],
	[
		"name" => "text/html",
		"key" => "content_type",
		"type" => "switch",
		"size" => "col-12",
		"attributes" => $onchange,
	],
	[
		"name" => "mail from",
		"key" => "from",
		"type" => "text",
		"size" => "col-12",
		"attributes" => $onchange,
	],
	[
		"name" => "Test",
		"type" => "button",
		"size" => "col-12",
		"key" => "testMail(this)",
		"class" => "btn-success w-100",
	]
];

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: {{content_type}}; charset=utf-8\r\n";
$headers .= "From: {{from}}\r\n";
$headers .= "Reply-To: {{to}}\r\n";

$form->Build($formData,
	[
		"headers" => $headers,
		"default_headers" => $headers,
		"more_div" => "<b>Other parameters</b>",
	]
);

?>

<div class="card">
	<div class="card-header">
		Debug mail function
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-6">
				<? $form->Print(); ?>
			</div>
			<div class="col-6">
				<? include(__DIR__."/mail-function.php"); ?>
				<br/><hr/><br/>
				<pre id="run-rs" class="code"></pre>
			</div>
		</div>
	</div>
</div>
