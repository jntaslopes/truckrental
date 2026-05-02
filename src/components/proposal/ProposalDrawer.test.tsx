import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProposalDrawer } from "@/components/proposal/ProposalDrawer";
import { ProposalProvider, useProposal } from "@/features/proposal/ProposalProvider";

const sampleTruck = {
  id: "constellation-33480",
  slug: "constellation-33480",
  family: "Constellation",
  model: "33.480 6x4",
  image: "/assets/figma/truck-constellation.png",
  shadowImage: "/assets/figma/truck-constellation-shadow-transparent.png",
};

function SeedSelection() {
  const { addTruck } = useProposal();

  return (
    <button type="button" onClick={() => addTruck(sampleTruck)}>
      Seed
    </button>
  );
}

describe("ProposalDrawer", () => {
  it("shows the preview acknowledgement without external submission", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    render(
      <ProposalProvider>
        <SeedSelection />
        <ProposalDrawer isOpen onClose={vi.fn()} />
      </ProposalProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Seed" }));
    await user.type(screen.getByLabelText("Nome completo / Razão social"), "Transportes Beta");
    await user.click(screen.getByRole("button", { name: /solicitar proposta/i }));

    expect(await screen.findByText("Preview registrada localmente.")).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("keeps the preview explanatory copy visible", async () => {
    const user = userEvent.setup();

    render(
      <ProposalProvider>
        <SeedSelection />
        <ProposalDrawer isOpen onClose={vi.fn()} />
      </ProposalProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Seed" }));

    expect(
      screen.getByText(/nenhum envio real acontece nesta versão/i),
    ).toBeInTheDocument();
  });
});
