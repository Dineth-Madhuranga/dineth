import type { Metadata } from "next";
import { site, siteUrl } from "../data/site";
import { internationalMarkets, serviceCities, type Service } from "../data/services";

export function shouldIndexSite() {
  if (process.env.NODE_ENV !== "production") return false;
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return false;
  try {
    const url = new URL(siteUrl());
    return url.protocol === "https:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  } catch {
    return false;
  }
}

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, `${siteUrl()}/`).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${siteUrl()}/#person`,
    name: site.name,
    jobTitle: "Software Engineer & Full-Stack Web Developer",
    description: site.description,
    url: `${siteUrl()}/`,
    image: `${siteUrl()}/images/profilep.jpg`,
    email: site.email,
    address: { "@type": "PostalAddress", addressCountry: "LK" },
    sameAs: [
      site.github,
      ...(site.linkedinVerified ? [site.linkedin] : []),
      site.medium,
      site.frontendMentor,
    ],
    knowsAbout: [
      "Web development",
      "Software engineering",
      "React",
      "Next.js",
      "REST APIs",
      "E-commerce",
      "Cloud deployment",
    ],
  };
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "WebSite",
        "@id": `${siteUrl()}/#website`,
        name: site.name,
        url: `${siteUrl()}/`,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl()}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl()}/#webpage`,
        url: `${siteUrl()}/`,
        name: site.seoTitle,
        isPartOf: { "@id": `${siteUrl()}/#website` },
        mainEntity: { "@id": `${siteUrl()}/#person` },
      },
    ],
  };
}

export function serviceSchema(service: Service) {
  const url = `${siteUrl()}${service.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.heading,
        serviceType: service.label,
        description: service.description,
        url,
        provider: { "@id": `${siteUrl()}/#person` },
        areaServed:
          service.audience === "worldwide"
            ? ["Worldwide", ...internationalMarkets.map((name) => ({ "@type": "Country", name }))]
            : [
                { "@type": "Country", name: "Sri Lanka" },
                ...serviceCities.map((name) => ({ "@type": "City", name })),
              ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        name: service.title,
        url,
        inLanguage: "en",
        isPartOf: { "@id": `${siteUrl()}/#website` },
        mainEntity: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl()}/` },
          { "@type": "ListItem", position: 2, name: service.label, item: url },
        ],
      },
    ],
  };
}
