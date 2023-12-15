<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminForm;
use Magrathea2\Admin\AdminManager;
use MagratheaContacts\Smtp\SmtpControl;

$elements = AdminElements::Instance();
$feature = AdminManager::Instance()->GetActiveFeature();

$elements->Header("Send with SMTP");
include("top-menu.php");

$smtps = SmtpControl::GetSelectArray();
if(count($smtps) == 0){
	$elements->ErrorCard("no SMTPs available"); die;
}

$form = new AdminForm();
$formData = [
	[
		"size" => "col-6",
		"id" => "mail_from",
		"type" => "text",
		"name" => "Mail from:"
	],
	[
		"size" => "col-6",
		"id" => "mail_to",
		"type" => "text",
		"name" => "Mail to:"
	],
	[
		"size" => "col-12",
		"id" => "subject",
		"type" => "text",
		"name" => "Subject:"
	],
	[
		"size" => "col-12",
		"id" => "message",
		"type" => "textarea",
		"name" => "Message:"
	],
	[
		"type" => "button",
		"class" => ["w-100", "btn-success"],
		"size" => "col-6 offset-6",
		"id" => "btn-payload",
		"action" => "sendSMTP(this)",
		"name" => "Add E-mail"
	]
];
$form->Build($formData);

?>

<div class="container">

	<div class="card">
		<div class="card-header">SMTP</div>
		<div class="card-body">
			<?
				$elements->Select("sel-smtp", "Select a SMTP", $smtps,
				null, null, "Select a smtp");
		?>
		</div>
	</div>

	<div class="card">
		<div class="card-header">Mail</div>
		<div class="card-body"><? $form->Print(); ?></div>
	</div>

	<div class="card">
		<div class="card-body">
			<pre class="code" id="mail-rs"></pre>
		</div>
	</div>

</div>

