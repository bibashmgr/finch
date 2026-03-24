import type { MetadataRoute } from "next";

import { siteConfig } from "@/constants/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login"],
      disallow: [
        "/verify-email",
        "/dashboard",
        "/settings/",
        "/budgets/",
        "/categories/",
        "/notifications/",
        "/profile/",
        "/report",
        "transactions",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
