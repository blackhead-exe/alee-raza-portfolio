import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Heavy condensed display face for the editorial headings.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * The live URL, and the single source of truth for canonical links,
 * OpenGraph tags, robots.txt and sitemap.xml.
 *
 * This MUST match the domain the site actually serves from. If you rename
 * the Vercel project or attach a custom domain, change it here and nowhere
 * else. Pointing it at a URL that 404s tells Google the real page does not
 * exist and makes every shared link preview dead.
 */
export const siteUrl = "https://alee-raza-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} - ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    site.name,
    site.title,
    "GoHighLevel",
    "GHL expert",
    "CRM automation",
    "marketing automation",
    "sales funnel",
    "lead scoring",
    "workflow automation",
    "React",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${site.name} - Portfolio`,
    title: `${site.name} - ${site.title}`,
    description: site.tagline,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.title}`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data so search engines read this as a person, not a generic page.
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: siteUrl,
    email: `mailto:${site.email}`,
    description: site.tagline,
    sameAs: [site.socials.github, site.socials.linkedin, site.socials.x].filter(
      Boolean,
    ),
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        {/* Cookieless page analytics. Collects nothing until Analytics is
            switched on for the project in the Vercel dashboard. */}
        <Analytics />
      </body>
    </html>
  );
}
