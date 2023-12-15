<?php

namespace MagratheaContacts\Admin;

use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;
use Magrathea2\MagratheaMailSMTP;
use MagratheaContacts\Smtp\Smtp;

class DebugAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Debug";
	public string $featureId = "DebugAdmin";

	public function __construct() {
		parent::__construct();
		$this->AddJs(__DIR__."/debug/debug-mail.js");
	}

	public function GetPage() {
		$this->Smtp();
	}
	public function Mail() {
		$active = "Mail";
		include("debug/mail.php");
	}
	public function Smtp() {
		$active = "Smtp";
		include("debug/smtp.php");
	}
	public function SendMail() {
		$post = $_POST;
		$to = $post["to"];
		$subject = $post["subject"];
		$message = $post["message"];
		$headers = $post["headers"];
		$params = $post["params"];
		$rs = mail($to, $subject, $message, $headers, $params);
		echo $rs;
	}

	public function SendSmtp() {
		\Magrathea2\MagratheaPHP::Instance()->Debug();
		$post = $_POST;
		$smtp = new Smtp($post["smtp"]);
		$mail = new MagratheaMailSMTP();
		$mail->SetSMTPArray($smtp->getMailArray());
		$mail->SetTo($post["to"]);
		$mail->SetFrom($post["from"]);
		$mail->SetSubject($post["subject"]);
		$mail->SetHTMLMessage($post["message"]);
		$send = "--";
//		$send = $mail->Send();
//		echo $mail;
		$rs = [
			"send" => $send,
			"mail" => $mail->GetInfo(),
		];
		if(!$send) {
			$rs["error"] = $mail->GetError();
		}
		print_r($rs);
	}

}
