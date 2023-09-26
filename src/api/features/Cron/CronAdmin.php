<?php
use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;


class CronAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Cron";
	public string $featureId = "CronView";


	public function GetPage() {
		include("admin/view.php");
	}

}
