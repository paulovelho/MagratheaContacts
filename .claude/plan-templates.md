# Plan: Template feature (v2.5)

Answers to `.claude/blueprint-templates.md`, agreed with Paulo on 2026-07-05.
Each section below carries its implementation status. **All steps done — §5 (Angular admin) completed 2026-07-07.**

---

## 0. Key discovery: half of the design already exists

A scaffold pass from 2025-09-20 (generated via the Magrathea admin) is already committed:

- `src/api/features/Templates/` — model for table `templates`, including a `vars` text column and a `source_id` relation. Not wired into `api.php` nor `ContactsAdmin`.
- `src/api/features/Mailpromises/` — model for table `mail_promises` (`source_id`, `origin_key`, `mail_type`, `email_from`, `email_replyTo`, `email_to`, `priority`, `vars`, `template_id`, `mail_id`, `processed`, `processed_date`). Also unwired.
- `database/contacts.sql` — **already contains** both `templates` and `mail_promises` tables.

This scaffold embodies a different architecture than the blueprint's `template_info` + `TemplateRequired` idea — and it is the one we chose (see below). We will build on the scaffold instead of discarding it.

---

## 1. Decisions made (blueprint questions answered)

| Blueprint question | Decision |
|---|---|
| `template_info` table + `TemplateRequired` status vs. alternative? | **Use the scaffolded `mail_promises` approach.** The `mail` table stays 100% untouched; no new `EnumSentStatus` value is needed. `mail_promises.vars` plays the role the blueprint assigned to `template_info`. |
| How to store the variable map? | **JSON in the existing `templates.vars` text column.** No `variable_map` table. Format: `{"first_name": {"default": "friend"}, "image_url": {"default": ""}}`. |
| Missing variable at render time (no value sent, no default)? | **Replace with empty string** — the e-mail still goes out. |
| Do subject placeholders work? | **Yes.** `msg_subject` goes through the same replacement, and its placeholders are part of the extracted variable map. |
| API surface for templated e-mails? | **Extend the existing `POST /add` and `POST /send`** with new optional fields (`template` / `template_id`, `vars`). When a template is given, `message` and `subject` become optional. No new public endpoints for integrators. |
| When are promises rendered? | **Separate processor**: a dedicated endpoint (`POST /process-promises`) + its own cron script, on its own schedule. `POST /send` with a template is the exception: it renders synchronously and sends in the same call. |

### Why `mail_promises` over `TemplateRequired`

- Zero `ALTER TABLE` on the legacy `mail` table — the migration for legacy projects only **adds** tables.
- The send queue (`EmailControl::GetQueryToSend`) needs no change and can never pick up a half-rendered mail.
- A failed render stays visible as an unprocessed promise instead of a stuck `mail` row with a NULL message.
- The promise keeps the original `vars` payload forever → re-processing and auditing are possible.

---

## 2. Architecture / flow — ✅ done in 2026-07-07

> **Implementation note (supersedes the "literal" rule below):** `mail_promises` gained nullable `msg_subject` and `message` columns. The subject is resolved at **/add time** — the request's subject if sent, else the template's subject copied with placeholders intact. Processing uniformly renders whatever is stored, with no override branching. Consequence: a custom subject/message may itself contain `{{placeholders}}`. `message` is NOT snapshotted: it stays NULL unless the request overrode it; the body comes from the template at process time.

```
POST /add  (key, to, template=welcome, vars={...})
	└─> mail_promises row  (processed=0, vars json, template_id)

POST /process-promises  (cron_promises.php, own schedule)
	└─> for each unprocessed promise:
			render(template.content, template.vars defaults, promise.vars)
			render(template.msg_subject, ...)
			create mail row (sent_status=NotProcessed, priority from promise)
			promise.mail_id = mail.id ; processed=1 ; processed_date=now()

POST /send-next  (cron.php, unchanged)
	└─> existing queue sends the mail row

POST /send  (key, to, template=..., vars={...})   ← synchronous path
	└─> render inline → create mail row → Send() immediately
```

Rendering rules:

1. Start from the template's `vars` map (defaults).
2. Overlay the promise's `vars` values.
3. Replace every `{{name}}` occurrence in `content` and `msg_subject`.
4. Placeholders with no value and no default → empty string.
5. Placeholder syntax: `{{identifier}}`, extracted with `/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/`.

