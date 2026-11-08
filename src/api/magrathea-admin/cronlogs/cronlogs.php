<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();
$elements->Header("Cron Execution Logs");

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
		"title" => "Name",
		"key" => "name",
	],
	[
		"title" => "Hitpoint",
		"key" => "hitpoint",
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

?>

<div class="container">
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">Execution Log</div>
				<div class="card-body">
					<? $elements->Table($logs, $tableData); ?>
				</div>
			</div>

			<div class="card mt-3">
				<div class="card-header">
					Delete Old Logs
				</div>
				<div class="card-body">
					<p class="text-muted small">
						Permanently deletes all execution logs older than the date below.
					</p>
					<form id="cronlog-cleanup-form">
						<div class="row g-2 align-items-end">
							<div class="col-md-4">
								<label class="form-label">Delete logs older than</label>
								<input type="datetime-local" class="form-control" name="before" id="cronlog-before" value="<?= htmlspecialchars($defaultBefore) ?>" required />
							</div>
							<div class="col-md-2">
								<button type="button" class="btn btn-danger w-100" onclick="deleteOldLogs()">Delete</button>
							</div>
						</div>
					</form>
					<div id="cronlog-cleanup-result" class="mt-2"></div>
				</div>
			</div>
		</div>
	</div>
</div>
