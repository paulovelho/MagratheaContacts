# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# General Rules

**If any questions are raised during a task, ask me before acting.**

**You will be EXTREMELY critic with my ideas and suggestions. You will never be afraid of hurting my feelings, and you will think on every idea or suggestion I give you, pondering if it's the best. Don't start an answer with a compliment.**

**If I end my request with a question, ANSWER THE QUESTION!**

---


## Project Overview

MagratheaContacts is a contacts and transactional email service. It has three distinct sub-systems:

- **API** (`src/`) — PHP backend using the MagratheaPHP2 framework. Handles sources, API keys, email queueing, SMTP configuration, and a cron-based email processor.
- **ADMIN** (`app-admin/`) — Angular 20 SPA that serves as the primary administration interface. Built and deployed into `src/api/admin/`.
- **MAGRATHEAADMIN** (`src/api/magrathea-admin/`) — PHP-based internal admin panel powered by MagratheaPHP2's built-in admin system, accessible at `/admin.php`.

## Architecture

### API feature structure

Each feature lives in `src/api/features/<Feature>/` and follows a consistent 4-file pattern:

| File | Purpose |
|------|---------|
| `Feature.php` | Model/entity (extends auto-generated base) |
| `FeatureApi.php` | API endpoint handlers (routes registered in `api/api.php`) |
| `FeatureAdmin.php` | MAGRATHEAADMIN integration (CRUD panels) |
| `FeatureControl.php` | Business logic and data access |

Routes are registered in `src/api/api/api.php` (`ContactsApi` class). Auth levels are `self::OPEN`, `self::LOGGED`, and `self::ADMIN`.

### ADMIN → API communication

The Angular ADMIN reads its API URL from `config.json`. This file exists in two places with different purposes:

- `app-admin/public/config.json` — used during local development (`ng serve`). Contains `http://localhost:8080`.
- `src/api/admin/config.json` — used in production after the build is deployed. Must be manually set to the production API URL.

`build_admin.sh` preserves any existing `src/api/admin/config.json` when redeploying so the production URL survives rebuilds.

### Email flow

1. External systems `POST /add` or `POST /send` with an API key to queue an email.
2. `cron.php` is a generic dispatcher (hit externally, e.g. by a third-party scheduler, on a
   `cron_secret`-gated `GET`): it reads job definitions from `src/configs/cron.conf`
   (name/hitpoint/type/interval, managed via MAGRATHEAADMIN → Cron Jobs), and for each job whose
   interval has elapsed (tracked DB-free in `src/configs/cron-state.json`) executes its hitpoint —
   a local file run as a CLI subprocess (e.g. `process_email.php`, wrapping
   `EmailApi::SendNext()`) or an HTTP GET against an API endpoint. A hit where nothing is due
   responds without touching the database.
3. `Email::Send()` uses either server mail or SMTP (via `Smtp` model linked to the `Source`).
4. `CronLog` (owned solely by `cron.php`, not by the hitpoint code it calls) records one row per
   executed job: `name`, `hitpoint`, `status`, `result`.

### Templated email flow (v2.5)

1. `POST /add` with `template`/`template_id` + `vars` creates a `mail_promises` row instead of a mail (subject resolved at add time: request's subject, or the template's with placeholders intact). Optional `process=1` renders immediately.
2. `cron_promises.php` calls `MailpromisesApi::ProcessPromises()` (batches of 10, cap 50, own `promises_active` flag) — each promise renders `{{placeholders}}` (request vars → template defaults → empty string) and becomes a regular `mail` row; the send queue takes it from there.
3. `POST /send` with a template renders and sends synchronously.
4. Failed renders keep `processed=1, mail_id=NULL` (audit signature, never auto-retried).
5. Templates: `templates` table, per-source or global (`source_id NULL`); var map auto-extracted into `templates.vars` JSON on save (`Templates::SyncVars`). New features MUST be registered in `src/api/_inc.php` `AddFeature(...)`.

Live API tests: `docker exec -w /var/www/html/api magrathea-contacts php tests/test_templates.php` (also `test_promises.php`, `test_add_api.php`).

## Commands

### API (PHP)

```bash
# Install dependencies (run inside src/)
cd src && composer install

# Run locally via Docker
docker-compose up

# Generate version.php from git info (run before deploying)
./build.sh
```

### ADMIN (Angular)

```bash
cd app-admin

# Dev server (proxies to localhost:8080 by default)
npm start            # ng serve

# Production build
npm run build        # ng build --configuration=production

# Run tests
npm test             # ng test

# Watch mode (dev build)
npm run watch
```

### Build and deploy ADMIN into API

```bash
# Builds Angular app and copies output to src/api/admin/
# Preserves src/api/admin/config.json if it already exists
./build_admin.sh
```

## Configuration

Copy `src/configs/magrathea.conf.sample` to `src/configs/magrathea.conf` and fill in the values. The `[dev]` section is used locally (Docker), and `[production]` is used on the server (`use_environment` must be set accordingly).

Key config values:
- `server_url` — the public URL of the API (used for CORS and self-referencing)
- `jwt_key` — secret for JWT token generation/validation
- `db_*` — database credentials

## Angular conventions (app-admin)

Enforced via `app-admin/copilot-instructions.md`:

- **Always** use `ChangeDetectionStrategy.OnPush` on every component.
- Use Angular signals (`signal()`, `computed()`) for state; avoid manual subscriptions.
- Use native control flow (`@if`, `@for`, `@switch`) — never `*ngIf` / `*ngFor`.
- Use `inject()` for dependency injection, not constructor parameters.
- Standalone components only — no `NgModules` for new features.
- No `[ngClass]`/`[ngStyle]` — use `[class]` and `[style]` bindings.

## Docker (local dev)

```bash
# Start all services (PHP 8.4 Apache + MariaDB + phpMyAdmin)
docker-compose up

# Fix permissions after first run
docker-compose run magrathea_contacts chown -R www-data:www-data /var/www/html/configs
docker-compose run magrathea_contacts chown -R www-data:www-data /var/www/logs
docker-compose run magrathea_contacts chown -R www-data:www-data /var/www/backups
```

Add `contacts.magrathea.localhost.com` to your `/etc/hosts` pointing to `127.0.0.1`. API is available at `http://contacts.magrathea.localhost.com:8080`, phpMyAdmin at `http://localhost:8183`.

## Production deployment

```bash
# SSH pull on server
ssh platypusweb@paulovelho.com 'cd contacts/MagratheaContacts && git pull'

# Install/update PHP dependencies on server (Dreamhost-style)
curl -sS https://getcomposer.org/installer | php
php composer.phar install

# Regenerate version file
./build.sh

# If rebuilding the Angular admin:
./build_admin.sh
# Then edit src/api/admin/config.json to set the production API URL:
# { "apiUrl": "https://your-production-domain.com" }
```

After a fresh deploy where `src/api/admin/` didn't previously exist, `build_admin.sh` will not find an existing `config.json` to preserve — you must create `src/api/admin/config.json` manually with the correct production `apiUrl`.
