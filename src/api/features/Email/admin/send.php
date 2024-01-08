<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminManager;
use Magrathea2\Admin\AdminUrls;

$elements = AdminElements::Instance();
$feature = AdminManager::Instance()->GetActiveFeature();

$elements->Header("Send Email");
include("top-menu.php");

?>

<div class="container">
	<?
	if ($query) {
		?>
		<div class="card">
			<div class="card-header">
				Query
				<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
			</div>
			<div class="card-body">
				<pre class="code-light"><?= $query->SQL() ?></pre>
			</div>
		</div>
		<?
	}
	?>

	<div class="card">
		<div class="card-header">
			<?= $viewMailTitle ?>
		</div>
		<div class="card-body">
				<?
				if (!$mail || !$mail->id) {
					echo "No e-mail to send";
				} else {
					include("view.php");
					// $elements->Button(
					// 	"Abort!",
					// 	"abortMail(\"" . $mail->id . "\")",
					// 	["btn-danger", "col-3", "offset-4"]
					// );
					$elements->Button(
						"Send!",
						"sendMail(\"" . $mail->id . "\")",
						["btn-success", "col-3", "offset-7"]
					);
				}
				?>
			<div class="row mt-4" id="mail-rs-row" style="display: none;">
				<div class="col-12">
					<pre class="code-light" id="mail-rs"></pre>
				</div>
			</div>
		</div>
	</div>

</div>