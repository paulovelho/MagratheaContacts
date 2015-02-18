<?php
	$server_url = MagratheaConfig::Instance()->GetFromDefault("server_url");
?>

<div class="row-fluid">
	<div class="span12 mag_section">
		<header><h3>Send Mail</h3>
		</header>
		<content>
			<div class='row-fluid'>
				<div class="span12">
					<pre>
//	cron job
//	*/30 * * * * wget --delete-after -q <?=$server_url?>/server.php?sendMail 
//	(every 30 minutes)</pre>
				</div>
			</div>
			<div class='row-fluid'>
				<div class="span12">
					<button class="btn btn-primary" onClick="sendMail();"><i class="fa fa-paper-plane-o"></i> Send Mail </button>
				</div>
			</div>
			<div class='row-fluid'>
				<br/><br/>
				<div class="span12" id="responseDiv"></div>
			</div>
		</content>
	</div>
</div>

<script type="text/javascript">
function sendMail(){
	var url = "<?=$server_url?>/server.php?sendMail";
	$.ajax({
		url: url, type: "POST",
		success: function(data){
			$("#responseDiv").html(data);
		}
	});
}
</script>