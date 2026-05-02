import type { Metadata } from "next";
import { ProposalProvider } from "@/features/proposal/ProposalProvider";
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
      <body>
        <ProposalProvider>{children}</ProposalProvider>
      </body>
    </html>
  );
}
