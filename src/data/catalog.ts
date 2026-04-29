export type CatalogBadge = {
  label: string;
  tone: "success" | "engine" | "electric" | "neutral";
};

export type CatalogTruck = {
  id: string;
  slug: string;
  family: "e-Delivery" | "Delivery" | "Constellation" | "Meteor" | "Vocacionais";
  model: string;
  category: "Leve" | "Médio" | "Pesado" | "Extrapesado" | "Vocacional";
  fuel: "Diesel" | "Elétrico";
  application: "Urbano" | "Rodoviário" | "Construção" | "Distribuição" | "Vocacional";
  traction: "4x2" | "6x2" | "6x4" | "8x2" | "Sob medida";
  capacityTons: number;
  capacityMetric: "CMT" | "PBTC" | "PBT";
  capacitySourceUrl: string;
  image: string;
  shadowImage?: string;
  badges: CatalogBadge[];
};

export type CatalogFilterKey = "category" | "application" | "traction" | "fuel";

export type CatalogFilterSection = {
  title: string;
  key: CatalogFilterKey;
  options: string[];
};

export type TruckDetailSpec = {
  icon: string;
  value: string;
  label: string;
};

export type TruckDetailCta = {
  icon: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
};

export type TruckDetailComparisonItem = {
  icon: string;
  label: string;
};

export type TruckDetailData = CatalogTruck & {
  heroImage: string;
  heroShadowImage?: string;
  heroCopy: string;
  specs: TruckDetailSpec[];
  details: string[];
  gallery: {
    image: string;
    alt: string;
  }[];
  comparison: {
    subscription: TruckDetailComparisonItem[];
    financing: TruckDetailComparisonItem[];
  };
  ctas: TruckDetailCta[];
  related: CatalogTruck[];
};

const asset = (name: string) => `/assets/figma/${name}`;

const boltBadge: CatalogBadge = { label: "Entrega em até 7 dias", tone: "success" };
const manBadge: CatalogBadge = { label: "Motor MAN D26", tone: "engine" };
const electricBadge: CatalogBadge = { label: "Zero emissão local", tone: "electric" };
const customBadge: CatalogBadge = { label: "Aplicação sob medida", tone: "neutral" };

const sources = {
  delivery11180: "https://vwco.com.br/caminhoes/Delivery/Delivery%2011.180?id=1&productid=24",
  eDelivery: "https://vwtbpress.vwco.com.br/press/e-delivery",
  fenatran2024: "https://vwtbpress.vwco.com.br/press/fenatran-2024",
  constellation20480:
    "https://vwtbpress.vwco.com.br/noticia/vwco-apresenta-condicoes-especiais-para-o-vw-constellation-20-480--4x2--e-25-480--6x2--neste-mes-de-agosto",
  novosCaminhoes: "https://vwtbpress.vwco.com.br/press/novos-caminhoes-vw",
};

