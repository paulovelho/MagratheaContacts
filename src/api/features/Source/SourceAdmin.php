<?php
namespace MagratheaContacts\Source;

use Magrathea2\Admin\Features\CrudObject\AdminCrudObject;
use Magrathea2\Admin\AdminManager;
use Magrathea2\Admin\AdminUrls;
use Magrathea2\MagratheaModel;
use MagratheaContacts\Smtp\SmtpControl;

class SourceAdmin extends AdminCrudObject {
	public string $featureName = "Source";

	public function Initialize() {
		$this->SetObject(new Source());
	}

	public function HasEditPermission($user): bool {
		$loggedUser = AdminManager::Instance()->GetLoggedUser();
		return !empty($loggedUser->id);
	}

	public function Columns(): array {
		return [
			["title" => "#ID", "key" => "id"],
			["title" => "Name", "key" => "name"],
			["title" => "SMTP ID", "key" => function ($obj) {
				if(!$obj->smtp_id) return "-";
				$smtpUrl = AdminUrls::Instance()->GetFeatureUrl("CRUDSmtp", null, ["id" => $obj->smtp_id]);
				return "<a href='".$smtpUrl."'>SMTP ID #".$obj->smtp_id."</a>";
			}],
		];
	}

	public function Fields(MagratheaModel $object): array {
		$smtps = SmtpControl::GetSelectWithNone();
		$fields = [
			[
				"name" => "ID", "key" => "id",
				"type" => "disabled", "size" => "col-1",
			],
			[
				"name" => "Name", "key" => "name",
				"type" => "text", "size" => "col-4",
			],
			[
				"name" => "Mail from", "key" => "mail_from",
				"type" => "text", "size" => "col-3",
			],
			[
				"name" => "SMTP", "key" => "smtp_id",
				"type" => $smtps, "size" => "col-4",
			],
			$this->GetSaveButton(),
		];
		return $fields;
	}

	public function Save() {
		$id = $_POST["id"];
		$u = new Source($id);
		$u = $u->Assign($_POST);
		if(!$u->name) {
			$this->ReturnError("Name can't be empty!");
		}
		if(!$u->from) {
			$this->ReturnError("Mail From can't be empty!");
		}
		$success = $u->Save();
		echo json_encode([
			"success" => true,
			"data" => $u,
			"type" => ($id ? "update" : "insert")
		]);
	}
}
