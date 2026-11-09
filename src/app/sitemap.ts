import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { services } from "@/data/services";
import { shouldIndexSite } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!shouldIndexSite()) return [];
  return [
    { url: `${siteUrl()}/` },
    ...services.map(({ path }) => ({ url: `${siteUrl()}${path}` })),
  ];
}
