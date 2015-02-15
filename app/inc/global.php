<?php

	// include pear for dreamhost:
//	set_include_path("." . PATH_SEPARATOR . ($UserDir = "/home/paulovelho/pear/php" . PATH_SEPARATOR . get_include_path()));

	session_start();

//	error_reporting(E_ALL ^ E_STRICT);
	error_reporting(1);

	$magrathea_path = "/Users/paulovelho/Sites/Magrathea/Magrathea";
	$site_path = __DIR__."/../..";
 
	// looooooaaaadddiiiiiinnnnnnggggg.....
	// echo "loading magrathea";
	include($magrathea_path."/LOAD.php");

	$Smarty = new Smarty;
	$Smarty->template_dir = $site_path."/app/Views/";
	$Smarty->compile_dir  = $site_path."/app/Views/_compiled";
	$Smarty->config_dir   = $site_path."/app/Views/configs";
	$Smarty->cache_dir    = $site_path."/app/Views/_cache";
	$Smarty->configLoad("site.conf");
	
	$View = new MagratheaView();
	$Smarty->assign("View", $View);

	$View->IsRelativePath(false); // for mod_rewrite


	// wanna debug? here's your debug!
	// options: dev; debug; log; none;
	MagratheaDebugger::Instance()->SetType(MagratheaDebugger::DEBUG);
?>
