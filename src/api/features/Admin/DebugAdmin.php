<?php

namespace MagratheaContacts\Admin;

use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;

class DebugAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Debug";
	public string $featureId = "DebugAdmin";

	public function __construct() {
		parent::__construct();
		$this->AddJs(__DIR__."/debug/debug-mail.js");
	}

	public function GetPage() {
		include("debug/index.php");
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

}
