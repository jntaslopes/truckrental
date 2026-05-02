"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  addProposalTruck,
  parseProposalItems,
  proposalStorageKey,
  removeProposalTruck,
  serializeProposalItems,
  setProposalTruckQuantity,
  toggleProposalTruck,
} from "@/features/proposal/model";
import type { ProposalItem, ProposalTruckInput } from "@/features/proposal/types";

type ProposalContextValue = {
  hydrated: boolean;
  selectedCount: number;
  selectedItems: ProposalItem[];
  clearProposal: () => void;
  addTruck: (truck: ProposalTruckInput) => void;
  removeTruck: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  toggleTruck: (truck: ProposalTruckInput) => void;
  isSelected: (id: string) => boolean;
};

const ProposalContext = createContext<ProposalContextValue | null>(null);

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<ProposalItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSelectedItems(parseProposalItems(window.localStorage.getItem(proposalStorageKey)));
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(proposalStorageKey, serializeProposalItems(selectedItems));
  }, [hydrated, selectedItems]);

  const clearProposal = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const addTruck = useCallback((truck: ProposalTruckInput) => {
    setSelectedItems((current) => addProposalTruck(current, truck));
  }, []);

  const removeTruck = useCallback((id: string) => {
    setSelectedItems((current) => removeProposalTruck(current, id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setSelectedItems((current) => setProposalTruckQuantity(current, id, quantity));
  }, []);

  const toggleTruck = useCallback((truck: ProposalTruckInput) => {
    setSelectedItems((current) => toggleProposalTruck(current, truck));
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedItems.some((item) => item.id === id),
    [selectedItems],
  );

  const value = useMemo<ProposalContextValue>(
    () => ({
      hydrated,
      selectedCount: selectedItems.length,
      selectedItems,
      clearProposal,
      addTruck,
      removeTruck,
      setQuantity,
      toggleTruck,
      isSelected,
    }),
    [addTruck, clearProposal, hydrated, isSelected, removeTruck, selectedItems, setQuantity, toggleTruck],
  );

  return <ProposalContext.Provider value={value}>{children}</ProposalContext.Provider>;
}

export function useProposal() {
  const context = useContext(ProposalContext);

  if (!context) {
    throw new Error("useProposal must be used within ProposalProvider.");
  }

  return context;
}
