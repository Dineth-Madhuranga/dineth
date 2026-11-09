# Google search plan for dineth.ink

## What is implemented

- The homepage identifies Dineth Madhuranga as a software engineer and freelance web developer in Sri Lanka. It retains the existing headline and visual design.
- Two service pages explain different types of work, with relevant portfolio examples, project preparation advice, and frequently asked questions:
  - `https://www.dineth.ink/web-development-sri-lanka`
  - `https://www.dineth.ink/software-engineering-sri-lanka`
- Colombo, Anuradhapura, and Kandy are remote service areas, as confirmed by the owner. These pages do not claim physical offices in those cities.
- Each page has a distinct title, description, canonical URL, and social metadata. Homepage and footer links make the service pages discoverable.
- Person, WebSite, ProfilePage, Service, and BreadcrumbList structured data describe the visible content. Structured data is not a promise of enhanced search results or higher rankings.
- The sitemap lists all three public pages. Production allows crawling; development and Vercel preview builds are excluded from indexing.

The live homepage, robots.txt, and sitemap were checked on 9 November 2026. They returned HTTP 200, the homepage allowed indexing, and its canonical URL used `https://www.dineth.ink`. This confirms crawl access, not that Google has indexed or ranked it. The owner has already verified the site in Search Console.

## Publish and submit

1. Deploy these changes to the Vercel production project. Keep `NEXT_PUBLIC_SITE_URL=https://www.dineth.ink` in Production. Vercel manages `NODE_ENV` and `VERCEL_ENV`; do not manually override them. Rebuild when changing public environment variables.
2. Open the three page URLs. Check the correct page content, contact navigation, and mobile layout. Confirm that apex `dineth.ink` still redirects to `www.dineth.ink`.
3. Open `https://www.dineth.ink/robots.txt` and `https://www.dineth.ink/sitemap.xml`. The sitemap should contain all three canonical URLs.
4. In the existing Google Search Console property, open **Sitemaps** and submit `https://www.dineth.ink/sitemap.xml` (or `sitemap.xml` where the property prefix is already displayed). Check the processing status.
5. Use **URL Inspection** on the homepage and both service pages. Select **Test live URL**, confirm that the pages are accessible and indexable, then **Request indexing**. Later compare Google's selected canonical with the declared canonical.
6. Check **Page indexing** for exclusions or crawl problems. A successful live test or indexing request does not guarantee inclusion in search results. Sitemap submission and indexing requests require the owner's Search Console access; they have not been performed by this code change.

References: [Google sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## Suggested searches to measure

These are relevant query ideas based on the confirmed services and portfolio. No keyword-volume or difficulty data has been collected; use actual Search Console impressions to prioritize them.

| Page                 | Primary queries                                             | Additional relevant queries                                                                                                     |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Homepage             | Dineth Madhuranga; Dineth Madhuranga portfolio              | Dineth Madhuranga software engineer; Dineth Madhuranga web developer                                                            |
| Web development      | web developer Sri Lanka; freelance web developer Sri Lanka  | web developer Colombo; web developer Anuradhapura; web developer Kandy; website developer Sri Lanka; web design Sri Lanka       |
| Web development      | Next.js developer Sri Lanka; React developer Sri Lanka      | e-commerce website developer Sri Lanka; business website development Sri Lanka; tourism website developer Sri Lanka             |
| Software engineering | software engineer Sri Lanka; full-stack developer Sri Lanka | software engineer Colombo; software engineer Kandy; freelance software developer Sri Lanka                                      |
| Software engineering | custom software development Sri Lanka                       | web application developer Sri Lanka; backend developer Sri Lanka; REST API developer Sri Lanka; dashboard development Sri Lanka |

Use natural language such as “web developer”; there is no need to repeat every spelling, city, or phrase throughout the page. “Best web developer” queries are a longer-term competitive target. The web development page answers how to choose a suitable developer, without making unverified “best” or “number one” claims.

Do not create near-identical pages for every city. Add a dedicated location page only when there is enough useful, distinct material, such as an approved local project story, a specific service workflow, and relevant client feedback. Google describes repetitive city pages that funnel to the same destination as a form of [doorway abuse](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse).

## Build recognition for the name and the work

1. Use **Dineth Madhuranga** consistently on this site, GitHub, LinkedIn, Medium, and professional profiles. Add `https://www.dineth.ink/` as the portfolio URL in profiles you control.
2. Develop useful case studies for Media Asia Networks, KandyBTL, and Silonka. Explain the actual brief, your contribution, implementation decisions, and the result. Publish only measured outcomes and approved client details; do not invent traffic, revenue, or performance improvements.
3. Link technical articles to the relevant project or service page when they help the reader. Useful topics include building a tourism website, choosing a storefront approach, and designing a role-based dashboard. Demonstrate the work with actual examples.
4. Where a client agrees, request accurate attribution linking to your portfolio. Relevant editorial references and genuine professional recommendations are more useful than bulk directory submissions or purchased ranking links.
5. Collect genuine client feedback with permission. Do not add invented reviews, star ratings, office addresses, or awards to visible content or structured data.

Remote collaboration is confirmed. Google Business Profile is intended for eligible businesses that receive customers at a location or travel to customers; an exclusively online business should not create fictitious local offices or city profiles. See [Google's business eligibility guidelines](https://support.google.com/business/answer/3038177).

## Measure after deployment

- In Search Console **Performance → Search results**, compare queries and pages for consistent 28-day periods. Filter country to Sri Lanka when evaluating national service searches, and review branded searches separately.
- Track impressions, clicks, click-through rate, and average position for each service page. Average position is an aggregate, not a guaranteed fixed ranking.
- Use query data to improve content that already earns relevant impressions. Review page experience and Core Web Vitals when field data becomes available.
- Give Google time to recrawl and assess changes. Improvements can take weeks or months; no implementation guarantees first place or indexing. See the [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Local verification

The SEO browser checks expect a production build using the public canonical origin. On PowerShell:

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://www.dineth.ink'
$env:VERCEL_ENV = 'production'
npm run build
npm run test:browser -- tests/browser/seo.spec.ts
```

These browser checks only read pages and navigate links; they do not submit the contact form. Unit tests cover indexing behavior for production, previews, local development, and missing configuration. Use a separate shell for the commands above so its environment overrides do not affect local development.
