<?php

	$data = $_POST;
	$source = new Source();
	$source->name = $data["name"];
	$source->from = $data["from"];
	$source->Insert();

	if(empty($source->id)){
		?>
		<div class="alert alert-error">
			<button class="close" data-dismiss="alert" type="button">×</button>
			<strong>Error adding source</strong></br/>
			It seems that something wrong happened!
		</div>
		<?
	} else {
		?>
		<div class="alert alert-success">
			<button class="close" data-dismiss="alert" type="button">×</button>
			<strong>Success!</strong><br/>
			Source added to table: <br/>
			<textarea class="textarea_large"><?=p_r($source)?></textarea><br/>
		</div>
		<?
	}


?>