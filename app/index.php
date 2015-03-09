<?php

	include("inc/global.php");

	include("Controls/_Controller.php");
	// plugins:
	include("plugins/bootstrap/load.php");

	$wsContato = MagratheaConfig::Instance()->GetFromDefault("server_url");

//	p_r($_GET);

	$data = @$_POST;
	if(!empty($data)){
		$name = $data["name"];
		$email = $data["email"];
		$subject = $data["subject"];
		$message = $data["message"];
		$secret = MagratheaConfig::Instance()->GetFromDefault("secret_key");

		$email_message = "FROM: [".$name." <".$email.">] :  \n\n".$message;
		$postData = array(
			'source' => 2,
			'to' => 'magrathea_contacts@paulovelho.com',
			'replyto' => "'".$name."' <".$email.">",
			'subject' => $subject,
			'message' => $email_message,
			'priority' => 70,
			'auth' => $secret 
		);
		$options = array(
			'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($postData),
			),
		);
		$context  = stream_context_create($options);
		$wsContato = $wsContato."/server.php?addMail";
		$result = file_get_contents($wsContato, false, $context);

		$successMessage = "<div class=\"alert alert-success\">" .
				"<button class=\"close\" data-dismiss=\"alert\" type=\"button\">×</button>" .
				"Message sent!</div>";
		$Smarty->assign("message", $successMessage);
	}


	BaseControl::Form();

	/*
	// set default Controls:
	$control = "Home";
	$action = "Index";
	$params = array();

	if(isset($_GET["control"]) && !empty($_GET["control"])) $control = $_GET["control"];
	if(isset($_GET["action"]) && !empty($_GET["action"])) $action = $_GET["action"];
	if(isset($_GET["params"]) && !empty($_GET["params"])) $params = $_GET["params"];

	try{
		MagratheaController::Load($control, $action, $params);
	} catch (Exception $ex) {
		BaseControl::Go404();
	}
	*/

?>







