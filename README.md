# MagratheaContacts
Contacts and transactional email service built on the MagratheaPHP2 framework.

## Architecture

The project has three sub-systems:

- **API** (`src/`) — PHP 8.4 backend (MagratheaPHP2). Manages sources, API keys, email queueing, SMTP config, and a cron-based email processor.
- **ADMIN** (`app-admin/`) — Angular 20 SPA, the primary administration interface. Built and deployed into `src/api/admin/` via `build_admin.sh`.
- **MAGRATHEAADMIN** (`src/api/magrathea-admin/`) — PHP-based internal admin panel, accessible at `/admin.php`.

### ADMIN config

The Angular ADMIN reads its API URL from `config.json`:

- **Dev**: `app-admin/public/config.json` — used by `ng serve`, defaults to `http://localhost:8080`.
- **Production**: `src/api/admin/config.json` — must be set to the production API URL after deploying. `build_admin.sh` preserves this file across rebuilds.

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

## deploy

### Production server (SSH)

```bash
# Pull latest code
ssh platypusweb@paulovelho.com 'cd contacts/MagratheaContacts && git pull'

# Install/update PHP dependencies (Dreamhost-style)
curl -sS https://getcomposer.org/installer | php
php composer.phar install

# Regenerate version file from git
./build.sh
```

### Database migrations

Fresh installs get the full schema from `database/contacts.sql` (used automatically by the
Docker MariaDB container on first run). Existing/legacy databases must run the migration
files from `database/migrations/` once per release that touches the schema — they are
idempotent (`CREATE TABLE IF NOT EXISTS`, no `DROP`):

```bash
mysql -u <user> -p <database> < database/migrations/2.5-templates.sql
```

### Cron jobs

Two crontab entries, each with its own kill-switch config flag:

| Script | What it does | Flag |
|--------|--------------|------|
| `src/api/cron.php` | Sends the next queued e-mail (one per run) | `cron_active` |
| `src/api/cron_promises.php` | Renders pending mail promises into mails (batches of 10) | `promises_active` |

```cron
* * * * * cd /path/to/MagratheaContacts/src/api && php cron.php
* * * * * cd /path/to/MagratheaContacts/src/api && php cron_promises.php
```

### Deploying the Angular ADMIN

```bash
# Build Angular app and copy into src/api/admin/ (preserves existing config.json)
./build_admin.sh

# On a fresh deploy, create src/api/admin/config.json with the production API URL:
echo '{ "apiUrl": "https://your-production-domain.com" }' > src/api/admin/config.json
```

> `build_admin.sh` preserves `src/api/admin/config.json` if it already exists, so the production URL survives rebuilds. On a brand-new server where `src/api/admin/` has never been populated, create the file manually after the first `build_admin.sh` run.

### Dreamhost: install composer
```
curl -sS https://getcomposer.org/installer | php
php composer.phar install
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


