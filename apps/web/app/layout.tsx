import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { siteConfig } from "@/constants/site-config";

import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "./_components/theme-provider";
import { StoreProvider } from "./_components/store-provider";
import { TooltipProvider } from "@repo/ui/components/tooltip";
import { ProfileProvider } from "./_components/profile-provider";
import { SettingProvider } from "./_components/setting-provider";

import "@repo/ui/globals.css";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});
const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  icons: siteConfig.icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable}`}>
        <StoreProvider>
          <ProfileProvider>
            <SettingProvider>
              <ThemeProvider>
                <TooltipProvider>{children}</TooltipProvider>
                <Toaster position="top-center" />
              </ThemeProvider>
            </SettingProvider>
          </ProfileProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
