<?php
$adminUrls = \Magrathea2\Admin\AdminUrls::Instance();

$listMail = $adminUrls->GetFeatureUrl("EmailAdmin", "");
$newMail = $adminUrls->GetFeatureUrl("EmailAdmin", "NewMail");
$sendMail = $adminUrls->GetFeatureUrl("EmailAdmin", "Send");
$btnStyles = ["w-100", "btn-primary"];

$btnSize = 2;
$qtdBnt = 3;
$btnSizeOffset = 12 - ($btnSize * $qtdBnt);

$active = @$_GET["magrathea_feature_subpage"];
?>

<div class="row top-menu">
	<div class="col-<?=$btnSizeOffset?>">

	</div>
	<div class="col-<?=$btnSize?>">
		<?

		$elements->Button(
			"List",
			"window.location.href='".$listMail."'",
			[...$btnStyles, ($active == null ? "active" : "")]
		);
		?>
	</div>
	<div class="col-<?=$btnSize?>">
		<?
		$elements->Button(
			"New",
			"window.location.href='".$newMail."'",
			[...$btnStyles, ($active == "NewMail" ? "active" : "")]
		);
		?>
	</div>
	<div class="col-<?=$btnSize?>">
		<?
		$elements->Button(
			"Send",
			"window.location.href='".$sendMail."'",
			[...$btnStyles, ($active == "Send" ? "active" : "")]
		);
		?>
	</div>
</div>
