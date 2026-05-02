import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProposalProvider, useProposal } from "@/features/proposal/ProposalProvider";
import { proposalStorageKey } from "@/features/proposal/model";

const sampleTruck = {
  id: "meteor-29530",
  slug: "meteor-29530",
  family: "Meteor",
  model: "29.530 6x4 Highline",
  image: "/assets/figma/truck-meteor-blue-trimmed.png",
};

function ProposalConsumer() {
  const { addTruck, removeTruck, selectedItems, setQuantity } = useProposal();

  return (
    <div>
      <button type="button" onClick={() => addTruck(sampleTruck)}>
        Adicionar
      </button>
      <button type="button" onClick={() => setQuantity(sampleTruck.id, 4)}>
        Atualizar
      </button>
      <button type="button" onClick={() => removeTruck(sampleTruck.id)}>
        Remover
      </button>
      <output>{selectedItems.map((item) => `${item.id}:${item.quantity}`).join(",")}</output>
    </div>
  );
}

describe("ProposalProvider", () => {
  it("shares state between consumers and persists to localStorage", async () => {
    const user = userEvent.setup();

    render(
      <ProposalProvider>
        <ProposalConsumer />
        <ProposalConsumer />
      </ProposalProvider>,
    );

    await user.click(screen.getAllByRole("button", { name: "Adicionar" })[0]!);
    await user.click(screen.getAllByRole("button", { name: "Atualizar" })[1]!);

    expect(screen.getAllByText("meteor-29530:4")).toHaveLength(2);
    expect(window.localStorage.getItem(proposalStorageKey)).toContain('"quantity":4');
  });

  it("hydrates from localStorage on mount", async () => {
    window.localStorage.setItem(
      proposalStorageKey,
      JSON.stringify([{ ...sampleTruck, quantity: 2 }]),
    );

    render(
      <ProposalProvider>
        <ProposalConsumer />
      </ProposalProvider>,
    );

    expect(await screen.findByText("meteor-29530:2")).toBeInTheDocument();
  });
});
