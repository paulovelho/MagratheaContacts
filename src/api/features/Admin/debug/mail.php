<?
use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();
$elements->Header("Debugging Mail");
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
							<? include(__DIR__ . "/mail-function-form.php"); ?>
						</div>
						<div class="col-6">
							<? include(__DIR__ . "/mail-function.php"); ?>
							<br />
							<hr /><br />
							<?
							AdminElements::Instance()
								->Button(
									"Test!", "testMail(this)",
									"btn-success w-100"
								);
							AdminElements::Instance()
								->Button(
									"Clear", "clearDebug()",
									"btn-danger w-100"
								);
							?>
							<pre id="run-rs" class="code"></pre>
							<br />
							<hr /><br />
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>