<?php

	require("inc/global.php");

	include("Models/Admin.php");

	$email = $_POST["email"];
	$pass = $_POST["password"];

	$admin = AdminControl::getByEmailAndPassword($email, $pass);
	$admin = $admin[0];
	//p_r($admin);
	if(!empty($admin->id)){
		$_SESSION["user"] = $admin->email;
	}
	header("Location: admin.php");

?>