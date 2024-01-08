<?php
namespace MagratheaContacts\Version;

use Magrathea2\Admin\AdminElements;
use Magrathea2\Admin\AdminFeature;
use Magrathea2\Admin\iAdminFeature;
use Magrathea2\MagratheaPHP;

class VersionAdmin extends AdminFeature implements iAdminFeature {
	public string $featureName = "Version";
	public string $featureId = "VersionFeature";

	public function Index() {
		AdminElements::Instance()->Header("Version");
		echo "<br/>";
		$configRoot = MagratheaPHP::Instance()->getConfigRoot();
		require $configRoot."/version.php";
		echo "<pre class='m-4'>"; print_r($version); echo "</pre>";
	}

}
