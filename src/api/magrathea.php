<?php

use Magrathea2\Admin\AdminManager;

require "../vendor/autoload.php";
include("_inc.php");

try {
	$color = "#3FBF3F";
	AdminManager::Instance()->StartDefault("Contacts");
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
