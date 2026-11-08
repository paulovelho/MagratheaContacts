<?php

use Magrathea2\MagratheaPHP;
use MagratheaContacts\Templates\Templates;
use MagratheaContacts\Templates\TemplatesControl;

include(__DIR__."/../_inc.php");
MagratheaPHP::Instance()->Dev()->StartDB();

$out = [];

// 1. ExtractVars + SyncVars
$t = new Templates();
$t->name = "tmp_test_welcome";
$t->msg_subject = "Welcome to {{new_project}}, {{first_name}}!";
$t->content = '<div>Olá, {{ first_name }}! <img src="{{image_url}}" /></div>';
$out["extracted"] = $t->ExtractVars();

// 2. Insert (should auto-SyncVars)
$id = $t->Insert();
$out["inserted_id"] = $id;
$saved = new Templates($id);
$out["vars_after_insert"] = $saved->GetVars();

// 3. Render: value sent, default, missing
$saved->SetVars([
	"first_name" => ["default" => "friend"],
	"new_project" => ["default" => ""],
	"image_url" => ["default" => "https://img.default/x.png"],
]);
$out["render"] = $saved->Render(["new_project" => "MagratheaContacts"]);

// 4. Update keeping defaults: change content, keep placeholders + add one
$saved->content = '<div>Olá {{first_name}}, veja {{banner}}!</div>';
$saved->Update();
$reloaded = new Templates($id);
$out["vars_after_update"] = $reloaded->GetVars();

// 5. GetByName (source 1 or global — template has source_id NULL)
$control = new TemplatesControl();
$found = $control->GetByName("tmp_test_welcome", 1);
$out["get_by_name"] = $found ? $found->id : null;

// cleanup (db rows only)
$reloaded->Delete();
$out["cleanup"] = true;

echo json_encode($out, JSON_PRETTY_PRINT)."\n";
