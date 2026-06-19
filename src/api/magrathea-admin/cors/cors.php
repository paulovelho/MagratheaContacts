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
	callFeature("CorsAdmin", "Save", "POST", { origins: origins })
		.then(rs => {
			let data = (typeof rs === "object") ? rs : JSON.parse(rs);
			result.innerHTML = data.success
				? '<div class="alert alert-success">Saved!</div>'
				: '<div class="alert alert-danger">Error: ' + (data.error ?? "unknown") + '</div>';
		})
		.catch((err) => {
			console.error("CorsAdmin save error", err);
			const msg = err?.data?.error ?? err?.error ?? "unknown error";
			result.innerHTML = '<div class="alert alert-danger">Failed: ' + msg + '</div>';
		});
}
</script>
