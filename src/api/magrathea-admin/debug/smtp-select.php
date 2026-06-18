<?php

use Magrathea2\Admin\AdminForm;
use MagratheaContacts\Smtp\SmtpControl;

$smtps = SmtpControl::GetSelectArray();

$form = new AdminForm();
$formData = [
	[
		"name" => "SMTP",
		"type" => $smtps,
		"key" => "smtp",
		"size" => "col-12",
	],
];
$form->Build($formData);

?>
<div class="card">
	<div class="card-header">
		Select SMTP
	</div>
	<div class="card-body">
		<? $form->Print(); ?>
	</div>
</div>