<div class="card card-form">
	<div class="card-header">
		Editing <b><?=$user->email?></b>
		<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
	</div>
	<div class="card-body">
		<?
		$adminForm = new \Magrathea2\Admin\AdminForm();
		$formData = [
			[
				"name" => "#ID",
				"key" => "id",
				"type" => "disabled",
				"size" => "col-2",
			],
			[
				"name" => "E-mail",
				"key" => "email",
				"type" => "text",
				"size" => "col-6",
			],
			[
				"name" => "Role",
				"key" => "role_id",
				"type" => $roles,
				"size" => "col-4",
			],
			[
				"type" => "button",
				"class" => ["btn-success", "w-100"],
				"name" => "Save",
				"size" => "offset-6 col-6",
				"action" => "saveUser(this);"
			],
		];
		if($user->id) {
			array_push($formData, [
				"type" => "button",
				"action" => "deleteUser(".$user->id.")",
				"name" => "Delete",
				"class" => ["btn-danger", "w-100"],
				"size" => "col-3",
			],
			[
				"type" => "button",
				"class" => ["btn-primary", "w-100", "change-pwd-btn"],
				"name" => "Change Password",
				"action" => "showPasswordForm(".$user->id.");",
				"size" => "col-3 offset-3",
			]);
		}
		$adminForm->Build($formData, $user)->Print();
		?>
	</div>
</div>
