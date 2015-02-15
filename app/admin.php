<?php

	include("inc/global.php");
	include($magrathea_path."/MagratheaAdmin.php");

	$admin = new MagratheaAdmin();
	$admin->title = "Magrathea Contacts";
	$admin->args["user"] = "Visitante";
//	$admin->Load();
	$admin->LoadCustom();

//	MagratheaDebugger::Instance()->Show();

?>