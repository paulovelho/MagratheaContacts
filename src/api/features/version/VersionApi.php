<?php
namespace MagratheaContacts\Version;

use Magrathea2\Config;
use Magrathea2\Exceptions\MagratheaApiException;
use Magrathea2\MagratheaHelper;
use Magrathea2\MagratheaPHP;

class VersionApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {}

	public function Index() {
		$appRoot = MagratheaPHP::Instance()->GetAppRoot();
		$configRoot = MagratheaPHP::Instance()->GetConfigRoot();
		$versionFile = $configRoot."/version.php";
		if(file_exists($versionFile)) {
			require $versionFile;
		} else {
			$version = [];
		}
		$version["version"] = MagratheaPHP::Instance()->AppVersion();
		$version["magrathea_version"] = MagratheaPHP::Instance()->Version();
		$version["magrathea_version_required"] = MagratheaPHP::Instance()->versionRequired;
		$version["timezone"] = Config::Instance()->Get("timezone");
		$version["time"] = \Magrathea2\now();
		return $version;
	}

	public function Changelog() {
		$root = MagratheaPHP::Instance()->GetAppRoot();
		$logFile = MagratheaHelper::EnsureTrailingSlash($root)."../changelog.md";
		if(!file_exists($logFile)) throw new MagratheaApiException("changelog file not found", 404, $logFile);
		return $this->Raw(file_get_contents($logFile));
	}

}
