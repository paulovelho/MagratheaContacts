#!/bin/bash

dir_build="app-admin/dist/contacts/browser/"
dir_admin="src/api/admin/"

rm -rf $dir_build

cd app-admin && npm run build --configuration=production
cd ..

# Preserve existing config.json so production URL survives redeploys
config_backup=""
if [ -f "${dir_admin}config.json" ]; then
	config_backup=$(cat "${dir_admin}config.json")
fi

rm -rf $dir_admin
cp -rv $dir_build $dir_admin

if [ -n "$config_backup" ]; then
	echo "$config_backup" > "${dir_admin}config.json"
fi
