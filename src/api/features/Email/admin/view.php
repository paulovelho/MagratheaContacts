<div class="card">
	<div class="card-header">
		<?="E-mail ID#".$mail->id?>
		<div class="card-close" aria-label="Close" onclick="closeCard(this);">&times;</div>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-4 offset-8">
				<?
				use Magrathea2\Admin\AdminElements;
        use MagratheaContacts\Email\EnumSentStatus;

				$elements = AdminElements::Instance();

				$switchAction = ["onchange" => "switchRs(this);"];
				$elements->Checkbox(
					null, "Toggle Raw/Table", 
					true, false, [], true,
					$switchAction);
				?>
			</div>
			<div class="col-6 rs-table">
				<b>ID:</b> #<?=$mail->id?><br/>
				<b>Key:</b> <?=$mail->origin_key?><br/>
				<b>Priority:</b> <?=$mail->priority?><br/>
				<b>From:</b> <?=$mail->email_from?><br/>
				<b>Reply to:</b> <?=$mail->email_replyTo?><br/>
				<b>To:</b> <?=$mail->email_to?>
				<br/><hr/><br/>
				<?php
				if($mail->GetStatus() == EnumSentStatus::NotProcessed) {
					$elements->Button("abort", "changeStatus(".$mail->id.", '".EnumSentStatus::Aborted->value."')", ["btn-danger", "w-100"]);
				} else {
					$elements->Button("re-process", "changeStatus(".$mail->id.", '".EnumSentStatus::NotProcessed->value."')", ["btn-success", "w-100"]);
				}
				?>
				<div id="mail-<?=$mail->id?>-rs"></div>
			</div>
			<div class="col-6 rs-table">
				<b><?=$mail->msg_subject?></b>
				<pre class="code-light"><?=$mail->message?></pre>
			</div>
			<div class="col-12 rs-raw" style="display: none;">
				<pre class="code-light"><? print_r($mail); ?></pre>
			</div>
		</div>
	</div>
</div>
