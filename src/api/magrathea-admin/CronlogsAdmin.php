<?php

namespace MagratheaContacts\Admin;

use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;
use MagratheaContacts\Cronlogs\CronlogsControl;

class CronlogsAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Cron Execution Logs";
	public string $featureId = "CronlogsAdmin";

	public function __construct() {
		parent::__construct();
		$this->AddJs(__DIR__."/cronlogs/scripts.js");
	}

	private function Control(): CronlogsControl {
		return new CronlogsControl();
	}

	public function GetPage() {
		$logs = $this->Control()->GetLast(50);
		$defaultBefore = date("Y-m-d\TH:i", strtotime("-7 days"));
		include(__DIR__."/cronlogs/cronlogs.php");
	}

	public function DeleteOlderThan() {
		$before = trim($_POST["before"] ?? "");
		if(!$before || strtotime($before) === false) {
			http_response_code(400);
			echo json_encode(["success" => false, "error" => "a valid 'before' date is required"]);
			return;
		}
		$deleted = $this->Control()->DeleteOlderThan($before);
		echo json_encode(["success" => true, "deleted" => $deleted]);
	}
}