Template lookup on `/add`/`/send`: accept `template_id` (int) or `template` (name, resolved within the API key's source). Validate: template exists, `active=1`, and `template.source_id` matches the key's source **or is NULL (NULL = global template, usable by any key)**.

Per-mail overrides: if the request sends a template **and** an explicit `subject` (or `message`), the explicit value wins over the rendered template value. Explicit values are used **literally** — placeholder replacement only ever runs on text coming from the template, never on text coming from the request.

---

## 3. Database — ✅ done in 2026-07-07

> Both `contacts.sql` and the migration include the `msg_subject`/`message` columns on `mail_promises` (see §2 note). The local Docker DB is already migrated.

### 3.1 Fresh installs — `database/contacts.sql`

Already contains `templates` and `mail_promises` with the right shape. **No structural change needed.** Review only; keep as authoritative schema for fresh installs.

### 3.2 Legacy projects — new migration file

Create `database/migrations/` and add `database/migrations/2.5-templates.sql`:

```sql
CREATE TABLE IF NOT EXISTS `templates` ( ...same as contacts.sql... );
CREATE TABLE IF NOT EXISTS `mail_promises` ( ...same as contacts.sql... );
```

`CREATE TABLE IF NOT EXISTS` (no `DROP`) makes it idempotent and safe to run on production. Convention going forward: one `migrations/<version>-<slug>.sql` per release that touches the schema; `contacts.sql` always reflects the final state.

No change to `mail` — that answers the blueprint's "link relation with template/template_info on mail" point: the link lives on `mail_promises.mail_id` instead, so the relation is queryable (`SELECT * FROM mail_promises WHERE mail_id = ?`) without touching legacy structure.

---

## 4. Backend (API) work items — ✅ done in 2026-07-07

> **Do not touch the PHP backend — it is implemented and tested.** Live tests in `src/api/tests/` (`test_templates.php`, `test_promises.php`, `test_add_api.php`), run with:
> `docker exec -w /var/www/html/api magrathea-contacts php tests/test_templates.php`
> They create and clean their own DB rows.
>
> Extra wiring the plan missed: features must be registered in `src/api/_inc.php` `AddFeature(...)` — "Templates" and "Mailpromises" were added there.

### 4.1 `Templates` feature (`src/api/features/Templates/`) — ✅ done in 2026-07-07

- `Templates.php` (model):
	- `ExtractVars(): array` — regex over `content` + `msg_subject`, returns placeholder names.
	- `SyncVars(): Templates` — merge extracted names into the `vars` JSON, keeping existing defaults, dropping vars no longer present. Called on insert/update.
	- `GetVars(): array` / `SetVars(array)` — JSON encode/decode helpers.
	- `Render(array $values): array` — returns `["subject" => ..., "message" => ...]` applying defaults + overlay + empty-string fallback.
- `TemplatesControl.php`:
	- `GetBySource(int $sourceId, bool $onlyActive=false)` — returns ALL templates by default (the admin list needs inactive ones); pass `$onlyActive=true` on validation paths.
	- `GetByName(string $name, int $sourceId)` — for `/add` lookup by name (active only, source or global; source wins over global on a name tie).
- `TemplatesApi.php`:
	- Standard CRUD (via `$this->Crud("template", ...)` in `api.php`, `self::LOGGED`).
	- `POST template/preview` (`self::LOGGED`) — body: `content`, `subject`, `vars` → returns rendered result + extracted var map. Used by the Angular admin for live extraction/preview without saving.
	- `GET source/:source/templates` (`self::LOGGED`).

### 4.2 `Mailpromises` feature (`src/api/features/Mailpromises/`) — ✅ done in 2026-07-07

> **Implementation note:** processing is batched, not all-at-once — `ProcessBatch(limit)` with default 10 and hard cap 50; the `process-promises` endpoint accepts an optional `limit` in the body.

- `Mailpromises.php` (model):
	- `Process(): array` — load template, `Render()` with own `vars`, build and insert the `Email` (reusing existing `Email` field conventions: `add_date`, `sent_status=0`, priority), set `mail_id`/`processed`/`processed_date`, save. Returns result info for logging.
	- **Render failure** (template deleted/inactive/broken): still set `processed=1` + `processed_date`, leave `mail_id=NULL`, log the error via `CronLog`/`Logger`. `processed=1 AND mail_id IS NULL` is the "failed" signature — never retried automatically, visible in the admin promises list.
- `MailpromisesControl.php`:
	- `GetUnprocessed(int $limit = 50)`.
	- `ProcessAll(): array` — loop `GetUnprocessed`, call `Process()` per promise, collect results; log via `CronLog` like `EmailApi::SendNext` does.
- `MailpromisesApi.php`:
	- `ProcessPromises($params)` — endpoint handler wrapping `ProcessAll()`, guarded by its **own ConfigApp flag `promises_active`** (default `true`, mirroring how `EmailControl::IsOn()` reads `cron_active`), logging via `CronLog`.
	- `GetBySource` / list endpoints for the admin UI (`self::LOGGED`).

### 4.3 `EmailApi::Add` / `Send` changes — ✅ done in 2026-07-07

> **Implementation note:** `/add` also accepts `process=1` — renders the promise into a mail row immediately (the mail is still sent by the send queue). Ignored when `promises_active` is off.

- `Add`: read `template` / `template_id` + `vars` from `GetPost()`.
	- Template given → validate template (exists, active, belongs to key's source), validate `vars` is a JSON object (or already-decoded array), **create `Mailpromises` row and return it** (`message`/`subject` not required).
	- No template → current behavior, byte-for-byte unchanged.
- `Send`: template given → build the promise in memory, render immediately, create mail, `Send()`, mark promise processed with `mail_id`. Returns the same send result envelope as today.

### 4.4 Routes (`src/api/api/api.php`) — ✅ done in 2026-07-07

```php
private function AddTemplates() {
	$api = new TemplatesApi();
	$this->Crud("template", $api, self::LOGGED);
	$this->Add("POST", "template/preview", $api, "Preview", self::LOGGED);
	$this->Add("GET", "source/:source/templates", $api, "GetBySource", self::LOGGED);
	$promises = new MailpromisesApi();
	$this->Add("POST", "process-promises", $promises, "ProcessPromises", self::OPEN);
	$this->Add("GET", "source/:source/promises", $promises, "GetBySource", self::LOGGED);
}
```

(`process-promises` is `OPEN` to match the existing `send-next` convention; it accepts an optional `key` for validation the same way.)

### 4.5 Cron — ✅ done in 2026-07-07

- New `src/api/cron_promises.php`, mirroring `cron.php`: bootstrap, `CronLog`, call `MailpromisesApi->ProcessPromises(null)`. Deployed as its own crontab entry (document in README/SKILL).

### 4.6 MAGRATHEAADMIN (`src/api/magrathea-admin/ContactsAdmin.php`) — ✅ done in 2026-07-07

- `$this->AddCrudFeature(new TemplatesAdmin());`
- `$this->AddCrudFeature(new MailpromisesAdmin());`
- Add both to the menu next to the existing CRUD entries.

---

## 5. ADMIN (Angular, `app-admin/`) work items — ✅ done in 2026-07-07

> **Implementation notes:** built as planned, with these specifics:
> - Feature folder is `app-admin/src/app/features/templates/` with `template-home`, `template-list`, `template-form` (dialog, like smtp), `template-preview` (sandboxed `<iframe srcdoc>`), and `promise-list`.
> - The list uses `GET /templates` filtered client-side (selected source + globals), because the backend `GetBySource` does not include globals.
> - `template-form` opens as a DynamicDialog (80% width); client-side extraction is debounced 300ms via `extractTemplateVars()`/`renderTemplate()` (exported pure functions in `template.service.ts`, same regex as the server).
> - Promises block: `Mail Promises` window on the templates home with pending/failed counters; failed rows (`processed && !mail_id`) highlighted red.
> - Menu entry "Templates" under E-mails; route `app/templates`; `nav.goTemplates()`.
> - Dev helper `src/api/tests/mint_token.php` mints a local admin JWT (used for live UI testing without Google login).

> **For the session implementing this:** the backend is done — consume it, don't change it.
> API contract: `src/openapi.yaml` — template CRUD (`POST/GET /templates`, `GET/PUT/DELETE /template/{id}`), `POST /template/preview`, `GET /source/{source}/templates`, `GET /source/{source}/promises`.
> Client-side `{{placeholder}}` extraction (regex `/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/`, debounced) is instant feedback only — the server re-extracts on save and is the source of truth.
> To run: `docker start magrathea-sql magrathea-contacts` (API at `http://contacts.magrathea.localhost.com:8080`), then `cd app-admin && npm start`. Test data can be created via `src/api/tests/` scripts or the magrathea-admin at `/admin.php`.
> Work one step at a time and show Paulo the result after each part.

New feature folder `app-admin/src/app/features/templates/`, following the `smtp`/`emails` pattern:

```
templates/
	routes.ts
	templates.module.ts        (route registration, like smtp.module.ts)
	template.interface.ts      (Template, TemplateVars types)
	template.api.ts
	template.service.ts
	template-home/             (container + source filter)
	template-list/             (table: name, source, subject, active, #vars)
	template-form/             (create/edit)
	template-preview/          (standalone preview component)
```

Conventions per CLAUDE.md: standalone components, `ChangeDetectionStrategy.OnPush`, signals, `inject()`, native `@if`/`@for`.

### template-form behavior

1. Textarea (or code-style editor) for the HTML `content` + input for `msg_subject`.
2. On content change (debounced): extract `{{placeholders}}` client-side with the same regex for instant feedback; on save, the server's `SyncVars()` remains the source of truth. The `POST template/preview` endpoint can be used to double-check server-side extraction before saving.
3. Below the editor, the variable map renders as an editable table: variable name (read-only) + default value input.
4. Preview panel.

### Preview isolation

The blueprint asks for a "pristine div". **Recommendation: use a sandboxed `<iframe srcdoc>` instead** — a div can never fully escape the admin's global styles (resets, typography, CSS variables), while an iframe renders the HTML exactly as a mail client body would, with zero bleed either way. The preview shows the template with defaults applied (and optionally sample values typed into the var table).

### Optional (same release, small): promises visibility

A "Pending promises" block (count + list) on the emails or templates home, backed by `GET source/:source/promises`, so stuck promises are visible. Rows with `processed=1 && mail_id=null` are failed renders — highlight them.

---

## 6. Docs & wrap-up — ✅ done in 2026-07-07 (openapi.yaml 2.5.0, SKILL.md, changelog 2.5, README migrations+cron sections, CLAUDE.md templated-flow section)

- `src/openapi.yaml`: new optional fields on `/add` and `/send` (`template`, `template_id`, `vars`); new paths `template` CRUD, `template/preview`, `source/{source}/templates`, `process-promises`, `source/{source}/promises`.
- `SKILL.md`: new section "Sending templated e-mail" (fields, promise semantics, the fact that `/add`+template returns a promise not a mail, `/send`+template is synchronous), plus the second cron entry.
- `src/changelog.md`: new `## 2.5` block (note: current top version is 2.1.1 — 2.5 is a deliberate jump per the blueprint).
- New crontab entry documented in README (`cron_promises.php`).

---

## 7. Suggested implementation order

1. **DB**: `database/migrations/2.5-templates.sql` (+ review `contacts.sql`). — ✅ done in 2026-07-07
2. **Templates backend**: model methods (`ExtractVars`/`SyncVars`/`Render`) → this is the core logic; everything else consumes it. — ✅ done in 2026-07-07
3. **Mailpromises backend**: `Process()` / `ProcessBatch()` / endpoint / `cron_promises.php`. — ✅ done in 2026-07-07
4. **EmailApi** `Add`/`Send` extension + routes in `api.php` + MAGRATHEAADMIN registration. — ✅ done in 2026-07-07
5. **Angular admin**: templates feature (form → var map → preview), promises block. — ✅ done in 2026-07-07
6. **Docs**: openapi.yaml, SKILL.md, changelog 2.5. — ✅ done in 2026-07-07

Each step is independently testable: after (2) templates can be CRUD'd and previewed; after (3)–(4) the full pipeline works via curl before any UI exists.

---

## 8. Resolved questions (answered by Paulo, 2026-07-06)

1. **Global templates**: `source_id = NULL` means global — usable by any key. Validation accepts a template when its `source_id` is NULL or matches the key's source.
2. **Per-mail overrides**: explicit values win. A `subject`/`message` sent alongside a template overrides the rendered template value.
3. **Processor kill-switch**: `process-promises` gets its **own** ConfigApp flag, `promises_active` (default `true`). `cron_active` keeps controlling only the send queue.
4. **Promise retention**: keep processed promises forever (audit trail); the `processed` flag marks them done. No cleanup job. Revisit only if volume becomes a problem.
5. **Render failure handling**: mark the promise `processed=1` so it is never re-processed; `mail_id` stays NULL as the failure marker; error goes to `CronLog`/`Logger` and the admin promises list surfaces these rows.

---

## 9. Pre-existing issues found during implementation (flagged, NOT fixed)

- `Apikey::ValidateKey()` (`src/api/features/Apikey/Apikey.php:33`) rejects keys with a **future** expiration — the comparison is inverted ("key expired" when `expiration > now()`).
- `cron.php` writes two `cronlogs` rows per run: `SendNext()` calls `$log->Done()` internally and the script adds a trailing `End()->Save()`. `cron_promises.php` deliberately omits the trailing save.

