import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { brand } from "./lib/homewatch";
import { getPublicSiteUrl } from "./lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const publicSiteUrl = getPublicSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
  description:
    `${brand.name} is the complete Home Watch management platform for visits, inspections, reports, maintenance, hurricane readiness, and client communication.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: brand.name,
    description: brand.tagline,
    url: publicSiteUrl,
    siteName: brand.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
