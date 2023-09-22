<?php

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminManager;

$elements = AdminElements::Instance();
$elements->Header("Users");

$feature = AdminManager::Instance()->GetActiveFeature();

?>

<div class="container">

<div class="row">
	<div class="col-12" id="container-user-list">
	<?
		$feature->List();
	?>
	</div>
</div>
<div class="row">
	<div class="col-12 right">
		<?
		$elements->Button("New User", "newUser()", ["btn-success"])
		?>
	</div>
</div>

<div class="row">
	<div class="col-12 mt-4" id="container-user-rs"></div>
	<div class="col-12" id="container-user-form"></div>
</div>

</div>