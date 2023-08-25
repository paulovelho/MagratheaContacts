<?php

include("_inc.php");
include("api.php");

use MagratheaContacts\ContactsApi;

$api = new ContactsApi();
$api->Run();

