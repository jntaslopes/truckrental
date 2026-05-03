export type TruckBadgeTone = "success" | "engine" | "electric" | "neutral";

export type TruckBadge = {
  label: string;
  icon?: string;
  tone: TruckBadgeTone;
};

export type TruckCatalogFamily =
  | "e-Delivery"
  | "Delivery"
  | "Constellation"
  | "Meteor"
  | "Vocacionais";

export type TruckCategory = "Leve" | "Médio" | "Pesado" | "Extrapesado" | "Vocacional";
export type TruckFuel = "Diesel" | "Elétrico";
export type TruckApplication = "Urbano" | "Rodoviário" | "Construção" | "Distribuição" | "Vocacional";
export type TruckTraction = "4x2" | "6x2" | "6x4" | "8x2" | "Sob medida";
export type TruckCapacityMetric = "CMT" | "PBTC" | "PBT";

export type TruckRecord = {
  id: string;
  slug: string;
  family: TruckCatalogFamily;
  model: string;
  category: TruckCategory;
  fuel: TruckFuel;
  application: TruckApplication;
  traction: TruckTraction;
  capacityTons: number;
  capacityMetric: TruckCapacityMetric;
  capacitySourceUrl: string;
  image: string;
  shadowImage?: string;
  badges: TruckBadge[];
  landingDetail: string;
};

export type CatalogTruck = Omit<TruckRecord, "landingDetail">;

export type LandingTruck = Pick<
  TruckRecord,
  "id" | "slug" | "family" | "model" | "image" | "shadowImage" | "badges"
> & {
  detail: string;
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

const boltBadge: TruckBadge = { label: "Entrega em até 7 dias", tone: "success" };
const manBadge: TruckBadge = { label: "Motor MAN D26", tone: "engine" };
const electricBadge: TruckBadge = { label: "Zero emissão local", tone: "electric" };
const customBadge: TruckBadge = { label: "Aplicação sob medida", tone: "neutral" };

const sources = {
  delivery11180: "https://vwco.com.br/caminhoes/Delivery/Delivery%2011.180?id=1&productid=24",
  eDelivery: "https://vwtbpress.vwco.com.br/press/e-delivery",
  fenatran2024: "https://vwtbpress.vwco.com.br/press/fenatran-2024",
  constellation20480:
    "https://vwtbpress.vwco.com.br/noticia/vwco-apresenta-condicoes-especiais-para-o-vw-constellation-20-480--4x2--e-25-480--6x2--neste-mes-de-agosto",
  novosCaminhoes: "https://vwtbpress.vwco.com.br/press/novos-caminhoes-vw",
};

const truckRecords: TruckRecord[] = [
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
    image: asset("truck-meteor-gray-trimmed.png"),
    badges: [boltBadge, manBadge],
    landingDetail:
      "Caminhão extrapesado indicado para operações rodoviárias com alta demanda de disponibilidade.",
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
    image: asset("truck-meteor-blue-trimmed.png"),
    badges: [manBadge],
    landingDetail:
      "Configuração robusta para rotas de longa distância, com previsibilidade de custo mensal.",
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
    shadowImage: asset("truck-constellation-shadow-transparent.png"),
    badges: [],
    landingDetail:
      "Modelo versátil para aplicações severas, transporte regional e operações com carga elevada.",
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
    shadowImage: asset("truck-edelivery-shadow-transparent.png"),
    badges: [boltBadge, electricBadge],
    landingDetail:
      "Caminhão elétrico para distribuição urbana com operação silenciosa e zero emissões locais.",
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
    shadowImage: asset("truck-edelivery-shadow-transparent.png"),
    badges: [electricBadge],
    landingDetail:
      "Versão elétrica compacta para distribuição urbana com entrega silenciosa e custos operacionais previsíveis.",
  },
  {
    id: "delivery-11180",
    slug: "delivery-11180",
    family: "Delivery",
    model: "11.180 4x2",
    category: "Leve",
    fuel: "Diesel",
    application: "Distribuição",
    traction: "4x2",
    capacityTons: 10.7,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.delivery11180,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow-transparent.png"),
    badges: [boltBadge],
    landingDetail:
      "Modelo leve para distribuição com foco em disponibilidade e previsibilidade no custo mensal.",
  },
  {
    id: "constellation-33260",
    slug: "constellation-33260",
    family: "Constellation",
    model: "33.260 8x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Construção",
    traction: "8x2",
    capacityTons: 33,
    capacityMetric: "PBT",
    capacitySourceUrl: sources.novosCaminhoes,
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow-transparent.png"),
    badges: [],
    landingDetail:
      "Versão pesada para construção e operações severas, com capacidade para aplicações exigentes.",
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
    image: asset("truck-meteor-gray-trimmed.png"),
    badges: [],
    landingDetail:
      "Alternativa rodoviária para operações que precisam combinar capacidade e versatilidade de configuração.",
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
    shadowImage: asset("truck-constellation-shadow-transparent.png"),
    badges: [],
    landingDetail:
      "Caminhão leve para operação urbana com foco em agilidade e custo operacional controlado.",
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
    image: asset("truck-constellation.png"),
    shadowImage: asset("truck-constellation-shadow-transparent.png"),
    badges: [boltBadge],
    landingDetail:
      "Modelo médio para distribuição com mais capacidade de carga e flexibilidade operacional.",
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
    shadowImage: asset("truck-constellation-shadow-transparent.png"),
    badges: [],
    landingDetail:
      "Solução rodoviária média para operações regionais com previsibilidade de custos e boa disponibilidade.",
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
    shadowImage: asset("truck-constellation-shadow-transparent.png"),
    badges: [],
    landingDetail:
      "Versão para construção com tração robusta e configuração alinhada a operações mais severas.",
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
    image: asset("truck-meteor-gray-trimmed.png"),
    badges: [],
    landingDetail:
      "Configuração para distribuição com bom equilíbrio entre capacidade e eficiência operacional.",
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
    image: asset("truck-meteor-blue-trimmed.png"),
    badges: [manBadge],
    landingDetail:
      "Opção rodoviária com motorização forte e foco em previsibilidade para frotas de maior porte.",
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
    image: asset("truck-meteor-blue-trimmed.png"),
    badges: [manBadge],
    landingDetail:
      "Modelo rodoviário para operação de longo curso com foco em disponibilidade e eficiência.",
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
    shadowImage: asset("truck-constellation-shadow-transparent.png"),
    badges: [customBadge],
    landingDetail:
      "Linha vocacional para aplicações sob medida com configuração alinhada a necessidades específicas.",
  },
];

