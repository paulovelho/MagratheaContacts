<?php

include("_inc.php");
include("api/api.php");

use MagratheaContacts\ContactsApi;

$api = new ContactsApi();

if(@$_GET["debug"] == "true") {
	$api->Debug();
	die;
}
$api
	->Fallback(function() {
		include("view/index.html");
	})
	->Run();


