# Dineth Madhuranga — portfolio

A complete single-page Next.js App Router portfolio with a warm editorial identity, real project previews, device switching, accessible navigation, experience, technical expertise, engineering case summaries, SEO, and a protected Nodemailer contact endpoint.

## Run locally

Use Node.js 24 LTS for deployment (the code also supports Node 20.9+). Install dependencies and start:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

In PowerShell, use `Copy-Item .env.example .env.local`. Visit **http://localhost:3000**. The portfolio runs without credentials; the form then clearly provides a direct email fallback.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:browser
npm run test:contact-ui
```

Browser tests use an installed Microsoft Edge on Windows, or Playwright Chromium elsewhere. Set `BROWSER_PATH` to an absolute Chromium/Chrome executable if needed; otherwise run `npx playwright install chromium`. Browser tests launch the production server after a build, test desktop and mobile, and write ignored review images to `.artifacts/`.

The production browser suite runs on port 3100. Contact UI tests use a separate development output directory and port 3001, with dummy credentials and intercepted API responses. They do not connect to SMTP or send emails. Keep these ports free when testing.

## Content and visual system

- `src/data/site.ts`: personal details, social links, availability configuration.
- `src/data/projects.ts`: five curated live projects and verified public source links.
- `src/data/experience.ts` and `skills.ts`: career, education, and grouped capabilities.
- `src/app/globals.css`: centralized color tokens, fluid typography, layouts, responsive rules, and reduced motion.
- `src/components/`: primarily server-rendered sections, with client islands for navigation, Motion reveals, previews, and the form.

Space Grotesk, DM Sans, Instrument Serif, and JetBrains Mono are loaded through `next/font`. Google Fonts must be reachable during the first build; deployed fonts are self-hosted by Next.js.

## Original CV

The original CV was added during implementation and is included unchanged at:

```text
public/Dineth_Madhuranga_CV.pdf
```

Desktop and mobile use a real **Download CV** link. To replace the CV, copy the updated original to that same path and rebuild. The server component falls back to “Request my CV” if the file is absent. The original uploaded filename is also retained; no résumé content was generated or changed.

The owner confirmed the LinkedIn address from the brief during implementation. It is enabled in the UI, structured data, and visitor email. LinkedIn blocks automated verification with HTTP 999; see `docs/project-research.md`. No availability status is fabricated.

## Refresh the real project screenshots

```bash
npm run capture
```

Playwright visits all five live sites at 1440 × 960 and 390 × 844, waits for fonts/content, and writes optimized WebP images. Captures and provenance live in `public/images/projects/` and `src/data/preview-status.json`. Review images before committing them, since live sites can change or show overlays. On capture failure, the UI keeps a working live link and labels the missing preview. Manually supplied authentic screenshots can be placed in the same directory and referenced in the manifest.

Refresh one project with `npm run capture -- --only=silonka` (use its ID from project data). The script retains earlier successful previews if a refresh fails, records capture errors, declines optional cookie notices when available, and waits for background video frames. No page content is fabricated or painted over.

## Email and protection configuration

Copy `.env.example` to `.env.local` locally, or enter these in Vercel Environment Variables. Never commit credentials.

For Gmail, the example uses `smtp.gmail.com`, port `465`, TLS, and `dinethlaksitha@gmail.com` as the sender and owner inbox. Put your Google app password (without spaces) in `SMTP_PASSWORD` in `.env.local`; `.env.example` is a template and is not loaded by Next.js. Preserve an existing configured `.env.local` rather than overwriting it. See [Google's SMTP settings](https://developers.google.com/workspace/gmail/imap/imap-smtp) and [app-password guidance](https://support.google.com/mail/answer/7104828).

To use the local contact form before configuring Turnstile and Redis, set `CONTACT_TEST_MODE=true` in `.env.local` and run `npm run dev` at `http://localhost:3000`. This mode sends real email when Gmail credentials are configured: the owner notification goes to your inbox, and the acknowledgment goes to the address entered in the form. It only bypasses the external protection services in development. Refresh the page after changing environment values; restart the dev server if it has not picked them up. Production still requires the protection keys and final HTTPS origin below.

| Variables                                                | Purpose                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`                | SMTP provider credentials                                                             |
| `SMTP_PORT`, `SMTP_SECURE`                               | `465` / `true` for TLS, or `587` / `false` for required STARTTLS                      |
| `MAIL_FROM`                                              | Sender address verified with the SMTP provider; may include `Dineth Madhuranga <...>` |
| `CONTACT_TO_EMAIL`                                       | Owner inbox, defaults to `dinethlaksitha@gmail.com`                                   |
| `NEXT_PUBLIC_SITE_URL`                                   | Exact site origin; HTTPS required in production; no trailing path                     |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile widget and server verification                                   |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`     | Persistent Redis rate limits and submission tracking                                  |
| `CONTACT_HASH_SECRET`                                    | Long random secret used to hash identifiers and submission fingerprints               |
| `CONTACT_TEST_MODE`                                      | Optional local-only SMTP sandbox mode; never enabled in production                    |

