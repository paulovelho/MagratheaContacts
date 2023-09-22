<?php

use Magrathea2\Admin\AdminForm;
use MagratheaContacts\Source\SourceControl;

$sources = SourceControl::GetSelect();

$formSourceFilter = new AdminForm();
$formData = [
	[
		"type" => $sources,
		"key" => "filter_source",
		"name" => "Source:",
		"size" => "col-8",
		"placeholder" => "Select Source",
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
	->SetName("filter-source")
	->Build($formData);

?>

<div class="card">
	<div class="card-header">
		Filter By Source
	</div>
	<div class="card-body">
		<?
			$formSourceFilter->Print();
		?>
	</div>
</div>
