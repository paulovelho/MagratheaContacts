<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();
$elements->Header("Debugging");

?>

<div class="container">
	<div class="row">
		<div class="col-12">
			<? include(__DIR__."/mail-function-debug.php"); ?>
		</div>
	</div>
</div>
