<?php
namespace MagratheaContacts\Version;

use Magrathea2\MagratheaPHP;

class VersionApi extends \Magrathea2\MagratheaApiControl {
	public function __construct() {}

	public function Index() {
		$configRoot = MagratheaPHP::Instance()->getConfigRoot();
		require $configRoot."/version.php";
		return $version;
	}

}
