# rufistofeles.dev

The source of [rufistofeles.dev](https://rufistofeles.dev) — my CV, and an
assistant that answers questions about it.

## What's here

| | |
|---|---|
| `index.html` | The site. One file, no build step, no framework. English and Spanish, and the print stylesheet renders it to A4 — **the page is the CV**, so there is no separate document to drift out of date. |
| `thesis.html` | My 2019 engineering thesis: home automation over the house mains using X10, an Arduino and a Raspberry Pi. Kept because it is where the rest of the work started. |
| `chat-worker/` | A Cloudflare Worker that answers questions about the CV using Workers AI, from a closed fact sheet and nothing else. See [`chat-worker/DEPLOY.md`](chat-worker/DEPLOY.md). |

## The assistant

It is deliberately narrow. It answers from a fact sheet derived from this page,
refuses anything outside it and hands over to email, and refers to me in the
third person — it is not me and is not allowed to write as if it were. Every
reply is screened before the visitor sees it, and it is capped so it cannot run
past the free tier. The reasoning behind each of those choices is in
[`chat-worker/DEPLOY.md`](chat-worker/DEPLOY.md).

If it is down, the page still reads and still prints. Nothing here depends on it.

## Licence

**Code is MIT. Personal material is not.**

- **MIT** — `chat-worker/`, and the HTML, CSS and JavaScript of the pages. Take
  the Worker, take the bilingual toggle, take the print stylesheet. Attribution
  is the only condition, and I would like to hear about it.
- **All rights reserved** — the CV and biographical text, the photograph, the
  Rufistofeles.dev logo and mark, and the thesis write-up with its diagrams and
  photographs.

The split is the ordinary one for a personal site: the machinery is worth
sharing, the contents of somebody's life are not mine to hand over on an MIT
grant.

## Contact

rafael@rufistofeles.dev
