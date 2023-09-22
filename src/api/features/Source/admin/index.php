<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminManager;

$elements = AdminElements::Instance();
$elements->Header("Sources");

$feature = AdminManager::Instance()->GetActiveFeature();

?>

<div class="container">

<div class="row">
	<div class="col-12" id="container-source-list">
	<?
		$feature->List();
	?>
	</div>
</div>
<div class="row">
	<div class="col-12 right">
		<?
		$elements->Button("New Source", "newSource()", ["btn-success"])
		?>
	</div>
</div>

<div class="row">
	<div class="col-12 mt-4" id="container-source-rs"></div>
	<div class="col-12" id="container-source-form"></div>
</div>

</div>