<?php

use Magrathea2\MagratheaPHP;
use MagratheaContacts\Cronlogs\CronLog;
use MagratheaContacts\Email\EmailApi;

include("_inc.php");

CronLog::Instance()->Start();

MagratheaPHP::Instance()
	->Dev()->StartDB();

$emailApi = new EmailApi();
echo json_encode($emailApi->SendNext(null));
CronLog::Instance()->End()->Save();