export const catalogTrucks: CatalogTruck[] = [
  {
    id: "meteor-28480",
    slug: "meteor-28480",
    family: "Meteor",
    model: "28.480HD 6x2 Highline",
    category: "Extrapesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "6x2",
    capacityTons: 58.5,
    capacityMetric: "PBTC",
    capacitySourceUrl: sources.fenatran2024,
    image: asset("truck-meteor-gray.png"),
    badges: [boltBadge, manBadge],
  },
  {
    id: "meteor-29530",
    slug: "meteor-29530",
    family: "Meteor",
    model: "29.530 6x4 Highline",
    category: "Extrapesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "6x4",
    capacityTons: 60,
    capacityMetric: "CMT",
    capacitySourceUrl: sources.fenatran2024,
    image: asset("truck-meteor-blue.png"),
    badges: [manBadge],
  },
  {
    id: "constellation-33480",
    slug: "constellation-33480",
    family: "Constellation",
    model: "33.480 6x4",
    category: "Extrapesado",
    fuel: "Diesel",
    application: "Construção",
    traction: "6x4",
    capacityTons: 42,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.novosCaminhoes,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow.png"),
    badges: [],
  },
  {
    id: "edelivery-14",
    slug: "edelivery-14",
    family: "e-Delivery",
    model: "14",
    category: "Leve",
    fuel: "Elétrico",
    application: "Urbano",
    traction: "6x2",
    capacityTons: 14.3,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.eDelivery,
    image: asset("truck-edelivery.png"),
    shadowImage: asset("truck-edelivery-shadow.png"),
    badges: [boltBadge, electricBadge],
  },
  {
    id: "edelivery-11",
    slug: "edelivery-11",
    family: "e-Delivery",
    model: "11 4x2",
    category: "Leve",
    fuel: "Elétrico",
    application: "Urbano",
    traction: "4x2",
    capacityTons: 10.7,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.eDelivery,
    image: asset("truck-edelivery.png"),
    shadowImage: asset("truck-edelivery-shadow.png"),
    badges: [electricBadge],
  },
  {
    id: "delivery-11180",
    slug: "delivery-11180",
    family: "Delivery",
    model: "11.180 4x4",
    category: "Leve",
    fuel: "Diesel",
    application: "Distribuição",
    traction: "4x2",
    capacityTons: 10.7,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.delivery11180,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow.png"),
    badges: [boltBadge],
  },
  {
    id: "constellation-33260",
    slug: "constellation-33260",
    family: "Constellation",
    model: "33.260 8x4",
    category: "Pesado",
    fuel: "Diesel",
    application: "Construção",
    traction: "8x2",
    capacityTons: 33,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.novosCaminhoes,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow.png"),
    badges: [],
  },
  {
    id: "constellation-30320",
    slug: "constellation-30320",
    family: "Constellation",
    model: "30.320 8x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "8x2",
    capacityTons: 30,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.novosCaminhoes,
    image: asset("truck-meteor-gray.png"),
    badges: [],
  },
  {
    id: "delivery-9180",
    slug: "delivery-9180",
    family: "Delivery",
    model: "9.180",
    category: "Leve",
    fuel: "Diesel",
    application: "Urbano",
    traction: "4x2",
    capacityTons: 10.7,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.delivery11180,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow.png"),
    badges: [],
  },
  {
    id: "delivery-14180",
    slug: "delivery-14180",
    family: "Delivery",
    model: "14.180",
    category: "Médio",
    fuel: "Diesel",
    application: "Distribuição",
    traction: "6x2",
    capacityTons: 14,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.delivery11180,
    image: asset("truck-edelivery.png"),
    shadowImage: asset("truck-edelivery-shadow.png"),
    badges: [boltBadge],
  },
  {
    id: "constellation-18320",
    slug: "constellation-18320",
    family: "Constellation",
    model: "18.320 4x2",
    category: "Médio",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "4x2",
    capacityTons: 18,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.novosCaminhoes,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow.png"),
    badges: [],
  },
  {
    id: "constellation-27260",
    slug: "constellation-27260",
    family: "Constellation",
    model: "27.260 6x4",
    category: "Pesado",
    fuel: "Diesel",
    application: "Construção",
    traction: "6x4",
    capacityTons: 27,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.novosCaminhoes,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow.png"),
    badges: [],
  },
  {
    id: "constellation-25320",
    slug: "constellation-25320",
    family: "Constellation",
    model: "25.320 6x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Distribuição",
    traction: "6x2",
    capacityTons: 25,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.novosCaminhoes,
    image: asset("truck-meteor-gray.png"),
    badges: [],
  },
  {
    id: "constellation-25480",
    slug: "constellation-25480",
    family: "Constellation",
    model: "25.480 6x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "6x2",
    capacityTons: 70,
    capacityMetric: "CMT",
    capacitySourceUrl: sources.constellation20480,
    image: asset("truck-meteor-blue.png"),
    badges: [manBadge],
  },
  {
    id: "constellation-20480",
    slug: "constellation-20480",
    family: "Constellation",
    model: "20.480 4x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "4x2",
    capacityTons: 60,
    capacityMetric: "CMT",
    capacitySourceUrl: sources.constellation20480,
    image: asset("truck-meteor-blue.png"),
    badges: [manBadge],
  },
  {
    id: "vocacionais-constructor",
    slug: "vocacionais-constructor",
    family: "Vocacionais",
    model: "Constructor",
    category: "Vocacional",
    fuel: "Diesel",
    application: "Vocacional",
    traction: "Sob medida",
    capacityTons: 42,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.novosCaminhoes,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow.png"),
    badges: [customBadge],
  },
];

const meteorSpecs: TruckDetailSpec[] = [
  { icon: asset("detail-icon-power.svg"), value: "480cv", label: "Potência" },
  { icon: asset("detail-icon-torque.svg"), value: "+2.400nm", label: "Torque" },
  { icon: asset("detail-icon-cmt.svg"), value: "28t", label: "CMT" },
  { icon: asset("detail-icon-traction.svg"), value: "6x2", label: "Tração" },
  { icon: asset("detail-icon-fuel.svg"), value: "Diesel", label: "Combustível" },
];

