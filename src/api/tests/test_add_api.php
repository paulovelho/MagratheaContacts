<?php

use Magrathea2\MagratheaPHP;
use MagratheaContacts\Apikey\Apikey;
use MagratheaContacts\Email\Email;
use MagratheaContacts\Email\EmailApi;
use MagratheaContacts\Mailpromises\Mailpromises;
use MagratheaContacts\Source\Source;
use MagratheaContacts\Templates\Templates;

// Safety: never allow this script to be served over HTTP.
if (php_sapi_name() !== 'cli') {
	http_response_code(404);
	exit;
}

include(__DIR__."/../_inc.php");
MagratheaPHP::Instance()->Dev()->StartDB();

$out = [];

// fixture: source + api key + template
$src = new Source();
$src->name = "tmp_test_source";
$src->mail_from = "noreply@test.com";
$src->Insert();

$key = new Apikey();
$key->source_id = $src->id;
$key->description = "tmp test key";
$key->priority = 60;
$key->val = "tmp_test_key_".uniqid();
$key->uses = 0;
$key->usage_limit = 1000;
// note: expiration stays null — Apikey::ValidateKey flags future expirations as "key expired"
$key->simulate = true;
$key->active = true;
$key->Insert();

$t = new Templates();
$t->name = "tmp_test_add";
$t->source_id = $src->id;
$t->msg_subject = "Bem vindo, {{first_name}}!";
$t->content = "<div>Olá {{first_name}}, seja bem vindo ao {{project}}.</div>";
$t->Insert();
$t->SetVars(["first_name" => ["default" => "amigo"], "project" => ["default" => "Magrathea"]]);
$t->Save();

$api = new EmailApi();
$created = ["mails" => [], "promises" => []];

function callAdd($api, $post) {
	$_POST = $post;
	return $api->Add(null);
}

// 1. /add with template by name -> promise, subject copied, unprocessed
$rs = callAdd($api, [
	"key" => $key->val, "to" => "p1@test.com",
	"template" => "tmp_test_add",
	"vars" => ["first_name" => "João"],
]);
$out["1_template_by_name"] = [
	"is_promise" => $rs instanceof Mailpromises,
	"subject_copied" => $rs->msg_subject,
	"processed" => $rs->processed,
	"priority_from_key" => $rs->priority,
];
array_push($created["promises"], $rs->id);

// 2. /add with template_id + process=1 -> promise processed, mail created
$rs = callAdd($api, [
	"key" => $key->val, "to" => "p2@test.com",
	"template_id" => $t->id, "process" => 1,
	"vars" => '{"first_name": "Maria", "project": "Contacts"}',
]);
$mail = new Email($rs->mail_id);
$out["2_immediate_process"] = [
	"processed" => $rs->processed,
	"mail_id" => $rs->mail_id,
	"mail_subject" => $mail->msg_subject,
	"mail_message" => $mail->message,
];
array_push($created["promises"], $rs->id);
array_push($created["mails"], $rs->mail_id);

// 3. /add with template + explicit subject -> override stored on the promise
$rs = callAdd($api, [
	"key" => $key->val, "to" => "p3@test.com",
	"template" => "tmp_test_add",
	"subject" => "Assunto próprio de {{first_name}}",
	"vars" => ["first_name" => "José"],
]);
$out["3_subject_override"] = [
	"subject_stored" => $rs->msg_subject,
	"message_override" => $rs->message,
];
array_push($created["promises"], $rs->id);

// 4. /add without template -> regular mail, behavior unchanged
$rs = callAdd($api, [
	"key" => $key->val, "to" => "p4@test.com",
	"subject" => "plain", "message" => "plain mail",
]);
$out["4_plain_add"] = [
	"is_mail" => $rs instanceof Email,
	"status" => $rs->sent_status,
];
array_push($created["mails"], $rs->id);

// 5. /add with unknown template -> 400 error
try {
	callAdd($api, ["key" => $key->val, "to" => "p5@test.com", "template" => "does_not_exist"]);
	$out["5_unknown_template"] = "NO ERROR (wrong!)";
} catch(\Exception $ex) {
	$out["5_unknown_template"] = $ex->getMessage();
}

// 6. /add with template missing 'to' -> 400 error
try {
	callAdd($api, ["key" => $key->val, "template" => "tmp_test_add"]);
	$out["6_missing_to"] = "NO ERROR (wrong!)";
} catch(\Exception $ex) {
	$out["6_missing_to"] = $ex->getMessage();
}

// cleanup
foreach($created["promises"] as $id) (new Mailpromises($id))->Delete();
foreach($created["mails"] as $id) (new Email($id))->Delete();
$t->Delete();
$key->Delete();
$src->Delete();
$out["cleanup"] = true;

echo json_encode($out, JSON_PRETTY_PRINT)."\n";
