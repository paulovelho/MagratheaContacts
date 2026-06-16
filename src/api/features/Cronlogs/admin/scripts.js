function openSetup() {
	callFeature('CronView', 'Setup')
		.then(rs => showOn("#rs-setup", rs, true));
}

