<?php

namespace MagratheaContacts;

use AuthApi;
use Magrathea2\Config;
use Magrathea2\MagratheaApi;
use MagratheaContacts\Source\SourceApi;

require "../vendor/autoload.php";

class ContactsApi extends MagratheaApi {

	public $authApi = null;
	const OPEN = false;
	const LOGGED = "IsLogged";
	const ADMIN = "IsAdmin"; //

	public function __construct() {
		$this->Initialize();
	}
	public function Initialize() {
		\Magrathea2\MagratheaPHP::Instance()->StartDb();
		$this->SetAuth();
		$this->AddSource();
		$this->SetUrl();
	}

	private function SetAuth() {
		$authApi = new \Magrathea2\Authorization\AuthApi();
		$this->BaseAuthorization($authApi, self::LOGGED);
		$this->Add("GET", "token", $authApi, "Token", self::OPEN);
		$this->Add("POST", "login", $authApi, "Login", self::OPEN);
	}

	private function SetUrl() {
		$url = Config::Instance()->Get("app_url");
		$this->SetAddress($url);
	}

	private function AddSource() {
		$api = new SourceApi();
		$this->Crud("source", $api, self::LOGGED);
	}

}
