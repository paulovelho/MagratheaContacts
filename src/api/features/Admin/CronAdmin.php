<?php

namespace MagratheaContacts\Admin;

use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;

class CronAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Cron";
	public string $featureId = "CronView";


	public function GetPage() {
		include("cron/view.php");
	}

}
