export type ProposalTruckInput = {
  id: string;
  slug: string;
  family: string;
  model: string;
  image: string;
  shadowImage?: string;
};

export type ProposalItem = ProposalTruckInput & {
  quantity: number;
};

export type ProposalContact = {
  name: string;
  email: string;
  phone: string;
  document: string;
  postalCode: string;
  contactPreference: "WhatsApp" | "E-mail" | "Telefone";
};

export type ProposalConsents = {
  marketing: boolean;
  legal: boolean;
};
