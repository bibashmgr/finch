import type { MetadataRoute } from "next";

import { siteConfig } from "@/constants/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}`,
      lastModified: new Date("2026-02-06"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/login`,
      lastModified: new Date("2026-02-06"),
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date("2026-02-06"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/terms-of-service`,
      lastModified: new Date("2026-02-06"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
