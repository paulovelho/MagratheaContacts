<?php

use Magrathea2\Admin\AdminElements;

$adminElements = AdminElements::Instance();

$tableData = [
	[
		"title" => "To",
		"key" => "email_to",
	],
	// [
	// 	"title" => "Key",
	// 	"key" => "origin_key"
	// ],
	[
		"title" => "From",
		"key" => "email_from"
	],
	[
		"title" => "Subject",
		"key" => function($e) {
			return substr($e->msg_subject, 0, 10)."...";
		}
	],
	[
		"title" => "Date Added",
		"key" => function($e) {
			return $e->add_date;
		}
	],
	[
		"title" => "Status",
		"key" => function($e) {
			return $e->GetStatus();
		}
	],
	[
		"title" => "-",
		"key" => function($e) {
			$click = "viewMail(".$e->id.", \"#mail-rs\");";
			return "<a href='#' onclick='".$click."'>view</a>";
		}
	]
];

?>

<div class="card">
	<div class="card-header">
		E-mails
		<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-4 offset-8">
				<?
				$switchAction = ["onchange" => "switchRs(this);"];
				$adminElements->Checkbox(
					null, "Toggle Raw/Table", 
					true, false, [], true,
					$switchAction);
				?>
			</div>
			<div class="col-12 rs-table">
			<?
			$adminElements->Table($list, $tableData);
			?>
			</div>
			<div class="col-12 rs-raw" style="display: none;">
				<pre class="code-light"><? print_r($list); ?></pre>
			</div>
		</div>
	</div>
</div>
