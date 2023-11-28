<?php

use Magrathea2\Config;
use Magrathea2\ConfigApp;

require "../vendor/autoload.php";

try {
	Magrathea2\MagratheaPHP::Instance()
		->AppPath(realpath(dirname(__FILE__)))
		->AddCodeFolder(__DIR__."/features/Authorization")
		->AddCodeFolder(__DIR__."/features/Users")
		->AddCodeFolder(__DIR__."/features/Cron")
		->AddFeature("Email", "Source", "Apikey")
		->Load();
		$debug = Config::Instance()->Get("debug");
		if ($debug == "true") Magrathea2\MagratheaPHP::Instance()->Debug();
		else Magrathea2\MagratheaPHP::Instance()->Prod();
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
