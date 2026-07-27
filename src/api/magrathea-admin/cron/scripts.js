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
	callFeature("CrontabAdmin", "Save", "POST", data)
		.then(rs => {
			const parsed = (typeof rs === "object") ? rs : JSON.parse(rs);
			if(parsed.success) {
				location.reload();
			} else {
				result.innerHTML = '<div class="alert alert-danger">Error: ' + (parsed.error ?? "unknown") + '</div>';
			}
		})
		.catch(err => {
			console.error("CrontabAdmin save error", err);
			const msg = err?.data?.error ?? err?.error ?? "unknown error";
			result.innerHTML = '<div class="alert alert-danger">Failed: ' + msg + '</div>';
		});
}

function checkEnv() {
	callFeature("CrontabAdmin", "CheckEnv", "GET")
		.then(html => {
			document.getElementById("cron-env-body").innerHTML = html;
		})
		.catch(err => {
			console.error("CrontabAdmin env check error", err);
			alert("Failed to run environment check: " + (err?.data?.error ?? err?.error ?? "unknown error"));
		});
}

function checkCrontab() {
	callFeature("CrontabAdmin", "CheckCrontab", "GET")
		.then(html => {
			document.getElementById("crontab-status-body").innerHTML = html;
		})
		.catch(err => {
			console.error("CrontabAdmin crontab check error", err);
			alert("Failed to check crontab: " + (err?.data?.error ?? err?.error ?? "unknown error"));
		});
}

function copyCrontabLine() {
	const line = document.getElementById("crontab-line").innerText;
	navigator.clipboard.writeText(line).catch(err => {
		console.error("Failed to copy crontab line", err);
		alert("Couldn't copy automatically - select the line and copy it manually.");
	});
}

function deleteJob(name) {
	if(!confirm("Delete cron job \"" + name + "\"?")) return;
	callFeature("CrontabAdmin", "Delete", "POST", { name: name })
		.then(() => location.reload())
		.catch(err => {
			console.error("CrontabAdmin delete error", err);
			alert("Failed to delete: " + (err?.data?.error ?? err?.error ?? "unknown error"));
		});
}
