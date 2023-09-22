<div class="card card-key" id="card-key-<?=$key->val?>" style="display: none;">
	<div class="card-header">
		<b>Key:</b> <?=$key->val?>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-6">
				<b>Active:</b> <?=($key->active ? "yes" : "no")?><br/>
				<b>Priority:</b> <span class="key_priority"><?=($key->priority)?></span><br/>
				<b>Uses:</b> <?=$key->uses?><br/>
			</div>
			<div class="col-6">
				<b>Expires:</b> <?=($key->expiration ? $key->expiration : "no")?><br/>
				<b>Limit:</b> <?=($key->usage_limit == 0 ? "none" : $key->usage_limit)?><br/>
			</div>
		</div>
	</div>
</div>
