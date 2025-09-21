#!/bin/bash

dir_build="app/dist/contacts/browser/"
dir_admin="src/api/admin/"

rm -rf $dir_build

cd app && npm run build --configuration=production
cd ..

rm -rf $dir_admin
cp -rv $dir_build $dir_admin

