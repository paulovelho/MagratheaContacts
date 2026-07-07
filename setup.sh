#!/bin/bash
set -e

read -p "Enter the server URL (e.g. https://api.example.com): " server_url

if [ -z "$server_url" ]; then
	echo "ERROR: server URL cannot be empty."
	exit 1
fi

# Create app-admin/public/config.json with the provided URL
cat > app-admin/public/config.json <<EOF
{
	"apiUrl": "$server_url"
}
EOF
echo "Created app-admin/public/config.json"

# Build and copy the Angular app into src/api/admin, same as build_admin.sh
dir_build="app-admin/dist/contacts/browser/"
dir_admin="src/api/admin/"

rm -rf "$dir_build"

cp src/openapi.yaml app-admin/public/openapi.yaml

# Update apiUrl default inside app-admin/public/openapi.yaml
sed -i "s|default: .*|default: $server_url|" app-admin/public/openapi.yaml
echo "Updated apiUrl default in app-admin/public/openapi.yaml"

cd app-admin && npm run build --configuration=production
cd ..

config_backup=""
if [ -f "${dir_admin}config.json" ]; then
	config_backup=$(cat "${dir_admin}config.json")
fi

rm -rf "$dir_admin"
cp -rv "$dir_build" "$dir_admin"

if [ -n "$config_backup" ]; then
	echo "$config_backup" > "${dir_admin}config.json"
else
	cat > "${dir_admin}config.json" <<EOF
{
	"apiUrl": "$server_url"
}
EOF
fi

echo "Setup complete. ${dir_admin}config.json set to apiUrl: $server_url"
