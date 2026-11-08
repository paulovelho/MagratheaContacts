<?php

use Magrathea2\MagratheaPHP;
use MagratheaContacts\Email\EmailApi;

include("_inc.php");

// Running under CLI (this file is meant to be `exec`'d, not requested over HTTP)
// leaves $_SERVER['REQUEST_METHOD'] unset, which MagratheaApiControl::GetPost() reads directly.
if(!isset($_SERVER["REQUEST_METHOD"])) $_SERVER["REQUEST_METHOD"] = "GET";

MagratheaPHP::Instance()
	->Dev()->StartDB();

$emailApi = new EmailApi();
echo json_encode($emailApi->SendNext(null));
