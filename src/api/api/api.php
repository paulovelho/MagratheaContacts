<?php

namespace MagratheaContacts;

use ApiControl;
use Magrathea2\Config;
use Magrathea2\MagratheaApi;
use Magrathea2\MagratheaApiAuth;
use MagratheaContacts\Apikey\ApikeyApi;
use MagratheaContacts\Source\SourceApi;
use MagratheaContacts\Cronlogs\CronlogsApi;
use MagratheaContacts\Email\EmailApi;
use MagratheaContacts\Mailpromises\MailpromisesApi;
use MagratheaContacts\Smtp\SmtpApi;
use MagratheaContacts\Templates\TemplatesApi;
use MagratheaContacts\Version\VersionApi;

require "../vendor/autoload.php";

class ContactsApi extends MagratheaApi {

	public MagratheaApiAuth|null $authApi = null;
	const OPEN = false;
	const LOGGED = "IsLogged";
	const ADMIN = "IsAdmin"; //

	public function __construct() {
		$this->Initialize();
	}
	public function Initialize() {
		\Magrathea2\MagratheaPHP::Instance()->StartDb();
		$this->Cors();
		$this->SetUrl();
		$this->HealthCheck();
		$this->SetAuth();
		$this->AddSource();
		$this->AddApikey();
		$this->AddEmail();
		$this->AddTemplates();
		$this->CronLogs();
		$this->General();
	}

	private function Cors() {
		$file = \Magrathea2\MagratheaPHP::Instance()->GetConfigRoot()."/cors-origins.txt";
		$origins = [];
		if (file_exists($file)) {
			$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
			$origins = array_filter(array_map('trim', $lines), fn($l) => $l !== '' && $l[0] !== '#');
		}
		$this->Allow($origins);
		$this->AcceptHeaders([
			"cache-control", "pragma", "expires",
		]);
	}

	private function SetUrl() {
		$url = Config::Instance()->Get("server_url");
		$this->SetAddress($url);
	}

	private function SetAuth() {
		$authApi = new \MagratheaContacts\AuthApi();
		$this->BaseAuthorization($authApi, self::LOGGED);
		$this->Add("GET", "token", $authApi, "Token", self::OPEN);
		$this->Add("POST", "login", $authApi, "Login", self::OPEN);
		$this->Add("GET", "ping", null, function() { return "ok"; }, self::LOGGED);
	}

	private function General() {
		$this->HealthCheck(true);
		$versionControl = new VersionApi();
		$this->Add("GET", "version", $versionControl, "Index", self::OPEN);
		$this->Add("GET", "changelog", $versionControl, "Changelog", self::OPEN);
		$apiControl = new ApiControl();
		$this->Add("GET", "enum/status", $apiControl, "GetStatusEnums", self::OPEN);
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
		$this->Add("GET", "source/:source/filter", $api, "Filter", self::LOGGED);
		$this->Add("GET", "key/:key/emails", $api, "GetByKey", self::LOGGED);
		$this->Add("GET", "email/:id", $api, "Read", self::ADMIN);
		$this->Add("POST", "add", $api, "Add", self::OPEN, "Adds an e-mail");
		$this->Add("POST", "email", $api, "Add", self::OPEN, "Adds an e-mail (alias for add)");
		$this->Add("POST", "send", $api, "Send", self::OPEN, "Adds and sends an e-mail");
		$this->Add("POST", "send-next", $api, "SendNext", self::OPEN, "Send next e-mail in queue");
		$this->Add("POST", "proccess", $api, "SendNext", self::OPEN, "Alias for send-next");
	}
	private function AddTemplates() {
		$api = new TemplatesApi();
		$this->Crud("template", $api, self::LOGGED);
		$this->Add("POST", "template/preview", $api, "Preview", self::LOGGED, "Extracts vars and renders a template without saving");
		$this->Add("GET", "source/:source/templates", $api, "GetBySource", self::LOGGED);
		$promises = new MailpromisesApi();
		$this->Add("POST", "process-promises", $promises, "ProcessPromises", self::OPEN, "Renders a batch of pending mail promises");
		$this->Add("GET", "source/:source/promises", $promises, "GetBySource", self::LOGGED);
		$this->Add("GET", "template/:template/promises", $promises, "GetByTemplate", self::LOGGED);
		$this->Add("GET", "promise/:id", $promises, "Read", self::ADMIN);
		$this->Add("POST", "promise/:id/process", $promises, "ProcessOne", self::ADMIN);
	}
	private function CronLogs() {
		$api = new CronlogsApi();
		$this->Add("GET", "cronlogs", $api, "GetLast", self::ADMIN);
		$this->Add("DELETE", "cronlogs", $api, "DeleteOlderThan", self::ADMIN);
	}

}
