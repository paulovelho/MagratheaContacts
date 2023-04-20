<?php

use Magrathea2\Admin\AdminManager;
use Magrathea2\Admin\Models\AdminConfigControl;

use function Magrathea2\p_r;

require "../vendor/autoload.php";

try {
	Magrathea2\MagratheaPHP::Instance()
		->AppPath(realpath(dirname(__FILE__)))
		->Load()
		->Connect()
		->Debug();

//	AdminManager::Instance()->SetPrimaryColor("#3FBF3F");

	Magrathea2\Admin\Start::Instance()
		->StartDb()
		->SetTitle("Magrathea Contacts")
		->Load();

} catch(Exception $ex) {
	\Magrathea2\p_r($ex);
}
