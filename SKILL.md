# MagratheaContacts API — Integration Guide

REST API for managing contact sources, API keys, and transactional e-mail sending/queueing.

Full machine-readable spec: `src/openapi.yaml`.

## Base URL

There is no single fixed production URL — it is configured per deployment via `server_url` / `api_url` in `configs/magrathea.conf`. Ask the project owner for the correct value.

- Local dev: `http://localhost:8080`
- Production: whatever `server_url` is set to in the `[production]` config block.

All paths below are relative to that base URL.

## Response envelope

Every response (success or failure) is wrapped:

```json
{ "success": true, "data": { ... } }
```

```json
{ "success": false, "data": { "type": "...", "error": "...", "code": 400, "message": "..." } }
```

---

## Auth

Two tiers:

| Tier | Who uses it | How |
|------|-------------|-----|
| **Public** | External integrations sending mail | API key (`key` field in the request body) |
| **Logged** | Admin/management operations | JWT bearer token from `POST /login` |

### Getting a JWT (admin operations only)

```bash
curl -X POST https://contacts.example.com/login \
  -d "email=admin@example.com" \
  -d "password=secret"
```

Response `data`:
```json
{
  "token": "eyJ...",
  "refresh_token": "...",
  "expires": "2026-06-23 00:00:00",
  "data": { "id": 1, "email": "admin@example.com", "role": 1, "roleName": "Admin" }
}
```

Use `token` as `Authorization: Bearer <token>` on all logged endpoints.

### API keys (for sending mail)

Most integrations never need a JWT. An admin issues an **API key** (the `val` field of an `Apikey` record) via the admin UI, tied to a `Source` (sender identity). Pass the key as the `key` form field on e-mail endpoints — no `Authorization` header needed.

---

## Sending e-mail — what most integrations need

### Send immediately (POST /send)

Queues the e-mail and sends it synchronously in one call.

```bash
curl -X POST https://contacts.example.com/send \
  -d "key=YOUR_API_KEY" \
  -d "to=user@example.com" \
  -d "subject=Welcome" \
  -d "message=<p>Hello!</p>"
```

**Request fields:**

| Field | Required | Notes |
|-------|----------|-------|
| `key` | yes | API key |
| `to` / `mail_to` | yes | Recipient address |
| `subject` | yes | Subject line |
| `message` | yes | Body (HTML by default) |
| `type` / `mail_type` | no | Arbitrary type tag |

**Response `data`:**

```json
{ "success": "true", "send-type": "smtp", "mailto": "user@example.com" }
```

`send-type` is `"smtp"` when the source has a configured SMTP server, `"server"` when using the host mailer. If the key has `simulate=true` the mail is not delivered and `"simulate": "true"` is added to the response.

### Queue only, send later (POST /add or POST /email)

Same fields as `/send`. The mail row is created with `sent_status=0` and processed by the cron job. Use this when you want retry/priority management instead of synchronous delivery.

```bash
curl -X POST https://contacts.example.com/add \
  -d "key=YOUR_API_KEY" \
  -d "to=user@example.com" \
  -d "subject=Welcome" \
  -d "message=<p>Hello!</p>"
```

Response `data` is the created `Email` record.

---

## E-mail status codes

`sent_status` on an `Email` record:

| Value | Meaning |
|-------|---------|
| `0` | Not yet sent (queued) |
| `1` | Sent |
| `2` | Error |
| `3` | Test (not an error, not sent) |
| `4` | Simulated |

---

## Checking a key / listing e-mails

```bash
# View key + its source — public, no auth
curl https://contacts.example.com/key/YOUR_API_KEY/view

# List e-mails sent under a key — requires JWT
curl https://contacts.example.com/key/YOUR_API_KEY/emails \
  -H "Authorization: Bearer <token>"

# List e-mails for a source — requires JWT
curl https://contacts.example.com/source/42/emails \
  -H "Authorization: Bearer <token>"
```

---

## Managing sources (JWT required)

A **Source** is a sender identity (`name`, `mail_from`) optionally linked to an SMTP config (`smtp_id`). Sources must exist before API keys can be issued against them.

```bash
# List sources
curl https://contacts.example.com/sources \
  -H "Authorization: Bearer <token>"

# Create a source
curl -X POST https://contacts.example.com/sources \
  -H "Authorization: Bearer <token>" \
  -d "name=My App" \
  -d "mail_from=noreply@myapp.com"

# Get / update / delete
curl https://contacts.example.com/source/1 -H "Authorization: Bearer <token>"
curl -X PUT https://contacts.example.com/source/1 -H "Authorization: Bearer <token>" -d "name=New Name"
curl -X DELETE https://contacts.example.com/source/1 -H "Authorization: Bearer <token>"
```

API keys themselves are managed via the admin UI, not through a public API endpoint.

---

## Integration examples

### Node.js / fetch

```js
async function sendMail(baseUrl, apiKey, { to, subject, message }) {
  const res = await fetch(`${baseUrl}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ key: apiKey, to, subject, message }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.data?.message ?? 'send failed');
  return json.data; // SendResult
}
```

### PHP / curl

```php
function contacts_send_mail(string $baseUrl, string $key, string $to, string $subject, string $message): array {
    $ch = curl_init("$baseUrl/send");
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS     => http_build_query(compact('key', 'to', 'subject', 'message')),
    ]);
    $body = json_decode(curl_exec($ch), true);
    curl_close($ch);
    if (!$body['success']) {
        throw new RuntimeException($body['data']['message'] ?? 'send failed');
    }
    return $body['data'];
}
```

### Python / requests

```python
import requests

def send_mail(base_url, api_key, to, subject, message):
    r = requests.post(f"{base_url}/send", data={
        "key": api_key, "to": to, "subject": subject, "message": message,
    })
    body = r.json()
    if not body["success"]:
        raise RuntimeError(body["data"].get("message", "send failed"))
    return body["data"]
```

---

## Error responses

| HTTP status | Meaning |
|-------------|---------|
| 400 | Bad request — missing/invalid fields or invalid API key |
| 401 | Missing, expired, or invalid JWT on a logged endpoint |
| 404 | Unknown route |
| 500 | Server error |

Validation errors list each problem pipe-separated in `message`, e.g.:

```
'to' field cannot be empty! | 'subject' field cannot be empty!
```

---

## Cron endpoint (internal)

`POST /send-next` (alias `/proccess`) processes the single highest-priority unsent e-mail from the queue. This is intended for the MagratheaContacts cron job, not external integrations.
