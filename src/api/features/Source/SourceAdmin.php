<?php

namespace MagratheaContacts\Source;

use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\AdminManager;
use Magrathea2\Admin\iAdminFeature;

class SourceAdmin extends AdminFeature implements iAdminFeature { 

	public string $featureName = "Source";
	public string $featureId = "AdminSource";

	public function __construct() {
		parent::__construct();
		$this->SetClassPath(__DIR__);
		$this->AddJs();
	}

	private function AddJs() {
		$file = __DIR__."/admin/scripts.js";
		AdminManager::Instance()->AddJs($file);
	}

	public function HasEditPermission($user): bool {
		$loggedUser = AdminManager::Instance()->GetLoggedUser();
		return !empty($loggedUser->id);
	}

	public function GetPage() {
		include("admin/index.php");
	}

	public function ReturnError($err) {
		echo json_encode(["success" => false, "error" => $err]);
		die;
	}

	public function List() {
		$control = new SourceControl();
		$list = $control->GetAll();		
		include("admin/list.php");
	}

	public function Form() {
		$id = @$_GET["id"];
		$source = new Source($id);
		include("admin/form.php");
	}

	public function Save() {
		$id = $_POST["id"];
		$u = new Source($id);
		$u = $u->Assign($_POST);
		if(!$u->name) {
			$this->ReturnError("Name can't be empty!");
		}
		if(!$u->from) {
			$this->ReturnError("Mail From can't be empty!");
		}
		$success = $u->Save();
		echo json_encode([
			"success" => true,
			"data" => $u,
			"type" => ($id ? "update" : "insert")
		]);
	}

}
