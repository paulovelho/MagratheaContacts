<?php

use Magrathea2\Admin\AdminManager;

include("_inc.php");
//include("api.php");
include("ContactsAdmin.php");

try {
	AdminManager::Instance()->Start(new ContactsAdmin());
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
