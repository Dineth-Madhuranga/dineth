import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/", title: /Dineth Madhuranga.*Web Developer.*Software Engineer/ },
  { path: "/web-development-sri-lanka", title: /Web Developer in Sri Lanka.*Dineth Madhuranga/ },
  {
    path: "/software-engineering-sri-lanka",
    title: /Software Engineer in Sri Lanka.*Dineth Madhuranga/,
  },
];

test("production pages expose distinct canonical URLs, metadata, and linked structured data", async ({
  page,
  request,
}) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  const robotsResponse = await request.get("/robots.txt");
  expect(await robotsResponse.text()).toContain("Allow: /");
  for (const entry of pages) {
    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    // Confirm that useful content and metadata are in server HTML before hydration.
    const html = await response!.text();
    expect(html).toContain("application/ld+json");
    expect(html).toContain("Dineth Madhuranga");
    await expect(page).toHaveTitle(entry.title);
    const canonical = `https://www.dineth.ink${entry.path === "/" ? "/" : entry.path}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    // Next.js normalizes the origin's trailing slash in metadata.
    const actualCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const socialUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(new URL(actualCanonical!).href).toBe(canonical);
    expect(new URL(socialUrl!).href).toBe(canonical);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
    await expect(page.locator("h1")).toHaveCount(1);
    expect(sitemap).toContain(`<loc>${canonical}</loc>`);
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    const graph = schema["@graph"] as Array<Record<string, unknown>>;
    expect(graph.find((node) => node["@type"] === "Person")?.name).toBe("Dineth Madhuranga");
    if (entry.path === "/") {
      expect(graph.some((node) => node["@type"] === "WebSite")).toBe(true);
    } else {
      expect(graph.find((node) => node["@type"] === "Service")?.url).toBe(canonical);
      expect(graph.some((node) => node["@type"] === "BreadcrumbList")).toBe(true);
      expect(html).toContain("Anuradhapura");
    }
  }
});

test("service pages are accessible, responsive, and link back to working contact navigation", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.locator('#services a[href="/web-development-sri-lanka"]').click();
  await expect(page).toHaveURL(/\/web-development-sri-lanka$/);
  for (const path of pages.slice(1).map((entry) => entry.path)) {
    await page.goto(path);
    const widths = testInfo.project.name === "mobile" ? [360, 390, 767] : [1024, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      ).toBe(true);
    }
    const question = page.locator(".service-questions summary").first();
    await question.click();
    await expect(page.locator(".service-questions details").first()).toHaveAttribute("open", "");
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    await page.setViewportSize({
      width: testInfo.project.name === "mobile" ? 390 : 1440,
      height: 900,
    });
    await page.screenshot({ path: testInfo.outputPath(`${path.slice(1)}.png`), fullPage: true });
  }
  await page.setViewportSize({
    width: testInfo.project.name === "mobile" ? 390 : 1440,
    height: 900,
  });
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: /Contact/ })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contact" })
      .click();
  }
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
  expect(errors).toEqual([]);
});
