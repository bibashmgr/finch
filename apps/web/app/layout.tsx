import type { Metadata } from "next";
// import localFont from 'next/font/local';
import { Outfit, Courier_Prime, Open_Sans } from "next/font/google";

import "@repo/ui/globals.css";

import { ThemeProvider } from "@/components/provider/theme-provider";

const fontSans = Open_Sans({
  variable: "--font-sans",
});
const fontMono = Courier_Prime({
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Finch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
