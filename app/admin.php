<?php

	include("inc/global.php");
	include($magrathea_path."/MagratheaAdmin.php");

	class LoginController extends MagratheaController {
		public function Login(){
			$this->display("login.html");
		}
	}

	if($_SESSION["user"]) {
		$admin = new MagratheaAdmin();
		$admin->title = "Magrathea Contacts";
		$admin->args["user"] = "Visitante";
		$admin->Load();
	//	$admin->LoadCustom();
	} else {
		$control = new LoginController();
		$control->Login();
	}

//	MagratheaDebugger::Instance()->Show();

?>