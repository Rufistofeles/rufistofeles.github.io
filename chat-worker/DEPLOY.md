# Deploying the CV chat worker

About ten minutes. Nothing here touches DNS, so `rafael@rufistofeles.dev` cannot break.

## What this is

A Cloudflare Worker that answers questions about the CV using Workers AI, from
the closed fact sheet in `facts.js` and nothing else. The page calls it at its
`*.workers.dev` URL.

**Why not `chat.rufistofeles.dev`?** A Worker custom domain requires Cloudflare
to be the domain's nameserver. `rufistofeles.dev` is on Google Cloud DNS with
live Zoho MX records — that is the address on the CV. Moving nameservers means
re-creating every record by hand, and a mistake bounces job offers. The
`workers.dev` URL is invisible to visitors and risks nothing.

## Prerequisites

- A Cloudflare account (free tier is enough).
- `npm i -g wrangler`, then `wrangler login`.

## Steps

**1. Create the KV namespace** — used for the per-IP rate limit and the daily budget.

```bash
cd chat-worker
wrangler kv namespace create CHAT_KV
```

Copy the printed `id` into `wrangler.toml`, replacing `PASTE_KV_NAMESPACE_ID_HERE`.

**2. Deploy.**

```bash
wrangler deploy
```

Wrangler prints the URL, e.g. `https://rufistofeles-cv-chat.<your-subdomain>.workers.dev`.

**3. Point the page at it.** In `index.html`, find:

```js
var ASK_ENDPOINT = '';
```

and paste the URL in. **Until this is set, the widget does not render at all** —
the CV page ships safe and the chat simply doesn't exist. That is deliberate.

**4. Commit and push.** GitHub Pages rebuilds in about a minute.

## Check it

```bash
curl -X POST https://<your-worker>.workers.dev/ \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://rufistofeles.dev' \
  -d '{"messages":[{"role":"user","content":"How many years of .NET?"}],"lang":"en"}'
```

Expect `{"reply":"..."}` mentioning 2015 and eleven years. Without the `Origin`
header from an allowed origin you get `403` — that is correct.

## What it costs

Workers AI free tier is **10,000 Neurons/day**. This model bills 26,668 Neurons
per million input tokens and 204,805 per million output tokens, so one exchange
(~1.6k in, ~200 out) costs roughly **80 Neurons** — about **125 questions a day**
before the free allowance runs out.

Two limits keep it inside that, and they are independent:

| Limit | Value | Where |
|---|---|---|
| Per IP, per hour | 10 messages | `IP_LIMIT` in `worker.js` |
| Whole site, per UTC day | 120 messages | `DAILY_BUDGET` in `worker.js` |

The per-IP limit stops one person. The daily budget stops a crowd — without it,
a distributed abuser drains the account no matter how tight the per-IP rule is.
When either trips, the widget shows a message pointing at the email address. It
never fails silently and it never spends past the cap.

## Changing what it knows

Edit `facts.js` and redeploy. **`facts.js` and the page are meant to agree** —
if you add a job to `index.html`, add it here in the same commit. A disagreement
between the two is the failure this whole design exists to prevent.

The assistant is instructed to refuse anything outside the fact sheet, to speak
about Rafael in the third person, and to ignore instructions embedded in visitor
messages. Those rules live in `systemPrompt()` in `worker.js`.
