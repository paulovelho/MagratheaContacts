<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();
$elements->Header("Cron Jobs");

?>

<div class="container">
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">Job Definitions</div>
				<div class="card-body">
					<p class="text-muted small">
						Point an external scheduler at <code>cron.php?key=&lt;cron_secret&gt;</code> every few minutes.
						Each job below only actually runs once its own interval has elapsed.
					</p>
					<table class="table" id="cron-jobs-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Hitpoint</th>
								<th>Type</th>
								<th>Interval (min)</th>
								<th>Last run</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<? foreach($jobs as $job): ?>
								<? $last = intval($state[$job["name"]] ?? 0); ?>
								<tr>
									<td><?= htmlspecialchars($job["name"]) ?></td>
									<td><code><?= htmlspecialchars($job["hitpoint"]) ?></code></td>
									<td><?= htmlspecialchars($job["type"]) ?></td>
									<td><?= intval($job["interval"]) ?></td>
									<td><?= $last ? date("Y-m-d H:i:s", $last) : "never" ?></td>
									<td class="text-end">
										<button type="button" class="btn btn-sm btn-outline-secondary" onclick='editJob(<?= htmlspecialchars(json_encode($job), ENT_QUOTES) ?>)'>Edit</button>
										<button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteJob('<?= htmlspecialchars($job["name"], ENT_QUOTES) ?>')">Delete</button>
									</td>
								</tr>
							<? endforeach; ?>
							<? if(empty($jobs)): ?>
								<tr><td colspan="6" class="text-muted">No jobs defined yet.</td></tr>
							<? endif; ?>
						</tbody>
					</table>
				</div>
			</div>

			<div class="card mt-3">
				<div class="card-header" id="cron-form-title">
					Add Job
					<!-- <div class="card-close" aria-label="Close" onclick="closeCard(this);" bis_skin_checked="1">×</div> -->
				</div>
				<div class="card-body">
					<form id="cron-form">
						<input type="hidden" name="original_name" id="cron-original-name" value="" />
						<div class="row g-2">
							<div class="col-md-3">
								<label class="form-label">Name</label>
								<input type="text" class="form-control" name="name" id="cron-name" required />
							</div>
							<div class="col-md-4">
								<label class="form-label">Hitpoint</label>
								<input type="text" class="form-control" name="hitpoint" id="cron-hitpoint" placeholder="process_email.php or https://..." required />
							</div>
							<div class="col-md-2">
								<label class="form-label">Type</label>
								<select class="form-select" name="type" id="cron-type">
									<option value="file">file</option>
									<option value="api">api</option>
								</select>
							</div>
							<div class="col-md-2">
								<label class="form-label">Interval (min)</label>
								<input type="number" min="1" class="form-control" name="interval" id="cron-interval" value="5" required />
							</div>
							<div class="col-md-1 d-flex align-items-end">
								<button type="button" class="btn btn-primary w-100" onclick="saveJob()">Save</button>
							</div>
						</div>
						<div class="mt-2">
							<button type="button" class="btn btn-link btn-sm p-0" onclick="resetForm()">cancel edit / clear form</button>
						</div>
					</form>
					<div id="cron-result" class="mt-2"></div>
				</div>
			</div>

			<div class="card mt-3">
				<div class="card-header">
					Settings &mdash; Environment Check
					<div class="card-close" aria-label="Close" onclick="closeCard(this);" bis_skin_checked="1">×</div>
				</div>
				<div class="card-body">
					<p class="text-muted small">
						"file" hitpoints run as a CLI subprocess (<code>exec()</code>) - some hosts
						(shared hosting in particular) disable it. Verify here before relying on it in production.
					</p>
					<table class="table table-sm mb-0" id="cron-env-table">
						<tbody id="cron-env-body">
							<?php include(__DIR__."/env-rows.php"); ?>
						</tbody>
					</table>
					<div class="mt-3">
						<? AdminElements::Instance()->Button("Re-check", "checkEnv()", "btn-outline-secondary btn-sm"); ?>
					</div>
				</div>
			</div>

			<div class="card mt-3">
				<div class="card-header">
					Crontab
					<div class="card-close" aria-label="Close" onclick="closeCard(this);" bis_skin_checked="1">×</div>
				</div>
				<div class="card-body">
					<p class="text-muted small">
						None of the above runs on its own - something still has to call <code>cron.php</code> on a
						schedule. Since this host has shell access, run <code>crontab -e</code> and add this line
						(it invokes <code>cron.php</code> directly via CLI, bypassing the HTTP <code>cron_secret</code>
						gate entirely - trusted because whoever can edit this crontab already has full server access):
					</p>
					<div class="d-flex align-items-start gap-2 mb-3">
						<pre class="code flex-grow-1 mb-0" id="crontab-line"><?= htmlspecialchars($crontabLine) ?></pre>
						<button type="button" class="btn btn-sm btn-outline-secondary" onclick="copyCrontabLine()">Copy</button>
					</div>

					<p class="text-muted small mb-1">Currently scheduled on this server (<code>crontab -l</code>):</p>
					<div id="crontab-status-body">
						<?php include(__DIR__."/crontab-rows.php"); ?>
					</div>
					<div class="mt-3">
						<? AdminElements::Instance()->Button("Re-check", "checkCrontab()", "btn-outline-secondary btn-sm"); ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
