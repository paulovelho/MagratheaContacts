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

# Copy the just-updated config.json and openapi.yaml into src/api/admin
dir_admin="src/api/admin/"

cp -v app-admin/public/config.json "${dir_admin}config.json"
cp -v app-admin/public/openapi.yaml "${dir_admin}openapi.yaml"

echo "Setup complete. ${dir_admin}config.json set to apiUrl: $server_url"
