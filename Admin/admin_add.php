<?php

	$admin = new Admin();
	$admin->email = $_POST["email"];
	$admin->SetPassword($_POST["password"]);
	if($admin->Insert()){
		echo '<div class="alert alert-success" role="alert"><strong>Done!</strong> Admin inserted</div>';
	} else {
		echo '<div class="alert alert-danger" role="alert"><strong>Error!</strong> Error adding model!</div>';
	}

?>