<?php

$loader = require "../vendor/autoload.php";
$appRoot = realpath(dirname(__FILE__));
Magrathea2\MagratheaPHP::Instance()->AppPath($appRoot)->Load();

echo "test";
