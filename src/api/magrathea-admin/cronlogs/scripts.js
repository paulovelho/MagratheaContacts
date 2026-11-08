function deleteOldLogs() {
	const before = document.getElementById("cronlog-before").value;
	const result = document.getElementById("cronlog-cleanup-result");
	if(!before) return;
	if(!confirm("Delete all execution logs before " + before + "?")) return;
	callFeature("CronlogsAdmin", "DeleteOlderThan", "POST", { before: before })
		.then(rs => {
			const parsed = (typeof rs === "object") ? rs : JSON.parse(rs);
			if(parsed.success) {
				result.innerHTML = '<div class="alert alert-success">' + parsed.deleted + ' log(s) deleted.</div>';
				location.reload();
			} else {
				result.innerHTML = '<div class="alert alert-danger">Error: ' + (parsed.error ?? "unknown") + '</div>';
			}
		})
		.catch(err => {
			console.error("CronlogsAdmin delete error", err);
			const msg = err?.data?.error ?? err?.error ?? "unknown error";
			result.innerHTML = '<div class="alert alert-danger">Failed: ' + msg + '</div>';
		});
}
