<?php
namespace MagratheaContacts;

use MagratheaContacts\Smtp\SmtpAdmin;
use MagratheaContacts\Version\VersionAdmin;

include("api/api.php");
use Magrathea2\Admin\Admin;
use Magrathea2\Admin\AdminMenu;
use Magrathea2\Admin\Features\ApiExplorer\ApiExplorer;
use Magrathea2\Admin\Features\AppConfig\AdminFeatureAppConfig;
use Magrathea2\Admin\Features\OpenApi\OpenApiAdmin;
use Magrathea2\Admin\Features\UserLogs\AdminFeatureUserLog;
use MagratheaContacts\Admin\CorsAdmin;
use MagratheaContacts\Admin\DebugAdmin;
use MagratheaContacts\Apikey\ApikeyAdmin;
use MagratheaContacts\Source\SourceAdmin;
use MagratheaContacts\Users\UsersAdmin;
use MagratheaContacts\Email\EmailAdmin;
use MagratheaContacts\Mailpromises\MailpromisesAdmin;
use MagratheaContacts\Templates\TemplatesAdmin;
use MagratheaContacts\ContactsApi;
use MagratheaContacts\Cronlogs\CronlogsAdmin;

class ContactsAdmin extends Admin implements \Magrathea2\Admin\iAdmin {
	private $features = [];
	public function Initialize() {
		$this->SetTitle("Contacts");
		$this->SetPrimaryColor("#192045");
		$this->SetAdminLogo(__DIR__."/../logo.svg");
		$this->LoadApi();
		$this->OtherAdmins();
		$this->AddTests();
	}

	public function Auth($user): bool {
		return !empty($user->id);
	}

	public function LoadApi() {
		$api = new ContactsApi();
		$apiFeature = new ApiExplorer();
		$apiFeature->SetApi($api);
		$this->features["api"] = $apiFeature;
		$this->AddFeature($apiFeature);
		$this->AddFeature(new OpenApiAdmin("swagger.php"), "openApi");
	}

	public function SetFeatures(){
		parent::SetFeatures();
		$this->AddCrudFeature(new SourceAdmin());
		$this->AddCrudFeature(new CronlogsAdmin());
		$this->AddCrudFeature(new SmtpAdmin());
		$this->AddCrudFeature(new ApikeyAdmin());
		$this->AddCrudFeature(new TemplatesAdmin());
		$this->AddCrudFeature(new MailpromisesAdmin());
	}

	public function OtherAdmins() {
		$this->AddFeature(new EmailAdmin(), "EmailAdmin");
		$this->AddFeature(new DebugAdmin(), "DebugAdmin");
		$this->AddFeature(new CorsAdmin(), "CorsAdmin");
		// $this->AddCrudFeature(new AdminFeatureUserLog());
		// $this->AddCrudFeature(new AdminFeatureAppConfig());
		// $this->AddCrudFeature(new UsersAdmin());
		// $this->AddCrudFeature(new ApikeyAdmin());
		// $this->AddCrudFeature(new EmailAdmin());
		// $this->AddCrudFeature(new DebugAdmin());
		// $this->AddCrudFeature(new VersionAdmin());
	}

	public function BuildMenu(): AdminMenu {
		$menu = new AdminMenu();
		// $menu
		// ->Add($this->features["users"]->GetMenuItem())
		// ->Add($this->features["email"]->GetMenuItem())
		// ->Add($this->features["smtp"]->GetMenuItem())
		// ->Add($this->features["source"]->GetMenuItem())
		// ->Add($this->features["apikey"]->GetMenuItem());
		// $menu
		// 	->Add($menu->CreateSpace())
		// 	->Add($this->features["version"]->GetMenuItem())
		// 	->Add($this->features["debug"]->GetMenuItem())
		// 	->Add($this->features["cron"]->GetMenuItem())

		$menu
			->Add($menu->CreateTitle("Api"))
			->Add($this->features["api"]->GetMenuItem())
			->Add($this->GetMenuItem("openApi"));
		$menu
			->Add($menu->CreateTitle("E-mails"))
			->Add($this->GetMenuItem("EmailAdmin"))
			->Add($this->GetMenuItem("DebugAdmin"));
		$menu
			->Add($menu->CreateTitle("Settings"))
			->Add($this->GetMenuItem("CorsAdmin"));

		$this->AddFeaturesMenu($menu);

		// ->Add($menu->GetDebugSection())
		// ->Add($this->features["log"]->GetMenuItem())

		// ->Add($menu->CreateTitle("Magrathea"))
		// ->Add($this->features["appconfig"]->GetMenuItem())
		// ->Add($menu->SimpleItem("Database", "db-query"))
		// ->Add($menu->GetItem("objects"))

		// ->Add($menu->CreateSpace())
		// ->Add($menu->GetHelpSection())
		// ->Add(["title" => "Magrathea Admin", "link" => "/magrathea.php"])

		$menu->Add(["title" => "Magrathea", "type" => "main" ]);
		$this->AddMagratheaMenu($menu);
		$menu->Add($menu->GetLogoutMenuItem());
		return $menu;
	}
}
