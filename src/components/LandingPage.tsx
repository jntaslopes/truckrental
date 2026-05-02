"use client";

import { useMemo, useState } from "react";
import { ProposalDrawer } from "@/components/proposal/ProposalDrawer";
import { ProposalSummary } from "@/components/proposal/ProposalSummary";
import {
  AssistanceSection,
  DealersSection,
  FaqSection,
  HeroSection,
  OperationSection,
  PlansSection,
  TruckCatalogueSection,
} from "@/components/landing/LandingSections";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useProposal } from "@/features/proposal/ProposalProvider";
import { useMotionObserver } from "@/lib/useMotionObserver";

export function LandingPage() {
  useMotionObserver();

  const { selectedItems, setQuantity, toggleTruck } = useProposal();
  const [isProposalDrawerOpen, setIsProposalDrawerOpen] = useState(false);
  const selectedIds = useMemo(() => selectedItems.map((item) => item.id), [selectedItems]);
  const quantities = useMemo(
    () => Object.fromEntries(selectedItems.map((item) => [item.id, item.quantity])),
    [selectedItems],
  );

  return (
    <>
      <Header onOpenProposal={() => setIsProposalDrawerOpen(true)} />
      <main className="landing-page">
        <HeroSection />
        <TruckCatalogueSection
          selectedIds={selectedIds}
          quantities={quantities}
          onToggle={toggleTruck}
          onQuantityChange={setQuantity}
        />
        <OperationSection />
        <PlansSection />
        <AssistanceSection onOpenProposal={() => setIsProposalDrawerOpen(true)} />
        <DealersSection />
        <FaqSection />
      </main>
      <Footer />
      <ProposalSummary onContinue={() => setIsProposalDrawerOpen(true)} />
      <ProposalDrawer isOpen={isProposalDrawerOpen} onClose={() => setIsProposalDrawerOpen(false)} />
    </>
  );
}
