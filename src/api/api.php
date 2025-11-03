<?php

namespace MagratheaContacts;

use AuthApi;
use Magrathea2\Config;
use Magrathea2\MagratheaApi;
use MagratheaContacts\Apikey\ApikeyApi;
use MagratheaContacts\Source\SourceApi;
use MagratheaContacts\Email\EmailApi;
use MagratheaContacts\Smtp\SmtpApi;
use MagratheaContacts\Version\VersionApi;

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
		$this->Cors();
		$this->HealthCheck();
		$this->SetAuth();
		$this->AddSource();
		$this->AddApikey();
		$this->AddEmail();
		$this->SetUrl();
		$this->Add("GET", "version", new VersionApi(), "Index", self::OPEN);
		$this->Add("GET", "changelog", new VersionApi(), "Changelog", self::OPEN);
	}

	private function Cors() {
		$this->Allow([
			"http://localhost:4200",
		]);
		$this->AcceptHeaders([
			"cache-control", "pragma", "expires",
		]);
	}

	private function SetAuth() {
		$authApi = new \MagratheaContacts\AuthApi();
		$this->BaseAuthorization($authApi, self::LOGGED);
		$this->Add("GET", "token", $authApi, "Token", self::OPEN);
		$this->Add("POST", "login", $authApi, "Login", self::OPEN);
	}

	private function SetUrl() {
		$url = Config::Instance()->Get("server_url");
		$this->SetAddress($url);
	}

	private function AddSource() {
		$api = new SourceApi();
		$this->Crud("source", $api, self::LOGGED);
		$apiSmtp = new SmtpApi();
		$this->Crud("smtp", $apiSmtp, self::LOGGED);
	}
	private function AddApikey() {
		$api = new ApikeyApi();
		$this->Crud("key", $api, self::LOGGED);
		$this->Add("GET", "key-create", $api, "CreateKey", self::LOGGED);
		$this->Add("GET", "key/:key/view", $api, "GetByKey", self::OPEN);
		$this->Add("GET", "source/:source/keys", $api, "GetKeysBySource", self::LOGGED);
	}
	private function AddEmail() {
		$api = new EmailApi();
		$this->Add("GET", "source/:source/emails", $api, "GetBySource", self::LOGGED);
		$this->Add("GET", "key/:key/emails", $api, "GetByKey", self::LOGGED);
		$this->Add("POST", "add", $api, "Add", self::OPEN, "Adds an e-mail");
		$this->Add("POST", "email", $api, "Add", self::OPEN, "Adds an e-mail (alias for add)");
		$this->Add("POST", "send", $api, "Send", self::OPEN, "Adds and sends an e-mail");
		$this->Add("POST", "send-next", $api, "SendNext", self::OPEN, "Send next e-mail in queue");
		$this->Add("POST", "proccess", $api, "SendNext", self::OPEN, "Alias for send-next");
	}

}
