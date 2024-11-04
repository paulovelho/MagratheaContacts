<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();
$elements->Header("Cron Job");

?>

<div class="container">
	<div class="row">
		<div class="col-12 right"><a onclick="openSetup()" href="#">setup instructions</a></div>
	</div>
	<div class="row"><div class="col-12" id="rs-setup"></div></div>
	
	<div class="row"><div class="col-12">
		<? include("list.php"); ?>
	</div></div>

</div>
