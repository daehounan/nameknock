# NameKnock

NameKnock is a public-DB knockout screen for indie founders. Paste 1–N brand name candidates and see:

- USPTO / public trademarks
- Real-world product use
- Major TLD availability

Each name lands **pass / caution / fail** on one screen — before you brand hard.

This repository is **validation-first**: a marketing landing page and waitlist only. There is no auth, knockout UI, attorney opinion, or trademark filing.

NameKnock is **not legal advice**. It surfaces public signals only.

## Local development

```bash
npm i && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the production build
```

## Deploy on Vercel

1. Import the GitHub repo **[daehounan/nameknock](https://github.com/daehounan/nameknock)** in [Vercel](https://vercel.com/new).
2. Framework preset: Next.js (auto-detected). Build command `next build`, output as default.
3. Deploy. The landing and waitlist form work with **no environment variables**.

Until a storage key is set, the API route logs each signup to the server console and still returns success (demo mode). Check Vercel function logs to confirm submissions.

## Waitlist storage (optional)

`POST /api/waitlist` accepts:

```json
{
  "email": "you@studio.dev",
  "productKind": "saas | app | other",
  "screenVolume": "1-5 | 6-20 | 21-plus"
}
```

`email` is required. `productKind` and `screenVolume` are optional.

Plug in one of the following when you are ready to persist signups. Neither is required for the first deploy.

### 1. Form endpoint / Google Sheet (recommended for v0)

Set `WAITLIST_WEBHOOK_URL` in the Vercel project:

| Provider | What to paste |
| --- | --- |
| [Formspree](https://formspree.io) | `https://formspree.io/f/<id>` |
| Google Sheets | A Google Apps Script web app URL that appends a row |
| Make / Zapier / Resend inbound webhook | The HTTPS endpoint that should receive JSON |

Then redeploy (or wait for the next git push).

**TODO:** Create a Formspree form (or Apps Script that writes to a Sheet), copy the endpoint into `WAITLIST_WEBHOOK_URL`, and confirm a test signup appears.

### 2. Vercel Blob

1. Create a Blob store in the Vercel dashboard.
2. Set `BLOB_READ_WRITE_TOKEN` on the project.
3. Each signup is stored as a **private** JSON object at `waitlist/<timestamp>-<uuid>.json`.

Webhook takes precedence if both are set.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `WAITLIST_WEBHOOK_URL` | No | POST JSON signups to Formspree / Sheet / webhook |
| `BLOB_READ_WRITE_TOKEN` | No | Write private JSON files to Vercel Blob |

Copy `.env.example` for local overrides. Do not commit real tokens.
