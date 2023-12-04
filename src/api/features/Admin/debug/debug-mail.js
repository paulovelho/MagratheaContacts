function buildHeaders() {
	console.info("building headers");
	let headers = $("#default_headers").val();
	content = getContent();
	headers = headers.replace("{{content_type}}", getContent());
	let from = getFrom();
	if(from) headers = headers.replace("{{from}}", from);
	let to = getTo();
	if(to) headers = headers.replace("{{to}}", to);
	$("#headers").text(headers);
}

function getContent() {
	let html = $("#content_type").is(":checked");
	return html ? "text/html" : "text/plain";
}
function getFrom() {
	return $("#from").val();
}
function getTo() {
	return $("#to").val();
}

function addDebug(msg) {
	addTo("#run-rs", msg + "<br/>");
	addTo("#run-rs", "<br/>" + now() + "<br/>");
}

function testMail(el) {
	addDebug("sending...");
	let data = getFormDataFromElement(el);
	callFeature("DebugAdmin", "SendMail", "POST", data)
		.then((rs) => {
			addDebug("response: [" + rs + "]");
		});
	console.info(data);
}
