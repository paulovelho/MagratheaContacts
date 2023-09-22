<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminManager;
use Magrathea2\Admin\AdminUrls;

$elements = AdminElements::Instance();
$feature = AdminManager::Instance()->GetActiveFeature();

$elements->Header("New Email");
include("top-menu.php");

?>

<div class="container">
	<?
	$feature->Form();
	?>
</div>

