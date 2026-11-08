import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
export default function robots(): MetadataRoute.Robots {
  const production = siteUrl().startsWith("https://");
  return {
    rules: {
      userAgent: "*",
      ...(production ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    ...(production ? { sitemap: `${siteUrl()}/sitemap.xml` } : {}),
  };
}
