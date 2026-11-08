<?php
/** @var array $env CronRunner::CheckEnvironment() result */
?>
<tr>
	<td>exec() available</td>
	<td><?= $env["exec_available"] ? '<span class="text-success">yes</span>' : '<span class="text-danger">no</span>' ?></td>
</tr>
<tr>
	<td>php binary resolved</td>
	<td><code><?= htmlspecialchars($env["php_binary"]) ?></code></td>
</tr>
<tr>
	<td>exec() self-test (<code>php -v</code>)</td>
	<td>
		<?= $env["exec_test"]["ran"] ? '<span class="text-success">ok</span>' : '<span class="text-danger">failed</span>' ?>
		<div class="text-muted small"><?= nl2br(htmlspecialchars($env["exec_test"]["output"])) ?></div>
	</td>
</tr>
<tr>
	<td>configs/ writable</td>
	<td><?= $env["configs_writable"] ? '<span class="text-success">yes</span>' : '<span class="text-danger">no</span>' ?></td>
</tr>
<tr>
	<td>cron_secret configured</td>
	<td><?= $env["cron_secret_set"] ? '<span class="text-success">yes</span>' : '<span class="text-danger">no</span>' ?></td>
</tr>
