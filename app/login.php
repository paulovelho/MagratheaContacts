<?php

	require("inc/global.php");

	include("Models/Admin.php");

	$email = $_POST["email"];
	$pass = $_POST["password"];

	$admin = AdminControl::getByEmailAndPassword($email, $pass);
	if($admin->id){
		$_SESSION["user"] = $admin->email;
	}
	header("Location: admin.php");

?>