<?php

$loader = require "../vendor/autoload.php";
$appRoot = realpath(dirname(__FILE__));
//Magrathea2\MagratheaPHP::Instance()->AppPath($appRoot)->Load();

$configSection = @parse_ini_file("/home/platypusweb/contacts/MagratheaContacts/src/configs/magrathea.conf", true);
print_r($configSection);
echo "test";
