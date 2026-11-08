import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { projects } from "../src/data/projects";

async function main() {
  const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_PATH
      ? { executablePath: process.env.BROWSER_PATH }
      : existsSync(edge)
        ? { executablePath: edge }
        : {}),
  });
  const output = "public/images/projects";
  await mkdir(output, { recursive: true });
  type Capture = {
    desktop?: string;
    mobile?: string;
    title?: string;
    capturedAt?: string;
    errors?: string[];
  };
  const manifest: Record<string, Capture> = await readFile("src/data/preview-status.json", "utf8")
    .then((value) => JSON.parse(value) as Record<string, Capture>)
    .catch(() => ({}));
  const only = process.argv.find((value) => value.startsWith("--only="))?.slice(7);
  const selected = only ? projects.filter((project) => project.id === only) : projects;
  if (!selected.length) throw new Error("Unknown project ID");
  try {
    for (const project of selected) {
      manifest[project.id] = { ...manifest[project.id], errors: [] };
      for (const device of ["desktop", "mobile"] as const) {
        const context = await browser.newContext({
          viewport:
            device === "desktop" ? { width: 1440, height: 960 } : { width: 390, height: 844 },
          deviceScaleFactor: 1,
          isMobile: device === "mobile",
          reducedMotion: "no-preference",
        });
        const page = await context.newPage();
        try {
          const response = await page.goto(project.url, {
            waitUntil: "domcontentloaded",
            timeout: 60000,
          });
          if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
          await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
          await page.evaluate(() => document.fonts.ready);
          await page
            .waitForFunction(
              () =>
                Array.from(document.querySelectorAll("video")).every(
                  (video) => video.readyState >= 2 || video.error,
                ),
              undefined,
              { timeout: 15000 },
            )
            .catch(() => {});
          await page.waitForTimeout(3500);
          const decline = page
            .getByRole("button", { name: /^(decline|reject all|reject optional cookies)$/i })
            .first();
          if (await decline.isVisible().catch(() => false)) await decline.click();
          // Let intersection-driven images initialize, then return to the real page hero.
          await page.evaluate(() => window.scrollTo(0, 400));
          await page.waitForTimeout(500);
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(1000);
          const screenshot = await page.screenshot({ type: "png", animations: "disabled" });
          const file = `${project.id}-${device}.webp`;
          await sharp(screenshot).webp({ quality: 87 }).toFile(`${output}/${file}`);
          manifest[project.id][device] = `/images/projects/${file}`;
          manifest[project.id].title = await page.title();
          manifest[project.id].capturedAt = new Date().toISOString();
          console.log(`Captured ${project.name}: ${device}`);
        } catch (error) {
          manifest[project.id].errors!.push(
            `${device}: ${error instanceof Error ? error.message : "capture failed"}`,
          );
          console.error(`Could not capture ${project.name}: ${device}`);
        } finally {
          await context.close();
        }
      }
      await writeFile("src/data/preview-status.json", JSON.stringify(manifest, null, 2) + "\n");
    }
  } finally {
    await browser.close();
  }
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
