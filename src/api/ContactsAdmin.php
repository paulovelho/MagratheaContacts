<?php
use MagratheaContacts\Email\EmailAdmin;

include("api.php");
use Magrathea2\Admin\Admin;
use Magrathea2\Admin\AdminMenu;
use Magrathea2\Admin\Features\UserLogs\AdminFeatureUserLog;
use MagratheaContacts\Apikey\ApikeyAdmin;
use MagratheaContacts\Source\SourceAdmin;
use MagratheaContacts\Users\UsersAdmin;
use Magrathea2\Admin\Features\ApiExplorer\ApiExplorer;
use MagratheaContacts\ContactsApi;

class ContactsAdmin extends Admin implements \Magrathea2\Admin\iAdmin {
	public function Initialize() {
		$this->SetTitle("Contacts");
		$this->SetPrimaryColor("#910e04");
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
	}

	private $features = [];
	public function SetFeatures(){
		$this->LoadApi();
		$this->features["users"] = new UsersAdmin();
		$this->features["source"] = new SourceAdmin();
		$this->features["apikey"] = new ApikeyAdmin();
		$this->features["email"] = new EmailAdmin();
		$this->features["log"] = new AdminFeatureUserLog();
		$this->AddFeaturesArray($this->features);
	}

	public function BuildMenu(): AdminMenu {
		$menu = new AdminMenu();
		$menu
		->Add($this->features["users"]->GetMenuItem())
		->Add($this->features["email"]->GetMenuItem())
		->Add($this->features["source"]->GetMenuItem())
		->Add($this->features["apikey"]->GetMenuItem())
		
		->Add($menu->CreateTitle("Api"))
		->Add($this->features["api"]->GetMenuItem())

		->Add($menu->CreateTitle("Objects"))
		->Add($menu->GetItem("objects"))
		->Add($menu->GetDebugSection())
		->Add($this->features["log"]->GetMenuItem())

		->Add($menu->CreateTitle("Magrathea"))
		->Add($menu->SimpleItem("Database", "db-tables"))
		->Add(["title" => "Magrathea Admin", "link" => "/magrathea.php"])

		->Add($menu->CreateSpace())
		->Add($menu->GetHelpSection())
		->Add($menu->GetLogoutMenuItem());
		return $menu;
	}
}
