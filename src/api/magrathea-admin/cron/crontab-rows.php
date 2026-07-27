<?php
/** @var array $crontab CronRunner::GetSystemCrontab() result */
?>
<? if(!$crontab["available"]): ?>
	<div class="alert alert-warning mb-0">exec() is disabled on this host - can't read the system crontab from here. Check manually over SSH (<code>crontab -l</code>).</div>
<? elseif(empty($crontab["lines"])): ?>
	<div class="alert alert-secondary mb-0">No crontab entries found for this user.</div>
<? else: ?>
	<? if($crontab["has_cron_entry"]): ?>
		<div class="alert alert-success py-1 px-2 mb-2">A <code>cron.php</code> entry is already scheduled.</div>
	<? else: ?>
		<div class="alert alert-warning py-1 px-2 mb-2">No <code>cron.php</code> entry found in the current crontab yet.</div>
	<? endif; ?>
	<pre class="code mb-0"><?= htmlspecialchars($crontab["raw"]) ?></pre>
<? endif; ?>
