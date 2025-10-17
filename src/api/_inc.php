<?php

use Magrathea2\Config;
use Magrathea2\Debugger;

require "../vendor/autoload.php";

try {
	Magrathea2\MagratheaPHP::Instance()
		->MinVersion("2.1.19")
		->AppPath(realpath(dirname(__FILE__)))
		->AddCodeFolder(__DIR__."/features/Authorization")
		->AddCodeFolder(__DIR__."/features/Users")
		->AddCodeFolder(__DIR__."/features/Admin")
		->AddCodeFolder(__DIR__."/features/version")
		->AddFeature("Email", "Source", "Apikey", "Smtp", "Cronlogs")
		->Load();
		$debug = Config::Instance()->Get("debug");
		if ($debug == "true") {
			Magrathea2\MagratheaPHP::Instance()->Debug();
		}
		else Magrathea2\MagratheaPHP::Instance()->Prod();
		// Debugger::Instance()->SetDev();

} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
