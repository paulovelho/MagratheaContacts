<?php

use Magrathea2\MagratheaPHP;
use MagratheaContacts\Email\Email;
use MagratheaContacts\Mailpromises\Mailpromises;
use MagratheaContacts\Mailpromises\MailpromisesApi;
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

// source (mail's autoload inner-joins source, so it must be real)
$src = new Source();
$src->name = "tmp_test_source";
$src->mail_from = "noreply@test.com";
$src->Insert();

// template with defaults
$t = new Templates();
$t->name = "tmp_test_promise";
$t->msg_subject = "Welcome to {{project}}, {{first_name}}!";
$t->content = "<div>Olá, {{first_name}}! Bem vindo ao {{project}}.</div>";
$t->Insert();
$t->SetVars(["first_name" => ["default" => "friend"], "project" => ["default" => "Magrathea"]]);
$t->Save();

// promise 1: subject copied from template at add-time (as /add will do), vars sent
$p1 = new Mailpromises();
$p1->source_id = $src->id;
$p1->origin_key = "tmp_test";
$p1->email_from = "noreply@test.com";
$p1->email_replyTo = "noreply@test.com";
$p1->email_to = "someone@test.com";
$p1->msg_subject = $t->msg_subject;
$p1->priority = 50;
$p1->template_id = $t->id;
$p1->SetVars(["first_name" => "João"]);
$p1->Insert();

// promise 2: explicit subject override with its own placeholder
$p2 = new Mailpromises();
$p2->source_id = $src->id;
$p2->origin_key = "tmp_test";
$p2->email_from = "noreply@test.com";
$p2->email_replyTo = "noreply@test.com";
$p2->email_to = "other@test.com";
$p2->msg_subject = "Oi {{first_name}}, presente pra você!";
$p2->priority = 90;
$p2->template_id = $t->id;
$p2->SetVars(["first_name" => "Maria"]);
$p2->Insert();

// promise 3: broken template reference -> must fail but be marked processed
$p3 = new Mailpromises();
$p3->source_id = $src->id;
$p3->origin_key = "tmp_test";
$p3->email_to = "fail@test.com";
$p3->msg_subject = "does not matter";
$p3->priority = 10;
$p3->template_id = 99999;
$p3->Insert();

// process the batch through the endpoint handler
$api = new MailpromisesApi();
$out["process"] = $api->ProcessPromises(null);

// check results
foreach([$p1->id => "p1", $p2->id => "p2", $p3->id => "p3"] as $id => $label) {
	$p = new Mailpromises($id);
	$out[$label] = [
		"processed" => $p->processed,
		"mail_id" => $p->mail_id,
		"processed_date" => $p->processed_date,
	];
	if($p->mail_id) {
		$mail = new Email($p->mail_id);
		$out[$label]["mail_subject"] = $mail->msg_subject;
		$out[$label]["mail_message"] = $mail->message;
		$out[$label]["mail_status"] = $mail->sent_status;
		$out[$label]["mail_priority"] = $mail->priority;
		$mail->Delete();
	}
	$p->Delete();
}

$t->Delete();
$src->Delete();
$out["cleanup"] = true;

echo json_encode($out, JSON_PRETTY_PRINT)."\n";
