<?php

namespace MagratheaContacts\Users;

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\AdminManager;
use Magrathea2\Admin\iAdminFeature;

use function Magrathea2\p_r;

class UsersAdmin extends AdminFeature implements iAdminFeature { 

	public string $featureName = "Users";
	public string $featureId = "AdminUsers";

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

	public function List() {
		$control = new UsersControl();
		$list = $control->GetAll();		
		include("admin/list.php");
	}

	public function Form() {
		$id = @$_GET["id"];
		$user = new User($id);
		$roles = $user->GetRoles();
		include("admin/form.php");
	}

	public function Password() {
		$id = @$_GET["id"];
		$user = new User($id);
		if(empty($user->id)) {
			AdminElements::Instance()->ErrorCard("Error loading user");
		}
		include("admin/change-password.php");
	}

	public function Save() {
		$id = $_POST["id"];
		$u = new User($id);
		$u->email = $_POST["email"];
		$u->role_id = $_POST["role_id"];
		$rs = $u->Save();
		$elements = AdminElements::Instance();
		if($rs) {
			$elements->Alert("User Saved", "success");
		} else {
			$elements->ErrorCard("Error Saving User!");
		}
	}

	public function SavePassword() {
		$id = $_POST["id"];
		$u = new User($id);
		$new_pwd = $_POST["new_password"];
		$elements = AdminElements::Instance();
		if(empty($new_pwd)) {
			$elements->ErrorCard("Password can't be blank");
		}
		$control = new UsersControl();
		$rs = $control->SetNewPassword($u, $new_pwd);
		if($rs["success"]) {
			$elements->Alert("Password Updated", "success");
		} else {
			$elements->ErrorCard($rs["error"], "Error on Password Update");
		}
	}

	public function DeleteUser() { 
		$id = $_POST["id"];
		$u = new User($id);
		$rs = $u->Delete();
		if($rs) {
			AdminElements::Instance()->Alert("User removed", "success");
		}
	}

}
