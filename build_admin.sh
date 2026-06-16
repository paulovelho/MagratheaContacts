#!/bin/bash

dir_build="app-admin/dist/contacts/browser/"
dir_admin="src/api/admin/"

rm -rf $dir_build

cd app-admin && npm run build --configuration=production
cd ..

rm -rf $dir_admin
cp -rv $dir_build $dir_admin

