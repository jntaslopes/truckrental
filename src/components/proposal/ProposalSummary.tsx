"use client";

/* eslint-disable @next/next/no-img-element */

import { useProposal } from "@/features/proposal/ProposalProvider";

const asset = (name: string) => `/assets/figma/${name}`;

export function ProposalSummary({ onContinue }: { onContinue: () => void }) {
  const { selectedItems, clearProposal } = useProposal();

  if (selectedItems.length === 0) {
    return null;
  }

  const selectedLabel =
    selectedItems.length === 1 ? "1 modelo selecionado" : `${selectedItems.length} modelos selecionados`;
  const detailsLabel = selectedItems
    .map((truck) => `${truck.family} ${truck.model} (${truck.quantity})`)
    .join(", ");

  return (
    <aside className="proposal-summary" aria-live="polite">
      <div className="proposal-cart-badge" aria-hidden="true">
        <img src={asset("icon-cart.svg")} alt="" />
        <span>{selectedItems.length}</span>
      </div>
      <div className="proposal-summary-copy">
        <strong>{selectedLabel}</strong>
        <span>{detailsLabel}</span>
      </div>
      <div className="proposal-summary-actions">
        <button className="proposal-clear" type="button" onClick={clearProposal}>
          Remover tudo
        </button>
        <button className="proposal-continue" type="button" onClick={onContinue}>
          Continuar com a proposta
          <span className="action-icon button-icon arrow-icon" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
