<?php

namespace MagratheaContacts\Email;

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;
use Magrathea2\Debugger;
use Magrathea2\MagratheaMailSMTP;
use MagratheaContacts\Apikey\ApikeyControl;
use MagratheaContacts\Smtp\Smtp;
use MagratheaContacts\Source\SourceControl;

class EmailAdmin extends AdminFeature implements iAdminFeature {

	public string $featureName = "Email";
	public string $featureId = "EmailAdmin";

	public function __construct() {
		parent::__construct();
		$this->SetClassPath(__DIR__);
		$this->AddJs(__DIR__."/admin/scripts.js");
		$this->AddCSS(__DIR__."/../Admin/top-menu.css");
	}

	public function GetPage() {
		include("admin/index.php");
	}

	public function List() {
		$data = $_POST;
		$control = new EmailControl();
		$filter = "";
		$list = [];
		if (@$data["filter_source"]) {
			$source = $data["filter_source"];
			$filter = "Source #".$source;
			$list = $control->GetFromSource($source);
		} else if (@$data["filter_key"]) {
			$key = explode('=', $data["filter_key"])[0];
			$filter = "key ".$key;
			$list = $control->GetFromKey($key);
		} else if (@$data["filter_status"]) {
			$st = $data["filter_status"];
			$status = EnumSentStatus::from($st)->name;
			$filter = "status ".$status;
			$list = $control->GetFromStatusId($st);
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
		$post = $_POST;
		$keyControl = new ApikeyControl();
		try {
			$apiKey = $keyControl->ValidateKey($post["key"]);

			$mail = new Email();
			$mail->ApiKey($apiKey);
			$mail->email_to = $post["mail_to"];
			$mail->msg_subject = $post["subject"];
			$mail->message = $post["message"];
			$mail->priority = 70;
			$mail->Insert();
		} catch(\Exception $ex) {
			AdminElements::Instance()->Alert($ex->getMessage(), "danger");
			die;
		}
		include("admin/view.php");
	}

	public function SMTP() {
		include("admin/smtp.php");
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
			$query = $control->GetQueryToSend();
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

	public function AbortMail() {
		$mailId = @$_GET["id"];
		if(!$mailId) {
			return "ID empty!";
		}
		$mail = new Email($mailId);
		try {
			$mail->SetStatus(EnumSentStatus::Aborted)->Save();
			echo "saved! - - 	";
			print_r($mail);
		} catch(\Exception $ex) {
			print_r($ex);
		}
	}

	public function ChangeStatus() {
//		Debugger::Instance()->LogQueries(true);
		$mailId = @$_POST["id"];
		if(!$mailId) {
			return "ID empty!";
		}
		try {
			$status = EnumSentStatus::from($_POST["status"]);
			if(!$status) {
				return "could not create status from ".$_POST["status"];
			}
			$mail = new Email($mailId);
			$mail->SetStatus($status)->Save();
			print_r($mail);
		} catch(\Exception $ex) {
			print_r($ex);
		}
	}

	public function SendSMTP() {
		$post = $_POST;
		if(!$post["smtp"]) die("SMTP not selected;");
		if(!$post["mail_from"]) die("mail_from invalid");
		if(!$post["mail_to"]) die("mail_to invalid");
		try {
			$smtp = new Smtp($post["smtp"]);
			$mail = new MagratheaMailSMTP();
			$mail->SetFrom($post["mail_from"]);
			$mail->SetTo($post["mail_to"]);
			$mail->SetSubject($post["subject"]);
			$mail->SetHTMLMessage($post["message"]);
			$mail->SetSMTPArray($smtp->getMailArray());
			echo "sending: "; echo $mail;
			$rs = $mail->Send();
			echo "result: [".$rs."]";
		} catch(\Exception $ex) {
			echo "exception reached! ";
			print_r($ex);
			die;
		}
	}

}
