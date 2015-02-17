<div class="row-fluid">
	<div class="span12 mag_section">
		<header><h3>New Mail</h3>
		</header>
		<content>
			<form id="form_add">
			<div class='row-fluid'>
				<div class='span3 right'>Name:</div>
				<div class='span9'><input type="text" name="name"></div>
			</div>
			<div class='row-fluid'>
				<div class='span3 right'>E-mail from:</div>
				<div class='span9'><input type="text" name="from"></div>
			</div>
			</form>
			<div class='row-fluid'>
				<div class='span6'>&nbsp;</div>
				<div class='span6'>
					<button class="btn btn-success" onClick="addSource();">
						<i class="fa fa-paper-plane-o"></i> Add to Source Table!
					</button>
				</div>
			</div>
			<div class='row-fluid'>
				<div class='span12' id='divResponse'></div>
			</div>

		</content>
	</div>
</div>

<script type="text/javascript">
function addSource(){
	var formData = $("#form_add").serializeObject();
	MagratheaPost("addSourceAction.php", formData, function(data){
		$("#divResponse").html(data);
	});
}
</script>

