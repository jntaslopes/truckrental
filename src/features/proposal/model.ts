import type { ProposalItem, ProposalTruckInput } from "@/features/proposal/types";

export const proposalStorageKey = "truck-rental:proposal";

export function sanitizeProposalQuantity(value: number) {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.max(1, Math.floor(value));
}

export function addProposalTruck(items: ProposalItem[], truck: ProposalTruckInput) {
  if (items.some((item) => item.id === truck.id)) {
    return items;
  }

  return [...items, { ...truck, quantity: 1 }];
}

export function removeProposalTruck(items: ProposalItem[], id: string) {
  return items.filter((item) => item.id !== id);
}

export function setProposalTruckQuantity(items: ProposalItem[], id: string, quantity: number) {
  const nextQuantity = sanitizeProposalQuantity(quantity);
  return items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item));
}

export function toggleProposalTruck(items: ProposalItem[], truck: ProposalTruckInput) {
  return items.some((item) => item.id === truck.id)
    ? removeProposalTruck(items, truck.id)
    : addProposalTruck(items, truck);
}

export function serializeProposalItems(items: ProposalItem[]) {
  return JSON.stringify(items);
}

export function parseProposalItems(value: string | null | undefined) {
  if (!value) {
    return [] as ProposalItem[];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [] as ProposalItem[];
    }

    return parsed
      .filter((item): item is ProposalItem => {
        return (
          item &&
          typeof item.id === "string" &&
          typeof item.slug === "string" &&
          typeof item.family === "string" &&
          typeof item.model === "string" &&
          typeof item.image === "string"
        );
      })
      .map((item) => ({
        ...item,
        quantity: sanitizeProposalQuantity(item.quantity),
      }));
  } catch {
    return [] as ProposalItem[];
  }
}
