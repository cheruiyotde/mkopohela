import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "MkopoHela | Fast Digital Loans in Kenya",
    template: "%s | MkopoHela",
  },

  description:
    "MkopoHela offers fast, secure and flexible digital loans in Kenya. Apply online and receive instant approvals within minutes.",

  keywords: [
    "Loans Kenya",
    "Digital Loans",
    "MkopoHela",
    "Mobile Loans Kenya",
    "Online Loans",
    "Quick Loans",
    "Emergency Loans Kenya",
    "Loan App Kenya",
    "M-Pesa Loans",
  ],

  authors: [{ name: "MkopoHela" }],

  creator: "MkopoHela",

  metadataBase: new URL("https://mkopohela.co.ke"),

  openGraph: {
    title: "MkopoHela | Fast Digital Loans in Kenya",
    description:
      "Apply for secure digital loans online with instant approval in Kenya.",

    url: "https://mkopohela.co.ke",

    siteName: "MkopoHela",

    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "MkopoHela",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MkopoHela",
    description:
      "Fast and secure digital loans in Kenya.",
    images: ["/icon.png"],
  },

  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}