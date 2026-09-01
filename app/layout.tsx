import type { Metadata } from "next";
import Script from "next/script";
import { Anek_Devanagari, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const anekDevanagari = Anek_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-anek-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blockdag.network"),
  title: "BlockDAG Technology | Explore Layer-1 Blockchain Architecture",
  description:
    "Explore BlockDAG technology, DAG architecture, Layer-1 infrastructure, Proof-of-Work, scalability and EVM-compatible development.",
  keywords: [
    "BlockDAG",
    "DAG architecture",
    "Layer-1 blockchain",
    "Proof-of-Work",
    "EVM development",
  ],
  openGraph: {
    title: "Explore the technology behind BlockDAG",
    description:
      "An information-first guide to BlockDAG architecture, consensus, scalability and developer resources.",
    url: "https://blockdag.network/technology-hub",
    siteName: "BlockDAG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore the technology behind BlockDAG",
    description:
      "An information-first guide to BlockDAG architecture, consensus, scalability and developer resources.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${anekDevanagari.variable}`}>
        {children}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
