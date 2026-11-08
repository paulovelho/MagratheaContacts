<?php
namespace MagratheaContacts\Cronlogs;

use Magrathea2\Config;
use Magrathea2\MagratheaPHP;

/**
 * Loads cron job definitions (src/configs/cron.conf) and run state
 * (src/configs/cron-state.json), decides which jobs are due, and executes them.
 * Every method here is DB-free by design - the due-check must stay cheap enough
 * to run on every hit, including the ones that end up doing nothing.
 */
class CronRunner {

	const TYPE_FILE = "file";
	const TYPE_API = "api";

	private function ConfigsDir(): string {
		return MagratheaPHP::Instance()->GetAppRoot() . "/../configs";
	}

	public function GetConfigPath(): string {
		return $this->ConfigsDir() . "/cron.conf";
	}

	public function GetStatePath(): string {
		return $this->ConfigsDir() . "/cron-state.json";
	}

	/**
	 * @return array<int, array{name:string, hitpoint:string, type:string, interval:int}>
	 */
	public function LoadJobs(): array {
		$path = $this->GetConfigPath();
		if(!file_exists($path)) return [];
		$raw = file_get_contents($path);
		$jobs = json_decode($raw, true);
		if(!is_array($jobs)) return [];
		return $jobs;
	}

	public function SaveJobs(array $jobs): bool {
		$path = $this->GetConfigPath();
		$fp = fopen($path, "c+");
		if(!$fp) return false;
		flock($fp, LOCK_EX);
		ftruncate($fp, 0);
		fwrite($fp, json_encode(array_values($jobs), JSON_PRETTY_PRINT));
		flock($fp, LOCK_UN);
		fclose($fp);
		return true;
	}

	/**
	 * @return array<string, int> job name => last run unix timestamp
	 */
	public function LoadState(): array {
		$path = $this->GetStatePath();
		if(!file_exists($path)) return [];
		$raw = file_get_contents($path);
		$state = json_decode($raw, true);
		if(!is_array($state)) return [];
		return $state;
	}

	/**
	 * Marks a job as run now. Read-modify-write under an exclusive lock,
	 * so two overlapping hits near the interval boundary can't both slip through.
	 */
	public function MarkRan(string $name, ?int $when=null): void {
		$when = $when ?? time();
		$path = $this->GetStatePath();
		$fp = fopen($path, "c+");
		if(!$fp) return;
		flock($fp, LOCK_EX);
		$size = filesize($path);
		$raw = $size > 0 ? fread($fp, $size) : "";
		$state = json_decode($raw, true);
		if(!is_array($state)) $state = [];
		$state[$name] = $when;
		ftruncate($fp, 0);
		rewind($fp);
		fwrite($fp, json_encode($state));
		flock($fp, LOCK_UN);
		fclose($fp);
	}

	/**
	 * @return array<int, array{name:string, hitpoint:string, type:string, interval:int}>
	 */
	public function GetDueJobs(): array {
		$jobs = $this->LoadJobs();
		$state = $this->LoadState();
		$now = time();
		$due = [];
		foreach($jobs as $job) {
			$name = $job["name"] ?? null;
			$interval = intval($job["interval"] ?? 0);
			if(!$name || $interval <= 0) continue;
			$last = intval($state[$name] ?? 0);
			if(($now - $last) >= ($interval * 60)) {
				array_push($due, $job);
			}
		}
		return $due;
	}

	/**
	 * Runs a single job's hitpoint. Never throws - failures come back as
	 * ["success" => false, "output" => "..."] so the caller can always log something.
	 */
	public function Execute(array $job): array {
		$type = $job["type"] ?? self::TYPE_FILE;
		$hitpoint = $job["hitpoint"] ?? "";
		try {
			if($type === self::TYPE_API) return $this->ExecuteApi($hitpoint);
			if($type === self::TYPE_FILE) return $this->ExecuteFile($hitpoint);
			return ["success" => false, "output" => "unknown hitpoint type [".$type."]"];
		} catch(\Throwable $ex) {
			return ["success" => false, "output" => $ex->getMessage()];
		}
	}

