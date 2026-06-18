<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();
$elements->Header("Debugging SMTP");
include("top-menu.php");

?>


<div class="container">
	<div class="row">
		<div class="col-12">

			<div class="card">
				<div class="card-header">
					Debug mail function
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-6">
							<? include("mail-function-form.php"); ?>
						</div>
						<div class="col-6">
							<? include("smtp-select.php"); ?>
							<br />
							<hr /><br />
							<?
							AdminElements::Instance()
								->Button(
									"Test!", "testSmtp(this)",
									"btn-success w-100"
								);
							AdminElements::Instance()
								->Button(
									"Clear", "clearDebug()",
									"btn-danger w-100"
								);
							?>
							<br />
							<hr /><br />
							<pre id="run-rs" class="code"></pre>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>