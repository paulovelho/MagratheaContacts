<?php

namespace MagratheaContacts;

use AuthApi;
use Magrathea2\Config;
use Magrathea2\MagratheaApi;
use MagratheaContacts\Apikey\ApikeyApi;
use MagratheaContacts\Source\SourceApi;
use MagratheaContacts\Email\EmailApi;

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
		$this->AddApikey();
		$this->AddEmail();
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
	private function AddApikey() {
		$api = new ApikeyApi();
		$this->Add("GET", "keys", $api, "GetAll", self::LOGGED);
		$this->Add("GET", "key/:key/view", $api, "GetByKey", self::OPEN);
		$this->Add("GET", "source/:source/keys", $api, "GetKeysBySource", self::LOGGED);
	}
	private function AddEmail() {
		$api = new EmailApi();
		$this->Add("GET", "source/:source/emails", $api, "GetBySource", self::LOGGED);
		$this->Add("GET", "key/:key/emails", $api, "GetByKey", self::LOGGED);
		$this->Add("POST", "email", $api, "Send", self::OPEN);
		$this->Add("POST", "send", $api, "Send", self::OPEN);
		$this->Add("POST", "send-next", $api, "SendNext", self::OPEN);
		$this->Add("POST", "proccess", $api, "SendNext", self::OPEN);
	}

}
