# Global Google search plan for dineth.ink

The goal is qualified project inquiries worldwide, with priority markets in the **USA, UK, Canada, Australia, and Germany**, alongside Sri Lanka. Position Dineth as a Sri Lanka-based freelance developer available for remote international projects. Country mentions describe service availability, not overseas offices or previous clients.

## What is implemented

- The homepage title, description, introduction, service links, and contact guidance now support worldwide remote work. The existing headline and visual design are retained.
- Two international service pages include relevant portfolio examples, project preparation advice, and answers about time zones, scope, reviews, and handover:
  - `https://www.dineth.ink/web-development`
  - `https://www.dineth.ink/software-engineering`
- The two local service pages retain their URLs and local search intent:
  - `https://www.dineth.ink/web-development-sri-lanka`
  - `https://www.dineth.ink/software-engineering-sri-lanka`
- Colombo, Anuradhapura, and Kandy are remote service areas, as confirmed by the owner. These pages do not claim physical offices in those cities.
- Each page has a distinct title, description, canonical URL, and social metadata. Homepage and footer links make the service pages discoverable.
- Person, WebSite, ProfilePage, Service, and BreadcrumbList structured data describe the visible content. International services declare worldwide coverage and the five priority countries; local services describe Sri Lanka and its confirmed cities. The person's location remains Sri Lanka. Structured data is not a promise of enhanced search results or higher rankings.
- English content uses `lang="en"` and `inLanguage: "en"`. The optional `en_LK` Open Graph locale was removed; it was not a restriction on which countries could see the site in Google. No speculative language alternates are emitted.
- The sitemap lists all five public pages. Production allows crawling; development and Vercel preview builds are excluded from indexing.

The earlier launch check on 9 November 2026 recorded HTTP 200 for the live homepage, robots.txt, and sitemap, an indexable homepage, and the canonical origin `https://www.dineth.ink`. That check predates these international changes and does not verify their deployment. The owner has already verified the site in Search Console. This code change does not deploy the site, submit URLs, or establish rankings.

## International site structure

Keep the existing domain and use the two general service URLs for international English-language searches. Keep the Sri Lanka pages available for their local audience. Each page has its own canonical URL; the global pages contain distinct remote project guidance rather than a country-name substitution.

