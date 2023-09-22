function changeApikey() {
	let keyId = $("#sel-key").find(":selected").val();
	let keyParts = keyId.split("=");
	let key = keyParts[0];
	let source = keyParts[1];

	let sourceCard = "#card-source-" + source;
	let keyCard = "#card-key-" + key;
	$(".card-source").hide();
	$(".card-key").hide();
	$(sourceCard).show();
	$(keyCard).show();

	let from = $(sourceCard).find(".mail_from").html();
	let priority = $(keyCard).find(".key_priority").html();
	$("#mail_from").val(from);
	$("#priority").val(priority);
	$("#key").val(key);
}

function generatePayload(el) {
	let data = getFormDataFromElement(el);
	$("#payload-rs").html(JSON.stringify(data));
	$("#payload-row").slideDown("slow");
}

function createEmail(el) {
	let data = getFormDataFromElement(el);
	callFeature("EmailAdmin", "AddMail", "POST", data)
		.then((rs) => {
			$("#rs-row").slideDown("slow");
			showOn("#mail-rs", rs, true);
		});
}

function filter(el) {
	let data = getFormDataFromElement(el);
	callFeature("EmailAdmin", "List", "POST", data)
		.then(rs => showOn("#mail-list", rs));
}

function switchRs(el) {
	let cardBody = $(el).parents().eq(3);

	let tableRs = $(cardBody).find('.rs-table');
	let rawRs = $(cardBody).find('.rs-raw');
	$(tableRs).slideToggle('slow');
	$(rawRs).slideToggle('slow');
}

function viewMail(id, container) {
	callFeature("EmailAdmin", "View", "GET", { id })
		.then(rs => showOn(container, rs));
}

function sendMail(id) {
	callFeature("EmailAdmin", "SendMail", "GET", { id })
		.then((rs) => {
			showOn("#mail-rs", rs);
			$("#mail-rs-row").slideDown("slow");
		});
}
