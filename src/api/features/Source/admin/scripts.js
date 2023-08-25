function newSource() {
	callFeature("AdminSource", "Form")
		.then(rs => showOn("#container-source-form", rs));
}
function editSource(id) {
	callFeature("AdminSource", "Form", "GET", { id })
		.then(rs => showOn("#container-source-form", rs));
}

function saveSource(el) {
	let container = "#container-source-rs";
	let data = getFormDataFromElement(el);
	callFeature("AdminSource", "Save", "POST", data)
		.then((rs) => {
			rs = JSON.parse(rs);
			if(!rs.success) {
				showToast(rs.error, "Error", true);
			} else {
				let type = rs.type;
				if(type == "insert") {
					showToast("Source ["+rs.data?.name+"] inserted!", "New Source", false);
				} else {
					showToast("Source ["+rs.data?.name+"] updated!", "Data Saved", false);
				}
			}
			loadSourceList();
		});
}

function loadSourceList() {
	callFeature("AdminSource", "List")
		.then(rs => showOn("#container-source-list", rs));
}
