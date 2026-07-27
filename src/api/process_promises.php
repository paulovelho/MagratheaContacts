<?php

use Magrathea2\MagratheaPHP;
use MagratheaContacts\Cronlogs\CronLog;
use MagratheaContacts\Mailpromises\MailpromisesApi;

include("_inc.php");

CronLog::Instance()->Start();

MagratheaPHP::Instance()
	->Dev()->StartDB();

$promisesApi = new MailpromisesApi();
echo json_encode($promisesApi->ProcessPromises(null));

CronLog::Instance()->End()->Save();

