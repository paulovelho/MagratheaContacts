<?php
namespace MagratheaContacts\Cronlogs;

class CronlogsAdmin extends \Magrathea2\Admin\Features\CrudObject\AdminCrudObject {
	public string $featureName = "Execution Logs";
	public string $featureId = "CronView";

	public function Initialize() {
		$this->SetObject(new Cronlogs());
		$this->AddJs(__DIR__."/admin/scripts.js");
		$this->AddCSS(__DIR__."/admin/styles.css");
	}

	public function Index() {
		if(@$_GET["crud"]) {
			parent::Index();
		} else {
			include("admin/home.php");
		}
	}

	public function Setup() {
		include("admin/setup.php");
	}
}
