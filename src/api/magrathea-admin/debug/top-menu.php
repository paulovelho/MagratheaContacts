<?php
$adminUrls = \Magrathea2\Admin\AdminUrls::Instance();

$phpMail = $adminUrls->GetFeatureUrl("DebugAdmin", "Mail");
$smtpMail = $adminUrls->GetFeatureUrl("DebugAdmin", "Smtp");
$btnStyles = ["w-100", "btn-primary"];

$btnSize = 2;
$qtdBnt = 2;
$btnSizeOffset = 12 - ($btnSize * $qtdBnt);

//$active = @$_GET["magrathea_feature_subpage"];
//if(empty($active)) $active = "Mail";
?>

<div class="row top-menu">
	<div class="col-<?=$btnSizeOffset?>">

	</div>
	<div class="col-<?=$btnSize?>">
		<?
		$elements->Button(
			"PHP mail",
			"window.location.href='".$phpMail."'",
			[...$btnStyles, ($active == "Mail" ? "active" : "")]
		);
		?>
	</div>
	<div class="col-<?=$btnSize?>">
		<?
		$elements->Button(
			"SMTP",
			"window.location.href='".$smtpMail."'",
			[...$btnStyles, ($active == "Smtp" ? "active" : "")]
		);
		?>
	</div>
</div>
