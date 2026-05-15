import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.klave.com.ar";
const siteName = "Klave";
const title = "Tesorería Digital";
const description =
  "Klave está en etapa pre-MVP: una lista de espera para validar software de tesorería digital, cobranza identificada, pagos y conciliación para empresas argentinas.";
const brandImage = "/brand/klave-logo-primary.png";
const iconImage = "/brand/klave-icon-dark.svg";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "Klave",
    "tesorería digital",
    "cobranza identificada",
    "conciliación bancaria",
    "empresas",
    "Argentina",
    "lista de espera",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: iconImage,
    shortcut: iconImage,
    apple: iconImage,
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: brandImage,
        width: 491,
        height: 158,
        alt: "Klave",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [brandImage],
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
  return (
    <html lang="es-AR" className={`${lexend.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
