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

	<div class="card">
		<div class="card-header">
			Send E-mail: 
		</div>
		<div class="card-body">
			<?
			if(!$mail || !$mail->id) {
				echo "No e-mail to send";
			} else {
				include("view.php");
				$elements->Button(
					"Send!",
					"sendMail(\"".$mail->id."\")",
					["btn-success", "col-4", "offset-8"]
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