const meteorDetails = [
  "Motor MAN D26 de 13 litros de 530 cv e 2.600Nm de torque",
  "Transmissão automatizada de 12 Velocidades com Predictive Shifting",
  "Cabine com suspensão pneumática",
  "Painel de instrumentos digital de 10\"",
  "Central multimídia de 7\"",
  "Banco do motorista Premium",
  "Geladeira",
  "Carregador de celular por indução",
  "Ar-condicionado digital e Climatizador",
  "Basculamento elétrico",
  "Conectividade RIO Box",
];

const detailCtas: TruckDetailCta[] = [
  {
    icon: asset("detail-cta-cart.svg"),
    title: "Solicitar proposta com este modelo",
    copy: "Adicione este caminhão à sua frota e receba uma proposta personalizada",
    cta: "Solicitar proposta",
    href: "#proposta",
  },
  {
    icon: asset("detail-cta-specialist.svg"),
    title: "Fale com um especialista",
    copy: "Nossa equipe ajuda você a avaliar este modelo para sua operação",
    cta: "Falar com um especialista",
    href: "#proposta",
  },
  {
    icon: asset("detail-cta-dealer-pin.svg"),
    title: "Ver em uma concessionária",
    copy: "Encontre uma unidade próxima e conheça este modelo pessoalmente",
    cta: "Encontrar concessionária",
    href: "/#concessionarias",
  },
];

const comparison = {
  subscription: [
    { icon: asset("comparison-icon-zero.svg"), label: "Sem imobilizar capital" },
    { icon: asset("comparison-icon-cost.svg"), label: "Custos previsíveis ao longo do contrato" },
    { icon: asset("comparison-icon-shipment.svg"), label: "Gestão da frota terceirizada" },
    { icon: asset("comparison-icon-included.svg"), label: "Foco na operação, não na gestão" },
    { icon: asset("comparison-icon-truck.svg"), label: "Flexibilidade para ajustar a frota" },
  ],
  financing: [
    { icon: asset("comparison-icon-dollar.svg"), label: "Investimento inicial elevado" },
    { icon: asset("comparison-icon-laptop.svg"), label: "Custos operacionais não inclusos" },
    { icon: asset("comparison-icon-briefcase.svg"), label: "Gestão interna da frota" },
    { icon: asset("comparison-icon-monitor.svg"), label: "Maior esforço operacional" },
    { icon: asset("comparison-icon-script.svg"), label: "Menor flexibilidade contratual" },
  ],
};

export function getTruckDetailBySlug(slug: string): TruckDetailData | undefined {
  const truck = catalogTrucks.find((item) => item.slug === slug);

  if (!truck) {
    return undefined;
  }

  const title = `${truck.family} ${truck.model}`;
  const isMeteorReference = truck.id === "meteor-28480";
  const specs = meteorSpecs.map((spec) => {
    if (spec.label === "Tração") {
      return { ...spec, value: truck.traction };
    }

    if (spec.label === "Combustível") {
      return { ...spec, value: truck.fuel };
    }

    return spec;
  });

  return {
    ...truck,
    heroImage: isMeteorReference ? asset("detail-meteor-hero.png") : truck.image,
    heroShadowImage: isMeteorReference ? undefined : truck.shadowImage,
    heroCopy: isMeteorReference
      ? "O caminhão extrapesado ideal para operações rodoviárias de longa distância, com alta capacidade de carga, conforto e economia."
      : `${title} por assinatura para operações ${truck.application.toLowerCase()}, com previsibilidade de custos e suporte especializado.`,
    specs,
    details: meteorDetails,
    gallery: [
      { image: asset("detail-gallery-wheel.png"), alt: "Volante e painel digital do caminhão" },
      { image: asset("detail-gallery-cabin.png"), alt: "Cabine interna do caminhão" },
      { image: asset("detail-gallery-storage.png"), alt: "Compartimentos internos da cabine" },
    ],
    comparison,
    ctas: detailCtas,
    related: catalogTrucks.filter((item) => item.id !== truck.id).slice(0, 5),
  };
}

export const catalogFilterSections: CatalogFilterSection[] = [
  { title: "Tipo de veículo", key: "category", options: ["Leve", "Médio", "Pesado", "Extrapesado"] },
  { title: "Aplicação", key: "application", options: ["Rodoviário", "Urbano", "Construção", "Distribuição"] },
  { title: "Tração", key: "traction", options: ["4x2", "6x2", "6x4"] },
  { title: "Combustível", key: "fuel", options: ["Diesel", "Elétrico"] },
];
