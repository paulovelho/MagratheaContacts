<?php
	$admins = AdminControl::GetAll();
?>
<div class="row-fluid">
	<div class="span12 mag_section">
		<header><h3><i class="fa fa-bars"></i> Admins</h3>
		</header>
		<content>
			<div class="row-fluid">
				<div class="span6 right">
					E-mail:
				</div>
				<div class="span6">
					<input type="text" id="email" />
				</div>
			</div>

			<div class="row-fluid">
				<div class="span6 right">
					Password:
				</div>
				<div class="span6">
					<input type="text" id="password" />
				</div>
			</div>

			<div class="row-fluid">
				<div class="span12 right">
					<button class="btn btn-primary" onClick="add();">
						<i class="fa fa-plus-circle"></i> Adicionar
					</button>
					<br/><br/>
				</div>
			</div>

			<div class="row-fluid">
				<div class="span12" id="admin-response"></div>
			</div>

			<div class="row-fluid">
				<div class="span12">
					<table class="table table-striped">
						<tr>
							<th>#</th>
							<th>E-mail</th>
						</tr>
						<? foreach ($admins as $a) {
							?>
							<tr>
								<td><?=$a->id?></td>
								<td><?=$a->email?></td>
							</tr>
							<?
						} ?>
					</table>
				</div>
			</div>
		</content>
	</div>
</div>


<script type="text/javascript">
function add(){
	var email = $("#email").val();
	var password = $("#password").val();
	if(!email || !password){
		$("#admin-response").html('<div class="alert alert-danger" role="alert"><strong>Error!</strong> E-mail and password should not be empty!</div>')
	}
	var page = "admin_add.php";
	MagratheaPost(page, { email: email, password: password }, function(data){
		$("#admin-response").html(data);
	});
}
</script>