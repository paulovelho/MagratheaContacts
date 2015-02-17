<?php

	$data = $_POST;
	$email = new Email();
	$email->source_id = $data["source_id"];
	$email->email_from = $data["email_from"];
	$email->email_replyTo = $data["email_replyTo"];
	$email->email_to = $data["email_to"];
	$email->msg_subject = $data["msg_subject"];
	$email->message = $data["message"];
	$email->priority = $data["priority"];
	$email->add_date = now();
	$email->sent_status = 0;
	$email->Insert();

	if(empty($email->id)){
		?>
		<div class="alert alert-error">
			<button class="close" data-dismiss="alert" type="button">×</button>
			<strong>Error adding mail</strong></br/>
			It seems that something wrong happened!
		</div>
		<?
	} else {
		?>
		<div class="alert alert-success">
			<button class="close" data-dismiss="alert" type="button">×</button>
			<strong>Success!</strong><br/>
			E-mail added to table: <br/>
			<textarea class="textarea_large"><?=p_r($email)?></textarea><br/>
		</div>
		<?
	}


?>