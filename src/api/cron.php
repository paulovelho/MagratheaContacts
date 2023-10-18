<?php

use Magrathea2\MagratheaPHP;
use MagratheaContacts\Email\EmailApi;

include("_inc.php");

MagratheaPHP::Instance()
	->Dev()->StartDB();

$emailApi = new EmailApi();
echo json_encode($emailApi->SendNext(null));
