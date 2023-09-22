# MagratheaContacts
Contacts Service Manager using Magrathea Framework

Requires:
Magrathea Framework + MySQL + PHP

### docker run:
- install composer
- install vendors
- duplicate `.env.sample` inside `docker` folder to create file `.env`
- run `docker-composer --verbose up`
- add `contacts.magrathea.localhost.com` to hosts
- fix permissions: 
	`docker-compose run magrathea_contacts chown -R www-data:www-data /var/www/html/configs`
	`docker-compose run magrathea_contacts chown -R www-data:www-data /var/www/logs`
	`docker-compose run magrathea_contacts chown -R www-data:www-data /var/www/backups`
	`docker-compose run magrathea_contacts chown -R www-data:www-data /var/www/compress`
	`docker-compose run magrathea_contacts chown -R www-data:www-data /var/www/html/api/features`


### next tasks: ###

* [ ] source - secret-key generate
* [ ] secret key for each source
* [ ] create API base
* [ ] API - list sources
* [ ] API - add/edit sources
* [ ] API - delete source (set as inactive)
* [ ] API - reactivate source
* [ ] API - list all e-mails
* [ ] API - e-mails pagination
* [ ] API - e-mail add
* [ ] API - e-mail send
* [ ] Admin - base
* [ ] Admin - sources
* [ ] Admin - emails
* [ ] Admin - actions
* [ ] CRON


## useful apache commands
`apache2ctl -t` => check syntax
`apache2ctl -S` => dump/debug virtual hosts
`apache2ctl -t -D DUMP_VHOSTS` list of hosts
`composer dump-autoload -o` tests composer
