<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminUrls;

$elements = AdminElements::Instance();
$elements->Header("Emails");
include("top-menu.php");
?>

<div class="container">
	<div class="row">
		<div class="col-6">
			<? include("filter-source.php"); ?>
		</div>
		<div class="col-6">
			<? include("filter-apikey.php"); ?>
		</div>
	</div>
	<div class="row">
		<div class="col-12" id="mail-list"></div>
	</div>
	<div class="row">
		<div class="col-12" id="mail-rs"></div>
	</div>
</div>

