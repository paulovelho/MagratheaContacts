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

# Update apiUrl default inside app-admin/public/openapi.yaml
sed -i "s|default: .*|default: $server_url|" app-admin/public/openapi.yaml
echo "Updated apiUrl default in app-admin/public/openapi.yaml"

# Copy the files into src/api/admin
dir_build="app-admin/public/"
dir_admin="src/api/admin/"

if [ ! -d "$dir_build" ]; then
	echo "ERROR: ${dir_build} not found. Run 'npm run build --configuration=production' in app-admin/ first."
	exit 1
fi

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
