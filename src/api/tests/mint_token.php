<?php
// dev helper: mints a valid admin JWT for the local API (used for live UI testing)

use Magrathea2\MagratheaPHP;
use Magrathea2\Admin\Features\User\AdminUser;

// Safety: never allow this script to be served over HTTP.
if (php_sapi_name() !== 'cli') {
	http_response_code(404);
	exit;
}

include(__DIR__."/../_inc.php");
MagratheaPHP::Instance()->Dev()->StartDB();

$auth = new \MagratheaContacts\AuthApi();
$user = new AdminUser(1);
$rs = $auth->ResponseLogin($user);
echo json_encode($rs, JSON_PRETTY_PRINT)."\n";