export const catalogTrucks: CatalogTruck[] = truckRecords.map((truck) => ({
  id: truck.id,
  slug: truck.slug,
  family: truck.family,
  model: truck.model,
  category: truck.category,
  fuel: truck.fuel,
  application: truck.application,
  traction: truck.traction,
  capacityTons: truck.capacityTons,
  capacityMetric: truck.capacityMetric,
  capacitySourceUrl: truck.capacitySourceUrl,
  image: truck.image,
  shadowImage: truck.shadowImage,
  badges: truck.badges,
}));

const landingTruckIds = ["meteor-28480", "meteor-29530", "constellation-33480", "edelivery-14"] as const;
const truckRecordMap = new Map(truckRecords.map((truck) => [truck.id, truck]));

export const landingTrucks: LandingTruck[] = landingTruckIds.map((id) => {
  const truck = truckRecordMap.get(id);

  if (!truck) {
    throw new Error(`Landing truck '${id}' not found.`);
  }

  return {
    id: truck.id,
    slug: truck.slug,
    family: truck.family,
    model: truck.model,
    image: truck.image,
    shadowImage: truck.shadowImage,
    badges: truck.badges,
    detail: truck.landingDetail,
  };
});

const meteorSpecs: TruckDetailSpec[] = [
  { icon: asset("detail-icon-power.svg"), value: "480cv", label: "Potência" },
  { icon: asset("detail-icon-torque.svg"), value: "+2.400nm", label: "Torque" },
  { icon: asset("detail-icon-cmt.svg"), value: "28t", label: "CMT" },
  { icon: asset("detail-icon-traction.svg"), value: "6x2", label: "Tração" },
  { icon: asset("detail-icon-fuel.svg"), value: "Diesel", label: "Combustível" },
];

const meteorDetails = [
  "Motor MAN D26 de 13 litros de 530 cv e 2.600Nm de torque",
  "Transmissão automatizada de 12 velocidades com Predictive Shifting",
  "Cabine com suspensão pneumática",
  'Painel de instrumentos digital de 10"',
  'Central multimídia de 7"',
  "Banco do motorista Premium",
  "Geladeira",
  "Carregador de celular por indução",
  "Ar-condicionado digital e climatizador",
  "Basculamento elétrico",
  "Conectividade RIO Box",
];

const detailCtas: TruckDetailCta[] = [
  {
    icon: asset("detail-cta-cart.svg"),
    title: "Solicitar proposta com este modelo",
    copy: "Adicione este caminhão à sua frota e receba uma proposta personalizada.",
    cta: "Solicitar proposta",
    href: "#proposta",
  },
  {
    icon: asset("detail-cta-specialist.svg"),
    title: "Fale com um especialista",
    copy: "Nossa equipe ajuda você a avaliar este modelo para sua operação.",
    cta: "Falar com um especialista",
    href: "#proposta",
  },
  {
    icon: asset("detail-cta-dealer-pin.svg"),
    title: "Ver em uma concessionária",
    copy: "Encontre uma unidade próxima e conheça este modelo pessoalmente.",
    cta: "Encontrar concessionária",
    href: "",
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
    related: catalogTrucks.filter((item) => item.id !== truck.id),
  };
}

export const catalogFilterSections: CatalogFilterSection[] = [
  { title: "Tipo de veículo", key: "category", options: ["Leve", "Médio", "Pesado", "Extrapesado"] },
  { title: "Aplicação", key: "application", options: ["Rodoviário", "Urbano", "Construção", "Distribuição"] },
  { title: "Tração", key: "traction", options: ["4x2", "6x2", "6x4", "8x2"] },
  { title: "Combustível", key: "fuel", options: ["Diesel", "Elétrico"] },
];