	/**
	 * Checks whether this host can actually run "file" hitpoints and that the
	 * gate/config files are in place. Meant for an admin-facing verification panel,
	 * not called from the cron.php request path.
	 * @return array{exec_available:bool, exec_test:array, configs_writable:bool, cron_secret_set:bool, php_binary:string}
	 */
	public function CheckEnvironment(): array {
		$execAvailable = function_exists("exec");
		$execTest = ["ran" => false, "output" => "", "exit_code" => null];
		$phpBinary = (PHP_SAPI === "cli") ? PHP_BINARY : "php";
		if($execAvailable) {
			exec(escapeshellarg($phpBinary) . " -v 2>&1", $outputLines, $exitCode);
			$execTest = [
				"ran" => ($exitCode === 0),
				"output" => implode("\n", $outputLines),
				"exit_code" => $exitCode,
			];
		}
		return [
			"exec_available" => $execAvailable,
			"exec_test" => $execTest,
			"php_binary" => $phpBinary,
			"configs_writable" => is_writable($this->ConfigsDir()),
			"cron_secret_set" => !empty(Config::Instance()->Get("cron_secret")),
		];
	}

	/**
	 * Builds the crontab line to run cron.php directly via CLI (bypassing the
	 * HTTP secret gate - see cron.php's PHP_SAPI check). Display-only, for the
	 * admin panel; never executed by this code.
	 */
	public function SuggestedCrontabLine(): string {
		$phpBinary = (PHP_SAPI === "cli") ? PHP_BINARY : "php";
		$appRoot = MagratheaPHP::Instance()->GetAppRoot();
		return "* * * * * cd \"".$appRoot."\" && ".$phpBinary." cron.php >> /dev/null 2>&1";
	}

	/**
	 * Reads back the current user's system crontab (`crontab -l`), so the admin
	 * panel can show what's actually scheduled on this host, not just what
	 * cron.conf says should run.
	 * @return array{available:bool, exit_code:?int, raw:string, lines:array<string>, has_cron_entry:bool}
	 */
	public function GetSystemCrontab(): array {
		if(!function_exists("exec")) {
			return ["available" => false, "exit_code" => null, "raw" => "", "lines" => [], "has_cron_entry" => false];
		}
		exec("crontab -l 2>&1", $outputLines, $exitCode);
		$hasEntry = false;
		foreach($outputLines as $line) {
			if(stripos($line, "cron.php") !== false) { $hasEntry = true; break; }
		}
		return [
			"available" => true,
			"exit_code" => $exitCode,
			"raw" => implode("\n", $outputLines),
			"lines" => $outputLines,
			"has_cron_entry" => $hasEntry,
		];
	}

	private function ExecuteFile(string $hitpoint): array {
		if(!function_exists("exec")) {
			return ["success" => false, "output" => "exec() is disabled on this host"];
		}
		// hitpoints only ever live directly inside src/api/ - basename() blocks path traversal
		$path = MagratheaPHP::Instance()->GetAppRoot() . "/" . basename($hitpoint);
		if(!file_exists($path)) {
			return ["success" => false, "output" => "hitpoint file not found [".$path."]"];
		}
		// PHP_BINARY is unreliable here: under mod_php/php-fpm it points at the
		// server SAPI, not a CLI binary. Resolve "php" from PATH instead, same
		// as the crontab invocation this replaces.
		$phpBinary = (PHP_SAPI === "cli") ? PHP_BINARY : "php";
		$cmd = escapeshellarg($phpBinary) . " " . escapeshellarg($path) . " 2>&1";
		exec($cmd, $outputLines, $exitCode);
		return [
			"success" => ($exitCode === 0),
			"output" => implode("\n", $outputLines),
			"exit_code" => $exitCode,
		];
	}

	private function ExecuteApi(string $hitpoint): array {
		$context = stream_context_create([
			"http" => [
				"method" => "GET",
				"timeout" => 10,
				"ignore_errors" => true,
			],
		]);
		$body = @file_get_contents($hitpoint, false, $context);
		$statusCode = 0;
		if(isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
			$statusCode = intval($m[1]);
		}
		if($body === false) {
			return ["success" => false, "output" => "request failed", "status_code" => $statusCode];
		}
		return [
			"success" => ($statusCode >= 200 && $statusCode < 300),
			"output" => $body,
			"status_code" => $statusCode,
		];
	}

}
