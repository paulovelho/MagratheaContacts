function resetForm() {
	document.getElementById("cron-form-title").innerText = "Add Job";
	document.getElementById("cron-original-name").value = "";
	document.getElementById("cron-name").value = "";
	document.getElementById("cron-hitpoint").value = "";
	document.getElementById("cron-type").value = "file";
	document.getElementById("cron-interval").value = "5";
	document.getElementById("cron-result").innerHTML = "";
}

function editJob(job) {
	document.getElementById("cron-form-title").innerText = "Edit Job: " + job.name;
	document.getElementById("cron-original-name").value = job.name;
	document.getElementById("cron-name").value = job.name;
	document.getElementById("cron-hitpoint").value = job.hitpoint;
	document.getElementById("cron-type").value = job.type;
	document.getElementById("cron-interval").value = job.interval;
	document.getElementById("cron-form").scrollIntoView({ behavior: "smooth" });
}

function saveJob() {
	const data = getFormDataFromElement(document.getElementById("cron-name"));
	const result = document.getElementById("cron-result");
	callFeature("CronAdmin", "Save", "POST", data)
		.then(rs => {
			const parsed = (typeof rs === "object") ? rs : JSON.parse(rs);
			if(parsed.success) {
				location.reload();
			} else {
				result.innerHTML = '<div class="alert alert-danger">Error: ' + (parsed.error ?? "unknown") + '</div>';
			}
		})
		.catch(err => {
			console.error("CronAdmin save error", err);
			const msg = err?.data?.error ?? err?.error ?? "unknown error";
			result.innerHTML = '<div class="alert alert-danger">Failed: ' + msg + '</div>';
		});
}

function checkEnv() {
	callFeature("CronAdmin", "CheckEnv", "GET")
		.then(html => {
			document.getElementById("cron-env-body").innerHTML = html;
		})
		.catch(err => {
			console.error("CronAdmin env check error", err);
			alert("Failed to run environment check: " + (err?.data?.error ?? err?.error ?? "unknown error"));
		});
}

function deleteJob(name) {
	if(!confirm("Delete cron job \"" + name + "\"?")) return;
	callFeature("CronAdmin", "Delete", "POST", { name: name })
		.then(() => location.reload())
		.catch(err => {
			console.error("CronAdmin delete error", err);
			alert("Failed to delete: " + (err?.data?.error ?? err?.error ?? "unknown error"));
		});
}
