function newUser() {
	let container = $("#container-user-form");
	callFeature("AdminUsers", "form")
		.then(rs => showOn(container, rs));
}

function editUser(id) {
	let container = $("#container-user-form");
	callFeature("AdminUsers", "form", "GET", { id })
		.then(rs => showOn(container, rs));
}

function saveUser(el) {
	let container = "#container-user-rs";
	let data = getFormDataFromElement($(el));
	callFeature("AdminUsers", "Save", "POST", data)
		.then(rs => showOn(container, rs, true))
		.then(userListUpdate);
}

function deleteUser(id) {
	if(!confirm("Are you sure you want to delete user?")) return;
	let container = "#container-user-rs";
	callFeature("AdminUsers", "DeleteUser", "POST", { id })
		.then(rs => showOn(container, rs))
		.then(userListUpdate);
}

function showPasswordForm(id) {
	let container = $("#container-user-form");
	callFeature("AdminUsers", "Password", "GET", { id })
		.then(rs => showOn(container, rs));
}

function userListUpdate() {
	let container = "#container-user-list";
	callFeature("AdminUsers", "List")
		.then(rs => showOn(container, rs));
}

function getRandomPassword(len) {
	var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()-_=+;:,.?';
	var password = '';
	for (var i = 0; i < len; i++) {
		var randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}

	return password;
}
function randomPassword() {
	let pass =getRandomPassword(15);
	$("#new_password").val(pass);
}
function savePassword(el) {
	let form = getFormDataFromElement(el);
	let container = "#container-user-rs";
	callFeature("AdminUsers", "SavePassword", "POST", form)
		.then(rs => showOn(container, rs, true))
}
