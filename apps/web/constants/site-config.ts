export type AuthorsConfig = {
  name: string;
  url: string;
};

export type ImageDescriptor = {
  url: string | URL;
  alt?: string | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  url: string;
  keywords: string[];
  authors: AuthorsConfig[];
  creator: string;
  icons: {
    icon: string;
    apple: string;
    shortcut: string;
  };
  openGraph: {
    type: string;
    locale: string;
    url: string;
    title: string;
    description: string;
    siteName: string;
    images: Array<ImageDescriptor>;
  };
  twitter: {
    card: string;
    site: string;
    title: string;
    description: string;
    images: Array<string>;
    creator: string;
  };
};

const baseSiteConfig = {
  name: "Finch",
  shortName: "Finch",
  description:
    "Track expenses, manage income, and plan budgets with Finch—a smart, easy-to-use web app for better personal finance management.",
  url: process.env.NEXT_PUBLIC_CLIENT_BASE_URL!,
  creator: "@bibashmgr",
  keywords: [
    "expense tracker",
    "income tracker",
    "budget tracker",
    "personal finance app",
    "money management app",
  ],
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/icons/shortcut-icon.png",
  },
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  authors: [
    {
      name: "bibashmgr",
      url: baseSiteConfig.url,
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.shortName,
    images: [
      {
        url: `${baseSiteConfig.url}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: baseSiteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/images/opengraph-image.png`],
    creator: baseSiteConfig.creator,
  },
};
