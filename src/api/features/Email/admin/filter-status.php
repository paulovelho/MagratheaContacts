<?php

use Magrathea2\Admin\AdminForm;
use MagratheaContacts\Email\EnumSentStatus;

$status = EnumSentStatus::array();

$formSourceFilter = new AdminForm();
$formData = [
	[
		"type" => $status,
		"key" => "filter_status",
		"name" => "Status:",
		"size" => "col-8",
		"placeholder" => "Select Status",
	],
	[
		"type" => "button",
		"name" => "Filter",
		"size" => "col-4",
		"class" => ["w-100", "btn-success"],
		"action" => "filter(this)",
	],
];
$formSourceFilter
	->SetName("filter-status")
	->Build($formData);

?>

<div class="card">
	<div class="card-header">
		Filter By Status
	</div>
	<div class="card-body">
		<?
			$formSourceFilter->Print();
		?>
	</div>
</div>
