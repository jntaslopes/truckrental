import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VW Truck Rental",
  description:
    "Assinatura de caminhões Volkswagen com planos para empresas, gestão da frota e suporte especializado.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
