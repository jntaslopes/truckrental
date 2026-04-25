import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VW Truck Rental",
  description:
    "Assinatura de caminhões Volkswagen com planos para empresas, gestão da frota e suporte especializado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
