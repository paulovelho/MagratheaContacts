<?php

namespace MagratheaContacts\Email;

use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;
use MagratheaContacts\Apikey\ApikeyControl;
use MagratheaContacts\Source\SourceControl;

class EmailAdmin extends AdminFeature implements iAdminFeature {

	public string $featureName = "Email";
	public string $featureId = "EmailAdmin";

	public function __construct() {
		parent::__construct();
		$this->SetClassPath(__DIR__);
		$this->AddJs(__DIR__."/admin/scripts.js");
	}

	public function GetPage() {
		include("admin/index.php");
	}

	public function List() {
		$data = $_POST;
		$control = new EmailControl();
		$list = [];
		if (@$data["filter_source"]) {
			$source = $data["filter_source"];
			$list = $control->GetFromSource($source);
		} else if (@$data["filter_key"]) {
			$source = $data["filter_key"];
			$list = $control->GetFromKey($source);
		} else {
			$list = $control->GetFromSource();
		}
		include("admin/list.php");
	}

	public function NewMail() {
		include("admin/new.php");
	}
	public function Form() {
		$selectKey = ApikeyControl::GetSelect();
		$keys = ApikeyControl::GetAll();
		$sources = SourceControl::GetAll();
		include("admin/form.php");
	}

	public function AddMail() {
		$admin = new EmailApi();
		$mail = $admin->Send(null);
		include("admin/view.php");
	}

	public function View() {
		$data = $_GET;
		$id = $data["id"];
		$mail = new Email($id);
		include("admin/view.php");
	}

	public function Send() {
		$mailId = @$_GET["id"];
		if(empty($mailId)) {
			$control = new EmailControl();
			$mail = $control->GetNextToSend();
			$viewMailTitle = "Next e-mail in queue:";
		} else {
			$mail = new Email($mailId);
			$viewMailTitle = "E-mail ID #".$mailId;
		}
		include("admin/send.php");
	}

	public function SendMail() {
		$mailId = @$_GET["id"];
		if(!$mailId) {
			return "ID empty!";
		}
		$admin = new EmailApi();
		try {
			$send = $admin->SendNext(null);
			print_r($send);
		} catch(\Exception $ex) {
			print_r($ex);
		}
	}

}