Generate a secret locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`, then save it only in your environment settings.

Create a Turnstile widget that allows your exact domain. The server verifies token success, hostname, and the `contact` action. Both Turnstile keys, persistent Redis, a hash secret, a valid HTTPS origin, and SMTP configuration are required before public submissions are enabled. Production fails closed if protection providers fail. `CONTACT_TEST_MODE=true` is ignored in production.

The endpoint accepts only same-origin JSON, caps request bytes, validates every field with Zod, rejects a honeypot, hashes identifiers, and limits submissions by IP (5 / 15 minutes), email (3 / hour), and globally (100 / day). On Vercel it uses the platform-controlled IP header; other servers use a shared conservative bucket. Adjust the limits in `src/lib/contact-security.ts` as needed.

No SMTP or Redis secret enters a Client Component. Email addresses submitted by visitors are used as validated `Reply-To` and acknowledgment recipients, never as the `From` address. The owner recipient cannot be supplied by the browser. HTML templates escape submitted content and have plain-text alternatives. Logs contain event labels, not messages, personal data, or configuration.

### Delivery semantics

Both SMTP calls are awaited. The first sends the owner notification; only after SMTP accepts it does the second send the visitor acknowledgment. If the second fails, the form confirms receipt while explaining that confirmation email failed. It never claims both emails succeeded when one failed.

A client UUID and Redis `SET NX` reservation prevent concurrent/repeated owner notifications for 24 hours. A payload fingerprint prevents changing content under an existing key. Completion or owner acceptance is replayed safely without resending. If the SMTP provider times out with uncertain acceptance, the reservation remains and the visitor is directed to email. SMTP does not provide transactional exactly-once delivery; a crash between provider acceptance and a persistent state write can leave an uncertain state. Do not automatically delete an uncertain record and resend. Check the provider logs before any manual retry. Acknowledgment failures are not automatically retried.

### Test with a safe inbox first

1. Use an SMTP sandbox such as Ethereal or Mailtrap Email Testing with TLS on port 587, and its test credentials. Set `MAIL_FROM` to a safe test identity and `CONTACT_TO_EMAIL` to a test address.
2. Set `CONTACT_TEST_MODE=true` **only in `.env.local` while running `npm run dev`**. It bypasses external bot/rate services for local testing, with a small process-local idempotency store. It cannot enable production submissions.
3. Submit a valid inquiry. In the sandbox, inspect both messages, responsive HTML, plain text, escaped characters, `From`, `Reply-To`, owner recipient, and acknowledgment recipient. No real delivery is expected from an SMTP sandbox.
4. Test real protection with a development Turnstile widget/domain and a separate Redis database, with test mode off. Verify expired tokens, multiple submissions, and failure behavior.
5. Switch to your real verified sender and production SMTP credentials. Configure SPF/DKIM with the provider. Deploy, send one controlled inquiry, and check the actual owner and visitor inboxes, including spam folders. This final real delivery verification requires your credentials and was not performed by the implementation agent.

Automated service tests use injected mail/store doubles and send **no emails**. They cover invalid input, HTML escaping, replay, concurrent submissions, rate limits, bot rejection, partial delivery, SMTP ambiguity, and Redis failure. They do not prove live provider delivery or external provider configuration.

## Deploy to Vercel

1. Review the included original CV and captured projects.
2. Create your own Git repository and push this source to GitHub. The initial workspace had no repository or remote; no existing repository was overwritten.
3. Import the repository into Vercel, select **Next.js**, and use Node.js **24.x**. Keep the root at this directory. Build: `npm run build`. Install: `npm ci`. Use the framework’s default output directory.
4. Set production and preview environment values separately. Set `NEXT_PUBLIC_SITE_URL` to the exact origin of the deployment being tested; Turnstile must allow that host. The canonical URL, sharing URLs, and request origin check use this value.
5. Redeploy after environment changes; `NEXT_PUBLIC_*` values and static page configuration are incorporated at build time. The Vercel config allows 60 seconds for the Node contact route. No separate server or database is required for the portfolio content.
6. Verify navigation, images, the real CV download, `/robots.txt`, `/sitemap.xml`, and `/opengraph-image`. Complete the controlled two-inbox email test above.

The production application is a standard Node-based Next.js deployment. It is prepared for Vercel, not deployed to the Sites Cloudflare Worker runtime, which does not provide the raw TCP SMTP runtime required by this brief. No public deployment or real delivery claim is made without the corresponding credentials and checks.

## Verification notes

See `docs/verification.md` for the executed checks, actual screenshot results, and remaining configuration. No Lighthouse score is asserted without a measurement. Public source verification is documented in `docs/project-research.md`.

Provider references: [Vercel Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vercel request headers](https://vercel.com/docs/headers/request-headers), [Turnstile server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
