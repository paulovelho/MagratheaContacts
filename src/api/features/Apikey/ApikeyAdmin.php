<?php

namespace MagratheaContacts\Apikey;

use Exception;
use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\AdminManager;
use Magrathea2\Admin\iAdminFeature;
use MagratheaContacts\Source\SourceControl;

class ApikeyAdmin extends AdminFeature implements iAdminFeature { 

	public string $featureName = "Api Keys";
	public string $featureId = "AdminApikey";

	public function __construct() {
		parent::__construct();
		$this->SetClassPath(__DIR__);
		$this->AddJs(__DIR__."/admin/scripts.js");
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
		$control = new ApikeyControl();
		$list = $control->GetAll();		
		include("admin/list.php");
	}

	public function Form() {
		$id = @$_GET["id"];
		$sourceControl = new SourceControl();
		$sources = $sourceControl->GetSelect();
		$key = new Apikey($id);
		$key->InitializeKey();
		$key->priority = 65;
		include("admin/form.php");
	}

	public function Create() {
		$id = @$_POST["id"];
		$k = new Apikey($id);
		$k = $k->Assign($_POST);
		$k->active = true;
		try {
			$success = $k->Normalize()->Save();
		} catch(\Magrathea2\Exceptions\MagratheaDBException $ex) {
			echo json_encode([
				"success" => false,
				"error" => $ex->getMessage(),
			]);
			die;
		} catch(Exception $ex) {
			echo json_encode([
				"success" => false,
				"error" => $ex,
			]);
			die;
		}
		echo json_encode([
			"success" => true,
			"data" => $k,
			"type" => ($id ? "update" : "insert")
		]);
	}

}
