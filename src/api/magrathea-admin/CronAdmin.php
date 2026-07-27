<?php

namespace MagratheaContacts\Admin;

use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;
use MagratheaContacts\Cronlogs\CronRunner;

class CronAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Cron Jobs";
	public string $featureId = "CronAdmin";

	public function __construct() {
		parent::__construct();
		$this->AddJs(__DIR__."/cron/scripts.js");
	}

	private function Runner(): CronRunner {
		return new CronRunner();
	}

	public function GetPage() {
		$runner = $this->Runner();
		$jobs = $runner->LoadJobs();
		$state = $runner->LoadState();
		$env = $runner->CheckEnvironment();
		include(__DIR__."/cron/cron.php");
	}

	public function CheckEnv() {
		$env = $this->Runner()->CheckEnvironment();
		include(__DIR__."/cron/env-rows.php");
	}

	public function Save() {
		$post = $_POST;
		$name = trim($post["name"] ?? "");
		$hitpoint = trim($post["hitpoint"] ?? "");
		$type = ($post["type"] ?? "") === "api" ? "api" : "file";
		$interval = intval($post["interval"] ?? 0);
		$originalName = trim($post["original_name"] ?? "");

		if(!$name || !$hitpoint || $interval <= 0) {
			http_response_code(400);
			echo json_encode(["success" => false, "error" => "name, hitpoint and a positive interval are required"]);
			return;
		}

		$runner = $this->Runner();
		$jobs = $runner->LoadJobs();
		// dropping any row with the old name (rename) or the new name (overwrite) keeps this an upsert
		$jobs = array_values(array_filter($jobs, function($j) use ($name, $originalName) {
			return ($j["name"] ?? null) !== $originalName && ($j["name"] ?? null) !== $name;
		}));
		array_push($jobs, [
			"name" => $name,
			"hitpoint" => $hitpoint,
			"type" => $type,
			"interval" => $interval,
		]);
		$runner->SaveJobs($jobs);
		echo json_encode(["success" => true]);
	}

	public function Delete() {
		$name = trim($_POST["name"] ?? "");
		$runner = $this->Runner();
		$jobs = $runner->LoadJobs();
		$jobs = array_values(array_filter($jobs, fn($j) => ($j["name"] ?? null) !== $name));
		$runner->SaveJobs($jobs);
		echo json_encode(["success" => true]);
	}
}
