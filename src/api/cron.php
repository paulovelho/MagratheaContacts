<?php

use MagratheaContacts\Email\EmailApi;

include("_inc.php");

$emailApi = new EmailApi();
echo json_encode($emailApi->SendNext(null));
