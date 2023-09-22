<?php

use Magrathea2\Admin\AdminForm;
use MagratheaContacts\Apikey\ApikeyControl;

$keys = ApikeyControl::GetSelect();

$formSourceFilter = new AdminForm();
$formData = [
	[
		"type" => $keys,
		"key" => "filter_key",
		"name" => "Key:",
		"size" => "col-8",
		"placeholder" => "Select Key",
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
	->SetName("filter-key")
	->Build($formData);

?>

<div class="card">
	<div class="card-header">
		Filter By Key
	</div>
	<div class="card-body">
		<?
			$formSourceFilter->Print();
		?>
	</div>
</div>
