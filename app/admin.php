<?php

	include("inc/global.php");
	include($magrathea_path."/MagratheaAdmin.php");

	class LoginController extends MagratheaController {
		public static function Login(){
			self::GetSmarty()->display("login.html");
		}
	}

	if(!empty($_SESSION["user"])) {
		$admin = new MagratheaAdmin();
		$admin->title = "Magrathea Contacts";
		$admin->args["user"] = "Visitante";
		$admin->Load();
//		$admin->LoadCustom();
	} else {
		LoginController::Login();
	}

//	MagratheaDebugger::Instance()->Show();

?>