The current English site can serve English-speaking buyers in all five priority markets and elsewhere. A dedicated country page should follow actual demand and useful country-specific content, such as an approved project case study. Do not publish five copies of the same page with different country names. This approach follows [Google's international site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) and avoids [doorway pages](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse).

For German-language searches, plan a complete, professionally reviewed German version only when you can maintain its content and handle the resulting inquiries. Translate navigation, service details, FAQs, and contact guidance on separate `/de/` URLs. Give each translated page its own canonical and reciprocal `hreflang="en"` / `hreflang="de"` references to the corresponding pages. Add a visible language switcher. Use `x-default` only where a suitable fallback is defined. The current English pages should not be labeled `de` or have invented `en-US`, `en-GB`, `en-CA`, and `en-AU` alternates pointing at nonexistent versions. See [Google's localized page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

Keep pages accessible from all countries. Avoid automatic IP-based country redirects. A country listed in `areaServed`, or a change to a language tag, does not by itself create search demand or guarantee rankings.

## Publish and submit

1. Deploy these changes to the Vercel production project. Keep `NEXT_PUBLIC_SITE_URL=https://www.dineth.ink` in Production. Vercel manages `NODE_ENV` and `VERCEL_ENV`; do not manually override them. Rebuild when changing public environment variables.
2. Open the homepage and all four service URLs above. Check the correct page content, contact navigation, and mobile layout. Confirm that apex `dineth.ink` still redirects to `www.dineth.ink`.
3. Open `https://www.dineth.ink/robots.txt` and `https://www.dineth.ink/sitemap.xml`. The sitemap should contain all five canonical URLs.
4. In the existing Google Search Console property, open **Sitemaps** and submit `https://www.dineth.ink/sitemap.xml` (or `sitemap.xml` where the property prefix is already displayed). Check the processing status.
5. Use **URL Inspection** on the homepage and all four service pages, prioritizing the two new international URLs. Select **Test live URL**, confirm that the pages are accessible and indexable, then **Request indexing**. Later compare Google's selected canonical with the declared canonical.
6. Check **Page indexing** for exclusions or crawl problems. A successful live test or indexing request does not guarantee inclusion in search results. Sitemap submission and indexing requests require the owner's Search Console access; they have not been performed by this code change.

References: [Google sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## Suggested searches to measure

These are relevant query ideas based on the confirmed services and portfolio. No keyword-volume or difficulty data has been collected; use actual Search Console impressions and qualified inquiries to prioritize them. The same international URLs can appear in several countries; queries do not need a country name to attract clients from that country.

| Page                              | Primary query ideas                                         | More specific project queries                                                                                    |
| --------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Homepage                          | Dineth Madhuranga; Dineth Madhuranga portfolio              | Dineth Madhuranga software engineer; Dineth Madhuranga web developer                                             |
| `/web-development`                | freelance web developer; remote web developer               | freelance Next.js developer; freelance React developer; business website developer; e-commerce website developer |
| `/software-engineering`           | freelance software engineer; remote full-stack developer    | custom web application developer; REST API developer; business dashboard developer                               |
| `/web-development-sri-lanka`      | web developer Sri Lanka; freelance web developer Sri Lanka  | Next.js developer Sri Lanka; web developer Colombo; web developer Anuradhapura; web developer Kandy              |
| `/software-engineering-sri-lanka` | software engineer Sri Lanka; full-stack developer Sri Lanka | custom software development Sri Lanka; software engineer Colombo; software engineer Kandy                        |

For the USA, UK, Canada, and Australia, begin with the international service queries and compare each country's results. For Germany, start with English-language remote development inquiries; German keyword research belongs with the future German content project. Do not describe Dineth as a developer physically based in any of these countries.

Use natural language such as “web developer”; there is no need to repeat every spelling, city, or phrase throughout the page. “Best web developer” queries are a longer-term competitive target. The Sri Lanka web development page answers how to choose a suitable developer, without making unverified “best” or “number one” claims.

Add a dedicated location page only when there is enough useful, distinct material, such as an approved local project story, a specific service workflow, and relevant client feedback. This applies to countries as well as cities.

## Build recognition for the name and the work

1. Use **Dineth Madhuranga** consistently on this site, GitHub, LinkedIn, Medium, and professional profiles. Add `https://www.dineth.ink/` as the portfolio URL in profiles you control.
2. Develop useful case studies for Media Asia Networks, KandyBTL, and Silonka. Explain the actual brief, your contribution, implementation decisions, and the result. Publish only measured outcomes and approved client details; do not invent traffic, revenue, or performance improvements.
3. Link technical articles to the relevant project or service page when they help the reader. Useful topics include building a tourism website, choosing a storefront approach, and designing a role-based dashboard. Demonstrate the work with actual examples.
4. Where a client agrees, request accurate attribution linking to your portfolio. Relevant editorial references and genuine professional recommendations are more useful than bulk directory submissions or purchased ranking links.
5. Collect genuine client feedback with permission. Do not add invented reviews, star ratings, office addresses, or awards to visible content or structured data.
6. Make remote hiring practical: confirm your actual meeting availability, quote currency, supported payment methods, review process, and handover terms during scoping. The site invites these discussions; it does not promise 24-hour availability or specific payment support.
7. Develop relationships with agencies and businesses in the priority markets through relevant communities, your professional network, and individually researched introductions. Use the most relevant service page and project example when discussing work. Search visibility and direct relationship building can support the same client acquisition goal; no outreach has been sent as part of this change.

Remote collaboration is confirmed. Google Business Profile is intended for eligible businesses that receive customers at a location or travel to customers; an exclusively online business should not create fictitious local offices or city profiles. See [Google's business eligibility guidelines](https://support.google.com/business/answer/3038177).

## Measure after deployment

- In Search Console **Performance → Search results**, start with all countries, then use the **Countries** dimension and country filters to inspect **United States, United Kingdom, Canada, Australia, and Germany** separately. Compare the same 28-day periods and service pages. Keep a separate Sri Lanka view for the local pages and review branded queries separately. See the [Search Console performance report documentation](https://support.google.com/webmasters/answer/7576553).
- Track impressions, clicks, click-through rate, and average position for each service page. Average position is an aggregate, not a guaranteed fixed ranking.
- Keep a simple inquiry log with the country the prospect shares, service requested, how they found you, whether the project fits, and whether it becomes paid work. Contact clicks alone are not confirmed leads. Search Console does not track inquiries or revenue; conversion analytics and attribution are not implemented by this change.
- Use query data to improve content that already earns relevant impressions. Review page experience and Core Web Vitals when field data becomes available.
- Give Google time to recrawl and assess changes. Improvements can take weeks or months; no implementation guarantees first place or indexing. See the [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## First 90 days after deployment

| Period     | Work                                                                                                                                                                  | Evidence to review                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Days 1–7   | Deploy, verify all five URLs, submit the sitemap, inspect the new pages, and record the baseline country report. Update professional profile links you control.       | Crawl/indexing status and current impressions by country; confirm that contact routes work.                    |
| Days 8–30  | Prepare one detailed, approved project case study and a useful technical article tied to a service. Discuss your work with relevant professional contacts.            | Relevant queries beginning to appear, project page visits if analytics is configured, and qualified inquiries. |
| Days 31–60 | Improve pages that attract relevant impressions, publish another project example, and clarify recurring questions from prospects.                                     | Compare country/page performance over equal periods; record inquiry quality and proposals.                     |
| Days 61–90 | Focus content on the services and markets showing useful demand. Assess whether German translation or a distinct market page has enough evidence to justify the work. | Qualified leads and won projects by market, supported by search trends.                                        |

This is a work schedule, not a promise to reach a particular position or client count in 90 days.

## Local verification

The SEO browser checks expect a production build using the public canonical origin. On PowerShell:

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://www.dineth.ink'
$env:VERCEL_ENV = 'production'
npm test
npm run build
npm run test:browser -- tests/browser/seo.spec.ts
```

Use Node.js 24 as specified in `package.json`. These browser checks only read pages and navigate links; they do not submit the contact form. They cover all five pages, canonical and social URLs, international versus local structured data, crawlable service links, mobile layouts, and accessibility. Unit tests cover indexing behavior for production, previews, local development, and missing configuration. Use a separate shell for the commands above so its environment overrides do not affect local development.
