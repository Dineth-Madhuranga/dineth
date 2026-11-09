import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { shouldIndexSite } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  const production = shouldIndexSite();
  return {
    rules: {
      userAgent: "*",
      ...(production ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    ...(production ? { sitemap: `${siteUrl()}/sitemap.xml` } : {}),
  };
}
