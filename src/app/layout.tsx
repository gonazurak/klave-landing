import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klave | La tesorería digital de tu empresa",
  description:
    "Cobrá identificado, pagá automatizado y conciliá con tu ERP desde una tesorería digital multi-banco.",
  openGraph: {
    title: "Klave | La tesorería digital de tu empresa",
    description:
      "Cobrá identificado, pagá automatizado y conciliá con tu ERP. Multi-banco.",
    siteName: "Klave",
    locale: "es_AR",
    type: "website",
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
