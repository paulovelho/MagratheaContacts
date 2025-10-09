<?php

include("_inc.php");
include("api.php");

use MagratheaContacts\ContactsApi;

$api = new ContactsApi();

if(@$_GET["debug"] == "true") {
	$api->Debug();
	die;
}
$api->Run();


