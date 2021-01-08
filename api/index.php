<?php

	require ("../app/inc/global.php");
	require ("./includes.php");
	include($magrathea_path."/MagratheaApi.php");
	require_once('../vendor/autoload.php');

	include_once ("./Authentication.php");
	$authentication = new AuthenticationApi();
	include ("./Sources.php");
	$sourceApi = new SourcesApi();
	include ("./Emails.php");
	$emailApi = new EmailsApi();

	$api = MagratheaApi::Instance()
		->AllowAll()
		->Crud("source", $sourceApi)
		->Add("GET", "emails", $emailApi, "List")
		->Add("GET", "emails/all", $emailApi, "List")
		->Add("GET", "emails/search", $emailApi, "Search")
		->Add("GET", "email/:id", $emailApi, "Read")
		->Add("POST", "emails", $emailApi, "AddEmail")
		->Add("POST", "send", $emailApi, "Send")
		->Add("POST", "tokenize", $authentication, "Tokenize")
		->Add("GET", "token", $authentication, "Token")
		->Start();

//	$api->Debug(); die;

	if($_GET["magrathea_control"] == "debug") {
		$api->Debug();
	} else {
		$api->Run();
	}

?>
