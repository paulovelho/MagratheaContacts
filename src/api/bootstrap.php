<?php

//die;
$loader = require "../vendor/autoload.php";

$appRoot = realpath(dirname(__FILE__));
$bootstrap = Magrathea2\Bootstrap\Start::Instance();
Magrathea2\MagratheaPHP::Instance()->AppPath($appRoot)->Dev()->Load();
$bootstrap->Load();

