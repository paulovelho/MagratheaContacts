<?php
$adminForm = new \Magrathea2\Admin\AdminForm();
	?>
	<div class="card card-form">
		<div class="card-header">
			Change password [<b><?=$user->email?></b>]
			<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
		</div>
		<div class="card-body">
			<?
			$adminForm
				->SetName("pwd-change")
				->Build(
				[
					[
						"type" => "hidden",
						"size" => "col-12",
						"key" => "id",
						"name" => "id",
					],
					[
						"type" => "text",
						"name" => "New Password",
						"size" => "col-6 pwd-row",
						"key" => "new_password",
						"attributes" => [ "id" => "new_password" ],
					],
					[
						"type" => "button",
						"name" => "Randomize",
						"class" => ["btn-primary", "w-100"],
						"size" => "col-3 pwd-row",
						"action" => "randomPassword();",
					],
					[
						"type" => "button",
						"name" => "Update Password",
						"class" => ["btn-success", "w-100"],
						"size" => "col-3 pwd-row",
						"action" => "savePassword(this);",
					],
				],
				[
					"id" => $user->id
				]
			)->Print();
			?>
		</div>
	</div>
</div>
