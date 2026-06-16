<?php

use Magrathea2\Admin\AdminElements;
use MagratheaContacts\Cronlogs\CronlogsControl;

$adminElements = AdminElements::Instance();

$tableData = [
	[
		"title" => "#ID",
		"key" => "id",
	],
	[
		"title" => "Time",
		"key" => "timeend",
	],
	[
		"title" => "Status",
		"key" => "status",
	],
	[
		"title" => "Result",
		"key" => "result",
	],
];

$control = new CronlogsControl();
$data = $control->GetLast(50);

?>

<div class="card">
	<div class="card-header">
		Execution Log
	</div>
	<div class="card-body">
		<div class="col-12">
			<? $adminElements->Table($data, $tableData); ?>
		</div>
	</div>
</div>