<?php

namespace MagratheaContacts\Admin;

use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;
use Magrathea2\MagratheaPHP;

class CorsAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "CORS Origins";
	public string $featureId = "CorsAdmin";

	private function GetFilePath(): string {
		return MagratheaPHP::Instance()->GetAppRoot() . "/configs/cors-origins.txt";
	}

	public function GetPage() {
		$file = $this->GetFilePath();
		$contents = file_exists($file) ? file_get_contents($file) : "";
		include(__DIR__ . "/cors/cors.php");
	}

	public function Save() {
		$raw = $_POST["origins"] ?? "";
		$lines = explode("\n", str_replace("\r\n", "\n", $raw));
		$cleaned = array_filter(array_map('trim', $lines), fn($l) => $l !== '');
		$output = implode("\n", $cleaned) . "\n";
		file_put_contents($this->GetFilePath(), $output);
		echo json_encode(["success" => true]);
	}
}
