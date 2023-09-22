<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminManager;

$elements = AdminElements::Instance();

?>

<div class="card">
	<div class="card-header">
		Sources
	</div>
	<div class="card-body">
	<?
	$elements->Table($list, [
		[
			"title" => "#ID",
			"key" => "id"
		],
		[
			"title" => "Name",
			"key" => "name"
		],
		[
			"title" => "...",
			"key" => function ($item) {
				$action = "editSource(".$item->id.")";
				return '<a href="#" onclick="'.$action.'">Edit</a>';
			}
		]
	]);
	?>
	</div>
</div>
