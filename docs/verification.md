# Verification and handoff

Implementation and verification: 8 November 2026.

## Completed

- Next.js 16.4.5 App Router production build, with a prerendered landing page and Node.js contact API.
- Strict TypeScript checks and ESLint.
- 13 unit/service/HTTP tests covering configuration, validation, escaped templates, origin and request-body protection, rate/bot rejection, concurrent duplicates, uncertain delivery, partial delivery, and persistent store failure.
- 10 production browser checks across desktop and mobile, with two intentional viewport-specific skips. The suite checks all five project URLs and toggles, keyboard mobile menu behavior, focus restoration, scroll lock, metadata endpoints, honest disabled-form behavior, and reduced motion.
- Layouts checked at 360, 375, 390, 430, 768, 1024, 1440, and 1920 pixels: no horizontal document overflow.
- Three contact UI scenarios: inline validation/focus, disabled loading state with partial-delivery feedback, and network retry preserving the idempotency key. These tests intercept responses and send no emails.
- Automated axe WCAG 2 A/AA, 2.1 AA, and 2.2 AA checks use reduced motion to audit stable color values, rather than an intermediate frame of entrance animation. No violations on the tested desktop/mobile states. This is not a comprehensive accessibility certification.
- Production dependency audit: zero known vulnerabilities at verification time. The installation also reported eight moderate advisories in development tooling; no forced breaking dependency upgrades were applied.
- Visual inspection of desktop/mobile portfolio screenshots and real project captures. Review images are in the ignored `.artifacts/` directory.
- The original CV was added during implementation, copied to the expected URL without changing its bytes, and enabled in both CV actions. Browser checks verify the downloaded filename and bytes on desktop and mobile.

The first contact retry browser run found an ambiguous test selector because Next.js also exposes a route announcer with `role="alert"`. The selector was scoped to the form and the retry test then passed. No actual delivery issue was found.

## Captured real assets

All ten WebP screenshots were captured from the live sites, without fabricated replacement content:

| Project ID  | Desktop    | Mobile    |
| ----------- | ---------- | --------- |
| mediaasia   | 1440 × 960 | 390 × 844 |
| kandybtl    | 1440 × 960 | 390 × 844 |
| silonka     | 1440 × 960 | 390 × 844 |
| voceylon    | 1440 × 960 | 390 × 844 |
| guideceylon | 1440 × 960 | 390 × 844 |

Files: `public/images/projects/{id}-{desktop|mobile}.webp`. Capture titles and UTC timestamps: `src/data/preview-status.json`. Silonka’s optional cookie notice was declined during capture. Voice of Ceylon was refreshed with its normal background video enabled after its reduced-motion presentation was observed to show an empty background.

## Owner setup still required

1. Configure SMTP sender/credentials, Turnstile keys, Upstash Redis credentials, `CONTACT_HASH_SECRET`, and the final `NEXT_PUBLIC_SITE_URL`, as listed in `.env.example`.
2. Test the two emails first with an SMTP sandbox, then with a controlled real inquiry after Vercel deployment. Actual SMTP delivery, provider configuration, live Turnstile validation, and remote Redis operations have not been verified without credentials.
3. Import the source repository into Vercel with Node 24.x and redeploy after environment/asset changes. No public deployment was performed. All requested project screenshots and the original CV are present.

The owner confirmed the brief’s LinkedIn URL during implementation. LinkedIn blocks automated access with HTTP 999; owner confirmation is the basis for displaying that address.

## Scope of measurements

The implementation environment ran Node 20.19.4; Vercel is explicitly configured through `engines.node` and `.nvmrc` for supported Node 24.x. npm emitted a local engine warning because of that deployment pin; compilation and tests completed on the available local runtime. A deployed Node 24 smoke test remains part of deployment verification.

No Lighthouse or real-user Core Web Vitals score is claimed. Images use Next.js optimization, fonts use `next/font`, below-the-fold previews load lazily, and the static page uses isolated client components for interactivity.
