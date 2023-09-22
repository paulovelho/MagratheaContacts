<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();

?>

<div class="card">
	<div class="card-header">
		Users
	</div>
	<div class="card-body">
	<?
	$elements->Table($list, [
		[
			"title" => "#ID",
			"key" => "id"
		],
		[
			"title" => "E-mail",
			"key" => "email"
		],
		[
			"title" => "Last Online",
			"key" => "last_login"
		],
		[
			"title" => "Role",
			"key" => function($item) {
				return $item->GetRoleName();
			}
		],
		[
			"title" => "...",
			"key" => function ($item) {
				$action = "editUser(".$item->id.")";
				return '<a href="#" onclick="'.$action.'">Edit</a>';
			}
		]
	]);
	?>
	</div>
</div>
