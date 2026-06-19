<?php

use Magrathea2\Admin\AdminElements;

$elements = AdminElements::Instance();
$elements->Header("CORS Origins");

?>

<div class="container">
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">
					Allowed Origins
				</div>
				<div class="card-body">
					<p class="text-muted small">One origin per line. Lines starting with <code>#</code> are ignored.</p>
					<textarea id="cors-origins" class="form-control font-monospace" rows="12"><?= htmlspecialchars($contents) ?></textarea>
					<div class="mt-3">
						<?php AdminElements::Instance()->Button("Save", "saveCors()", "btn-primary"); ?>
					</div>
					<div id="cors-result" class="mt-2"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
function saveCors() {
	const origins = document.getElementById("cors-origins").value;
	const result = document.getElementById("cors-result");
	fetch(window.location.href, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: "action=Save&origins=" + encodeURIComponent(origins)
	})
	.then(r => r.json())
	.then(data => {
		result.innerHTML = data.success
			? '<div class="alert alert-success">Saved!</div>'
			: '<div class="alert alert-danger">Error saving.</div>';
	})
	.catch(() => {
		result.innerHTML = '<div class="alert alert-danger">Request failed.</div>';
	});
}
</script>
