import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Advert — Antalya Web Tasarım & Dijital Ajans | Yapay Zeka Destekli Çözümler",
  description:
    "Antalya merkezli dijital ajans Advert, yapay zeka destekli web tasarım, site tasarım, otomasyon, video prodüksiyon ve dijital reklamcılık hizmetleri sunar. Google Ads, Meta Ads yönetimi, kurumsal web sitesi ve e-ticaret çözümleri.",
  keywords: [
    "antalya web tasarım",
    "antalya site tasarım",
    "antalya dijital ajans",
    "antalya web sitesi yapma",
    "antalya kurumsal web sitesi",
    "antalya e-ticaret sitesi",
    "antalya video prodüksiyon",
    "antalya tanıtım filmi",
    "antalya drone çekimi",
    "antalya otomasyon",
    "antalya dijital reklamcılık",
    "antalya dijital reklam yönetimi",
    "antalya google ads yönetimi",
    "antalya sosyal medya yönetimi",
    "antalya seo hizmeti",
    "yapay zeka destekli web tasarım",
    "antalya yazılım şirketi",
  ],
  authors: [{ name: "Advert Dijital Ajans", url: "https://www.advert.com.tr" }],
  creator: "Advert",
  publisher: "Advert Dijital Ajans",
  metadataBase: new URL("https://www.advert.com.tr"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.advert.com.tr",
    siteName: "Advert",
    title: "Advert — Antalya Web Tasarım & Dijital Ajans",
    description: "Antalya merkezli yapay zeka destekli web tasarım, otomasyon, video prodüksiyon ve dijital reklamcılık çözümleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advert — Antalya Web Tasarım & Dijital Ajans",
    description: "Yapay zeka destekli web tasarım, otomasyon, video prodüksiyon ve dijital reklamcılık.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {},
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Advert Dijital Ajans",
  url: "https://www.advert.com.tr",
  logo: "https://www.advert.com.tr/favicon.ico",
  description: "Antalya merkezli yapay zeka destekli dijital ajans. Web tasarım, otomasyon, video prodüksiyon ve dijital reklamcılık hizmetleri.",
  address: { "@type": "PostalAddress", addressLocality: "Antalya", addressCountry: "TR" },
  areaServed: { "@type": "City", name: "Antalya" },
  serviceType: ["Web Tasarım", "Dijital Reklamcılık", "Video Prodüksiyon", "Otomasyon", "SEO"],
  sameAs: [
    "https://www.facebook.com/advert.com.tr",
    "https://www.instagram.com/advert.com.tr",
    "https://tiktok.com/@advert.com.tr",
    "https://www.linkedin.com/company/advertcomtr/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${jetbrainsMono.variable} dark antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
