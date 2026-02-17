import type { Metadata } from "next";
import { Courier_Prime, Open_Sans } from "next/font/google";

import { siteConfig } from "@/constants/site-config";

import { Toaster } from "@repo/ui/components/sonner";
import { TooltipProvider } from "@repo/ui/components/tooltip";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { StoreProvider } from "@/components/provider/store-provider";

import "@repo/ui/globals.css";
import { ProfileProvider } from "@/components/provider/profile-provider";
import { SettingProvider } from "@/components/provider/setting-provider";

const fontSans = Open_Sans({
  variable: "--font-sans",
});
const fontMono = Courier_Prime({
  variable: "--font-mono",
  weight: ["400", "700"],
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
