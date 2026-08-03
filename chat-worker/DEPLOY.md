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

## What it costs — and why it cannot surprise you

**Stay on the Workers Free plan and a bill is not possible.** The free
allocation is 10,000 Neurons/day and it is a *hard stop*, not a meter: past it,
Workers AI returns error 3036 ("You have used up your daily free allocation")
and you must actively upgrade to Workers Paid to continue. Cloudflare cannot
charge an account that has not opted in.

The limits below therefore protect the *service*, not the wallet — they keep the
widget answering real visitors instead of being drained by one. They also mean
that if you ever do move to Workers Paid for something else, this page still
cannot run up a bill.

| Limit | Value | Where |
|---|---|---|
| Per IP, per hour | 10 messages | `IP_LIMIT` |
| Whole site, per UTC day | 9,000 Neurons | `NEURON_BUDGET` |

**The day ceiling is counted in Neurons, not messages**, because messages are
not the thing that costs. This model bills 26,668 Neurons per million input
tokens and 204,805 per million output. A short question costs about 80 Neurons;
one with a full 8-message history and a maxed-out answer costs about 146. A
fixed message count is therefore either wasteful or unsafe depending on the day
— measured in Neurons, a quiet day of short questions serves ~175 people and a
heavy day serves ~119, and neither can cross the line.

Two further rules matter:

- **The check is made against the worst case** the request could cost, before
  the model is called — so the ceiling can never be crossed by surprise.
- **The budget is charged after a successful answer**, never before. A Workers
  AI outage used to eat the whole day's allowance while serving nothing; it no
  longer can.

`Origin` is **required**, not merely validated when present. The page and this
Worker are on different hosts, so a browser always sends it — a request without
one is a script, and a script is exactly what would drain the day.

KV is eventually consistent, so a large simultaneous burst can overshoot the
budget slightly. The 1,000-Neuron headroom below the free allocation absorbs it.

When any limit trips, the widget shows a message pointing at the email address,
and — if the visitor was asking for the CV — still gives them the download
button. It never fails silently.

## Changing what it knows

Edit `facts.js` and redeploy. **`facts.js` and the page are meant to agree** —
if you add a job to `index.html`, add it here in the same commit. A disagreement
between the two is the failure this whole design exists to prevent.

The assistant is instructed to refuse anything outside the fact sheet, to speak
about Rafael in the third person, and to ignore instructions embedded in visitor
messages. Those rules live in `systemPrompt()` in `worker.js`.
