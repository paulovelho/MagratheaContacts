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

`src/api/cron.php` is a single generic dispatcher, meant to be hit on a fixed short cadence
(every 1-5 min) by any external scheduler (e.g. cron-job.org, GitHub Actions, Cloudflare Cron
Triggers) or by system crontab — whichever avoids SSH access on your host. It never touches the
database unless something is actually due to run:

```
GET /cron.php?key=<cron_secret>
```

- `cron_secret` lives in `magrathea.conf` ([dev]/[production]) and is checked with `hash_equals()`
  before anything else - a wrong/missing key returns `403` with zero DB queries.
- Actual job definitions (name, hitpoint, type `file`|`api`, interval in minutes) live in
  `src/configs/cron.conf` (JSON, gitignored - see `cron.conf.sample`), managed from
  **MAGRATHEAADMIN → Settings → Cron Jobs**. Every hit checks each job's last-run time (tracked in
  `src/configs/cron-state.json`, also gitignored) against its interval - a hit where nothing is
  due responds immediately without ever connecting to the database.
- When a job **is** due, `cron.php` marks it run, then executes its hitpoint:
  - `file` - runs the script as a CLI subprocess (e.g. `process_email.php`, which wraps
    `EmailApi::SendNext()`); hitpoint files must live directly in `src/api/`.
  - `api` - performs an HTTP GET against the hitpoint URL.
  
  Each execution is recorded as its own row in `cronlogs` (name, hitpoint, status, result),
  viewable from **MAGRATHEAADMIN → Execution Logs**.
- `EmailControl::IsOn()` (`cron_active` config flag) still gates whether `SendNext()` actually
  sends anything - the dispatcher runs on schedule regardless, `SendNext()` just no-ops when off.

`src/api/cron_promises.php` (renders pending mail promises, own `promises_active` flag) has not
yet been migrated to this dispatcher and is currently unused/unwired - `process_promises.php`
exists as its future hitpoint.

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


