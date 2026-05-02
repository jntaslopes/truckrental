import { landingTrucks, type LandingTruck } from "@/data/trucks";

export type Truck = LandingTruck;

export type FaqItem = {
  question: string;
  answer: string;
};

export type NavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Monte sua Frota", href: "/caminhoes" },
  { label: "Como funciona", href: "/#como-funciona", disabled: true },
  { label: "Central de Ajuda", href: "/#faq", disabled: true },
];

export const trucks = landingTrucks;

export const faqs: FaqItem[] = [
  {
    question: "O que é o Volkswagen Truck Rental?",
    answer:
      "É uma solução de assinatura de caminhões Volkswagen para empresas que precisam ampliar ou renovar a frota com mensalidade previsível e serviços inclusos.",
  },
  {
    question: "O que está incluso na assinatura do(s) caminhão(ões)?",
    answer:
      "O contrato pode incluir documentação, taxas, manutenção preventiva, suporte operacional e gestão da frota, conforme o plano escolhido.",
  },
  {
    question: "Como funciona o plano de pagamento?",
    answer:
      "A proposta foi desenhada para reduzir desembolso inicial. As condições comerciais são confirmadas por um especialista depois da análise da operação.",
  },
  {
    question: "Posso trocar a frota durante a assinatura?",
    answer:
      "A troca depende do plano contratado, da disponibilidade do modelo e das regras comerciais vigentes no momento da solicitação.",
  },
  {
    question: "Posso cancelar antes do fim do contrato?",
    answer:
      "As regras de cancelamento dependem do contrato e das condições comerciais acordadas para a operação.",
  },
];

export const footerTruckLinks = [
  "Meteor Highline 28.480HD",
  "Meteor Highline 29.530",
  "Constellation 30.320 8x2",
  "Constellation 27.260 6x4",
  "Constellation 18.320 4x2",
  "Delivery 14.180",
  "Delivery 9.180",
  "Delivery 11.180",
];
