<?php

use Magrathea2\Admin\Admin;
use Magrathea2\Admin\AdminManager;

require "../vendor/autoload.php";
include("_inc.php");

\Magrathea2\MagratheaPHP::Instance()->Dev();

try {
	$color = "#3FBF3F";
//	AdminManager::Instance()->StartDefault("Magrathea: Contacts");
	$admin = new Admin();
	$admin->SetTitle("Magrathea Contacts");
	$admin->AddMenuItem(
		["title" => "Links", "type" => "sub"],
		["title" => "Admin", "link" => "/admin.php"]
	);
	AdminManager::Instance()->Start($admin);
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
