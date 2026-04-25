export type TruckBadge = {
  label: string;
  icon?: string;
  tone: "success" | "engine";
};

export type Truck = {
  id: string;
  family: string;
  model: string;
  image: string;
  shadowImage?: string;
  badges: TruckBadge[];
  detail: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Caminhões por Assinatura", href: "#catalogo" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Central de Ajuda", href: "#faq" },
];

export const trucks: Truck[] = [
  {
    id: "meteor-28480",
    family: "Meteor",
    model: "28.480HD 6x2 Highline",
    image: "/assets/figma/truck-meteor-gray.png",
    badges: [
      {
        label: "Entrega em até 7 dias",
        icon: "/assets/figma/icon-bolt.svg",
        tone: "success",
      },
      {
        label: "Motor MAN D26",
        icon: "/assets/figma/icon-engine.svg",
        tone: "engine",
      },
    ],
    detail:
      "Caminhão extrapesado indicado para operações rodoviárias com alta demanda de disponibilidade.",
  },
  {
    id: "meteor-29530",
    family: "Meteor",
    model: "29.530 6x4 Highline",
    image: "/assets/figma/truck-meteor-blue.png",
    badges: [
      {
        label: "Motor MAN D26",
        icon: "/assets/figma/icon-engine.svg",
        tone: "engine",
      },
    ],
    detail:
      "Configuração robusta para rotas de longa distância, com previsibilidade de custo mensal.",
  },
  {
    id: "constellation-33480",
    family: "Constellation",
    model: "33.480 6x4",
    image: "/assets/figma/truck-constellation.png",
    shadowImage: "/assets/figma/truck-constellation-shadow.png",
    badges: [],
    detail:
      "Modelo versátil para aplicações severas, transporte regional e operações com carga elevada.",
  },
  {
    id: "edelivery-14",
    family: "e-Delivery",
    model: "14",
    image: "/assets/figma/truck-edelivery.png",
    shadowImage: "/assets/figma/truck-edelivery-shadow.png",
    badges: [
      {
        label: "Entrega em até 7 dias",
        icon: "/assets/figma/icon-bolt.svg",
        tone: "success",
      },
    ],
    detail:
      "Caminhão elétrico para distribuição urbana com operação silenciosa e zero emissões locais.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "O que é o VW Truck Rental?",
    answer:
      "É uma solução de assinatura de caminhões Volkswagen para empresas que precisam ampliar ou renovar a frota com mensalidade previsível e serviços inclusos.",
  },
  {
    question: "O que está incluso na assinatura do caminhão?",
    answer:
      "O contrato pode incluir documentação, taxas, manutenção preventiva, suporte operacional e gestão da frota, conforme o plano escolhido.",
  },
  {
    question: "Preciso dar entrada ou pagar taxa de adesão?",
    answer:
      "A proposta foi desenhada para reduzir desembolso inicial. As condições comerciais são confirmadas por um especialista depois da análise da operação.",
  },
  {
    question: "Posso trocar de caminhão durante o contrato?",
    answer:
      "A troca depende do plano contratado, disponibilidade do modelo e regras comerciais vigentes no momento da solicitação.",
  },
  {
    question: "Tem atendimento em todo o Brasil?",
    answer:
      "A Volkswagen Caminhões e Ônibus conta com uma rede nacional de concessionárias para apoiar contratação, entrega e suporte.",
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
  "Delivery 14.180",
];
