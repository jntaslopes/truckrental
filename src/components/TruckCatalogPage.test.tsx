import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TruckCatalogPage } from "@/components/TruckCatalogPage";
import { ProposalProvider } from "@/features/proposal/ProposalProvider";

describe("TruckCatalogPage", () => {
  it("applies the initial application filter using the unified catalog data", () => {
    render(
      <ProposalProvider>
        <TruckCatalogPage initialApplication="Rodoviário" />
      </ProposalProvider>,
    );

    expect(screen.getByText(/modelos encontrados/i)).toHaveTextContent("6 modelos encontrados");
    expect(screen.getByRole("heading", { name: /explore os modelos/i })).toBeInTheDocument();
  });
});
