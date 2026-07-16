## 2.5.1
2026-07
	- **new:** `mail_promises` on admin

## 2.5
2026-07
	- **new:** e-mail templates with `{{placeholders}}` (subject included), var map with defaults auto-extracted on save
	- **new:** `mail_promises` — `/add` with a `template` queues a promise; processed in batches into regular mails
	- **new:** `POST /process-promises` endpoint + `cron_promises.php` cron (own `promises_active` kill-switch)
	- **new:** `/add`/`/send` accept `template`/`template_id`, `vars`, `subject`/`message` overrides and `process` (render immediately)
	- **new:** template CRUD, `POST /template/preview` and `GET source/:source/templates`/`promises` endpoints
	- **new:** Templates and Mailpromises CRUD on magrathea-admin
	- **new:** `database/migrations/2.5-templates.sql` migration for legacy installs
	- **new:** live api tests in `src/api/tests/`
	- **fix:** warning on `/add` when `mail_type` is not sent

## 2.1.1
2026-06
	- **new:** angular admin api dynamic
	- **fix:** logo as default fix
	- **improvement:** deployment process improvement
	- **new:** API info on angular admin
	- **new:** Admin test sending e-mail
	- **fix:** API working with `$this->GetPost()` instead of getting `$_POST`
	- **new:** CORS for the API

## 2.1.0
2025-10
	- **new:** changelog
	- **new:** angular admin

