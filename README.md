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

### useful apache commands
`apache2ctl -t` => check syntax
`apache2ctl -S` => dump/debug virtual hosts
`apache2ctl -t -D DUMP_VHOSTS` list of hosts
`composer dump-autoload -o` tests composer

### ssh deploy
```
ssh platypusweb@paulovelho.com 'cd contacts/MagratheaContacts && git pull'
```

## next tasks: ##

* [X] source - secret-key generate
* [ ] secret key for each source
* [X] create API base
* [X] API - list sources
* [X] API - add/edit sources
* [ ] API - delete source (set as inactive)
* [ ] API - reactivate source
* [ ] API - list all e-mails
* [ ] API - e-mails pagination
* [X] API - e-mail add
* [X] API - e-mail send
* [X] Admin - base
* [X] Admin - sources
* [X] Admin - emails
* [X] Admin - actions
* [X] CRON


