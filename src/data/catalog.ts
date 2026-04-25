export type CatalogBadge = {
  label: string;
  tone: "success" | "engine" | "electric" | "neutral";
};

export type CatalogTruck = {
  id: string;
  family: "e-Delivery" | "Delivery" | "Constellation" | "Meteor" | "Vocacionais";
  model: string;
  category: "Leve" | "Médio" | "Pesado" | "Extrapesado" | "Vocacional";
  fuel: "Diesel" | "Elétrico";
  application: "Urbano" | "Rodoviário" | "Construção" | "Distribuição" | "Vocacional";
  traction: "4x2" | "6x2" | "6x4" | "8x2" | "Sob medida";
  image: string;
  shadowImage?: string;
  badges: CatalogBadge[];
};

const boltBadge: CatalogBadge = { label: "Entrega em até 7 dias", tone: "success" };
const manBadge: CatalogBadge = { label: "Motor MAN D26", tone: "engine" };
const electricBadge: CatalogBadge = { label: "Zero emissão local", tone: "electric" };
const customBadge: CatalogBadge = { label: "Aplicação sob medida", tone: "neutral" };

export const catalogTrucks: CatalogTruck[] = [
  {
    id: "meteor-28480",
    family: "Meteor",
    model: "28.480HD 6x2 Highline",
    category: "Extrapesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "6x2",
    image: "/assets/figma/truck-meteor-gray.png",
    badges: [boltBadge, manBadge],
  },
  {
    id: "meteor-29530",
    family: "Meteor",
    model: "29.530 6x4 Highline",
    category: "Extrapesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "6x4",
    image: "/assets/figma/truck-meteor-blue.png",
    badges: [manBadge],
  },
  {
    id: "constellation-33480",
    family: "Constellation",
    model: "33.480 6x4",
    category: "Extrapesado",
    fuel: "Diesel",
    application: "Construção",
    traction: "6x4",
    image: "/assets/figma/truck-constellation.png",
    shadowImage: "/assets/figma/truck-constellation-shadow.png",
    badges: [],
  },
  {
    id: "edelivery-14",
    family: "e-Delivery",
    model: "14",
    category: "Leve",
    fuel: "Elétrico",
    application: "Urbano",
    traction: "6x2",
    image: "/assets/figma/truck-edelivery.png",
    shadowImage: "/assets/figma/truck-edelivery-shadow.png",
    badges: [boltBadge, electricBadge],
  },
  {
    id: "edelivery-11",
    family: "e-Delivery",
    model: "11 4x2",
    category: "Leve",
    fuel: "Elétrico",
    application: "Urbano",
    traction: "4x2",
    image: "/assets/figma/truck-edelivery.png",
    shadowImage: "/assets/figma/truck-edelivery-shadow.png",
    badges: [electricBadge],
  },
  {
    id: "delivery-11180",
    family: "Delivery",
    model: "11.180 4x4",
    category: "Leve",
    fuel: "Diesel",
    application: "Distribuição",
    traction: "4x2",
    image: "/assets/figma/truck-constellation.png",
    shadowImage: "/assets/figma/truck-constellation-shadow.png",
    badges: [boltBadge],
  },
  {
    id: "constellation-33260",
    family: "Constellation",
    model: "33.260 8x4",
    category: "Pesado",
    fuel: "Diesel",
    application: "Construção",
    traction: "8x2",
    image: "/assets/figma/truck-constellation.png",
    shadowImage: "/assets/figma/truck-constellation-shadow.png",
    badges: [],
  },
  {
    id: "constellation-30320",
    family: "Constellation",
    model: "30.320 8x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "8x2",
    image: "/assets/figma/truck-meteor-gray.png",
    badges: [],
  },
  {
    id: "delivery-9180",
    family: "Delivery",
    model: "9.180",
    category: "Leve",
    fuel: "Diesel",
    application: "Urbano",
    traction: "4x2",
    image: "/assets/figma/truck-constellation.png",
    shadowImage: "/assets/figma/truck-constellation-shadow.png",
    badges: [],
  },
  {
    id: "delivery-14180",
    family: "Delivery",
    model: "14.180",
    category: "Médio",
    fuel: "Diesel",
    application: "Distribuição",
    traction: "6x2",
    image: "/assets/figma/truck-edelivery.png",
    shadowImage: "/assets/figma/truck-edelivery-shadow.png",
    badges: [boltBadge],
  },
  {
    id: "constellation-18320",
    family: "Constellation",
    model: "18.320 4x2",
    category: "Médio",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "4x2",
    image: "/assets/figma/truck-constellation.png",
    shadowImage: "/assets/figma/truck-constellation-shadow.png",
    badges: [],
  },
  {
    id: "constellation-27260",
    family: "Constellation",
    model: "27.260 6x4",
    category: "Pesado",
    fuel: "Diesel",
    application: "Construção",
    traction: "6x4",
    image: "/assets/figma/truck-constellation.png",
    shadowImage: "/assets/figma/truck-constellation-shadow.png",
    badges: [],
  },
  {
    id: "constellation-25320",
    family: "Constellation",
    model: "25.320 6x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Distribuição",
    traction: "6x2",
    image: "/assets/figma/truck-meteor-gray.png",
    badges: [],
  },
  {
    id: "constellation-25480",
    family: "Constellation",
    model: "25.480 6x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "6x2",
    image: "/assets/figma/truck-meteor-blue.png",
    badges: [manBadge],
  },
  {
    id: "constellation-20480",
    family: "Constellation",
    model: "20.480 4x2",
    category: "Pesado",
    fuel: "Diesel",
    application: "Rodoviário",
    traction: "4x2",
    image: "/assets/figma/truck-meteor-blue.png",
    badges: [manBadge],
  },
  {
    id: "vocacionais-constructor",
    family: "Vocacionais",
    model: "Constructor",
    category: "Vocacional",
    fuel: "Diesel",
    application: "Vocacional",
    traction: "Sob medida",
    image: "/assets/figma/truck-constellation.png",
    shadowImage: "/assets/figma/truck-constellation-shadow.png",
    badges: [customBadge],
  },
];

export const catalogFilterSections = [
  { title: "Tipo de veículo", options: ["Leve", "Médio", "Pesado", "Extrapesado"] },
  { title: "Aplicação", options: ["Rodoviário", "Urbano", "Construção", "Distribuição"] },
  { title: "Tração", options: ["4x2", "6x2", "6x4"] },
  { title: "Combustível", options: ["Diesel", "Elétrico"] },
];
