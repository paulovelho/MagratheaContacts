<?php
// dev helper: mints a valid admin JWT for the local API (used for live UI testing)

use Magrathea2\MagratheaPHP;
use Magrathea2\Admin\Features\User\AdminUser;

include(__DIR__."/../_inc.php");
MagratheaPHP::Instance()->Dev()->StartDB();

$auth = new \MagratheaContacts\AuthApi();
$user = new AdminUser(1);
$rs = $auth->ResponseLogin($user);
echo json_encode($rs, JSON_PRETTY_PRINT)."\n";
