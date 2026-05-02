import { describe, expect, it } from "vitest";
import {
  addProposalTruck,
  parseProposalItems,
  sanitizeProposalQuantity,
  serializeProposalItems,
  setProposalTruckQuantity,
} from "@/features/proposal/model";
import type { ProposalItem, ProposalTruckInput } from "@/features/proposal/types";

const sampleTruck: ProposalTruckInput = {
  id: "meteor-28480",
  slug: "meteor-28480",
  family: "Meteor",
  model: "28.480HD 6x2 Highline",
  image: "/assets/figma/truck-meteor-gray-trimmed.png",
};

describe("proposal model", () => {
  it("sanitizes invalid quantities", () => {
    expect(sanitizeProposalQuantity(0)).toBe(1);
    expect(sanitizeProposalQuantity(-4)).toBe(1);
    expect(sanitizeProposalQuantity(2.8)).toBe(2);
  });

  it("serializes and parses selected items", () => {
    const items: ProposalItem[] = [{ ...sampleTruck, quantity: 3 }];
    const serialized = serializeProposalItems(items);

    expect(parseProposalItems(serialized)).toEqual(items);
    expect(parseProposalItems("invalid-json")).toEqual([]);
  });

  it("adds a truck once and updates quantity safely", () => {
    const added = addProposalTruck([], sampleTruck);
    const duplicated = addProposalTruck(added, sampleTruck);
    const updated = setProposalTruckQuantity(duplicated, sampleTruck.id, 0);

    expect(duplicated).toHaveLength(1);
    expect(updated[0]?.quantity).toBe(1);
  });

  it("ignores malformed persisted data", () => {
    expect(
      parseProposalItems(
        JSON.stringify([{ id: 1, family: "Meteor", model: "28.480HD", image: "/truck.png" }]),
      ),
    ).toEqual([]);
  });
});
