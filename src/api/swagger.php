<?php
require __DIR__."/../vendor/autoload.php";

use Magrathea2\Config;

Config::Instance()->SetPath(__DIR__."/../configs");

$swaggerFile = realpath(__DIR__."/../openapi.yaml");
if (!$swaggerFile || !file_exists($swaggerFile)) {
	http_response_code(404);
	die("swagger.yaml not found");
}

$contents = file_get_contents($swaggerFile);
$appUrl = Config::Instance()->Get("server_url");
if ($appUrl) {
	$contents = preg_replace(
		'/(apiUrl:\s*\n\s*default:\s*).*/',
		'${1}'.$appUrl,
		$contents
	);
}

header("Content-Type: application/yaml");
header("Access-Control-Allow-Origin: *");
echo $contents;
