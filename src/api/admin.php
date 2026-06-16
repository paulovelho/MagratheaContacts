<?php

use Magrathea2\Admin\AdminManager;
use MagratheaContacts\ContactsAdmin;

include("_inc.php");
//include("api.php");

try {
	AdminManager::Instance()->Start(new ContactsAdmin());
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
