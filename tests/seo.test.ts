import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldIndexSite } from "../src/lib/seo";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";

test("public production is indexable; previews, local development, and missing origins are not", () => {
  const original = { ...process.env };
  try {
    const scenarios = [
      { mode: "production", environment: "production", url: "https://www.dineth.ink", index: true },
      { mode: "production", environment: "preview", url: "https://www.dineth.ink", index: false },
      {
        mode: "development",
        environment: "development",
        url: "https://www.dineth.ink",
        index: false,
      },
      { mode: "production", environment: "production", url: "http://localhost:3000", index: false },
      { mode: "production", environment: "production", url: "https://localhost", index: false },
      { mode: "production", environment: "production", url: "", index: false },
    ];
    for (const scenario of scenarios) {
      Object.assign(process.env, {
        NODE_ENV: scenario.mode,
        VERCEL_ENV: scenario.environment,
        NEXT_PUBLIC_SITE_URL: scenario.url,
      });
      assert.equal(shouldIndexSite(), scenario.index, JSON.stringify(scenario));
      const rules = robots().rules as { allow?: string; disallow?: string };
      if (scenario.index) {
        assert.equal(rules.allow, "/");
        assert.equal(robots().sitemap, "https://www.dineth.ink/sitemap.xml");
        assert.deepEqual(
          sitemap().map(({ url }) => url),
          [
            "https://www.dineth.ink/",
            "https://www.dineth.ink/web-development-sri-lanka",
            "https://www.dineth.ink/software-engineering-sri-lanka",
          ],
        );
      } else {
        assert.equal(rules.disallow, "/");
        assert.equal(robots().sitemap, undefined);
        assert.deepEqual(sitemap(), []);
      }
    }
    delete process.env.VERCEL_ENV;
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.dineth.ink";
    assert.equal(shouldIndexSite(), true, "a production build outside Vercel is supported");
  } finally {
    process.env = original;
  }
});
