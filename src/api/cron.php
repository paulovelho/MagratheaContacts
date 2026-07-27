<?php

use Magrathea2\Config;
use Magrathea2\MagratheaPHP;
use MagratheaContacts\Cronlogs\CronLog;
use MagratheaContacts\Cronlogs\CronRunner;

include("_inc.php");

header("Content-Type: application/json");

// Gate check first: no DB touched even to validate this, on purpose.
$secret = Config::Instance()->Get("cron_secret");
$given = $_GET["key"] ?? "";
if(!$secret || !hash_equals((string)$secret, (string)$given)) {
	http_response_code(403);
	echo json_encode(["success" => false, "error" => "invalid key"]);
	exit;
}

$runner = new CronRunner();
$due = $runner->GetDueJobs();
if(empty($due)) {
	// Nothing to do: exit without ever opening a DB connection.
	echo json_encode(["success" => true, "executed" => []]);
	exit;
}

MagratheaPHP::Instance()
	->Dev()->StartDB();

$executed = [];
foreach($due as $job) {
	// Mark as run before executing, so two overlapping hits can't both fire it.
	$runner->MarkRan($job["name"]);

	$log = CronLog::Instance()->Start($job["name"], $job["hitpoint"]);
	$result = $runner->Execute($job);
	$resultText = mb_strimwidth((string)($result["output"] ?? ""), 0, 250, "...");

	if($result["success"]) {
		$log->Add(json_encode($result))->Result($resultText)->End();
	} else {
		$log->Error($resultText ?: "execution failed", json_encode($result));
	}
	$log->Save();

	$executed[$job["name"]] = $result["success"];
}

echo json_encode(["success" => true, "executed" => $executed]);
