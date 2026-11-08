import { test, expect } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { projects } from "../../src/data/projects";
import AxeBuilder from "@axe-core/playwright";

test("complete page, real project links, device previews, and safe contact fallback", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Dineth Madhuranga/);
  await expect(page.locator("h1")).toContainText("I build what you see.");
  for (const id of ["home", "work", "about", "expertise", "experience", "contact"])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  for (const project of projects) {
    await expect(
      page.getByRole("link", { name: `Visit ${project.name} website`, exact: true }),
    ).toHaveAttribute("href", project.url);
    const mobile = page.getByRole("button", {
      name: `Mobile preview of ${project.name}`,
      exact: true,
    });
    await mobile.click();
    await expect(mobile).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByAltText(`${project.name} live website, mobile view`)).toBeVisible();
    await page
      .getByRole("button", { name: `Desktop preview of ${project.name}`, exact: true })
      .click();
  }
  await expect(page.getByRole("button", { name: "Send message", exact: true })).toBeDisabled();
  await expect(page.getByText("The contact form is not connected yet.")).toBeVisible();
  await mkdir(".artifacts", { recursive: true });
  await page.evaluate(() => document.getElementById("contact")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await page
    .locator("#contact")
    .screenshot({ path: `.artifacts/${testInfo.project.name}-contact.png` });
  if (existsSync("public/Dineth_Madhuranga_CV.pdf")) {
    const cv = page.getByRole("link", { name: "Download CV", exact: true }).first();
    await expect(cv).toHaveAttribute("href", "/Dineth_Madhuranga_CV.pdf");
    const [download] = await Promise.all([page.waitForEvent("download"), cv.click()]);
    expect(download.suggestedFilename()).toBe("Dineth_Madhuranga_CV.pdf");
    expect(await readFile((await download.path())!)).toEqual(
      await readFile("public/Dineth_Madhuranga_CV.pdf"),
    );
  } else {
    await expect(page.getByRole("link", { name: "Request my CV" }).first()).toHaveAttribute(
      "href",
      /mailto:/,
    );
  }
  await page.locator("#expertise summary").nth(1).click();
  await expect(page.locator("#expertise details").nth(1)).toHaveAttribute("open", "");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await mkdir(".artifacts", { recursive: true });
  await page.screenshot({ path: `.artifacts/${testInfo.project.name}-hero.png` });
  await page.screenshot({ path: `.artifacts/${testInfo.project.name}-full.png`, fullPage: true });
  expect(errors).toEqual([]);
});

test("mobile menu traps focus, closes with Escape, restores focus, and navigates", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open navigation" });
  await opener.click();
  const dialog = page.locator("dialog");
  await expect(dialog).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  for (let i = 0; i < 10; i++) await page.keyboard.press("Tab");
  expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Work/ })
    .click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#work$/);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("responsive widths and reduced motion retain visible content without overflow", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [360, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `overflow at ${width}px`,
    ).toBeLessThanOrEqual(width);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    "auto",
  );
});

test("unconfigured API is unavailable and never pretends delivery", async ({ request }) => {
  const response = await request.post("/api/contact", { data: { name: "Browser test" } });
  expect(response.status()).toBe(503);
  expect((await response.json()).code).toBe("configuration_required");
});

test("metadata, social graphic, sitemap and robots are served", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Dineth/);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  for (const route of ["/sitemap.xml", "/robots.txt", "/opengraph-image", "/icon.svg"])
    expect((await request.get(route)).status(), route).toBe(200);
});

test("page has no automated WCAG A or AA accessibility violations", async ({ page }) => {
  // Audit stable colors rather than an intermediate frame of an entrance animation.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
