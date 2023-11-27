<?php

require "../vendor/autoload.php";

try {
	Magrathea2\MagratheaPHP::Instance()
		->AppPath(realpath(dirname(__FILE__)))
		->AddCodeFolder(__DIR__."/features/Authorization")
		->AddCodeFolder(__DIR__."/features/Users")
		->AddCodeFolder(__DIR__."/features/Cron")
		->AddFeature("Email", "Source", "Apikey")
//		->Prod()
//		->Debug()
//		->Dev()
//		->StartDB()
		->Load();
} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
