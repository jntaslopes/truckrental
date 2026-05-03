"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { TruckImageStack } from "@/components/TruckImageStack";

const asset = (name: string) => `/assets/figma/${name}`;

type TruckCardBadge = {
  label: string;
  tone: "success" | "engine" | "electric" | "neutral";
  icon?: string;
};

export type SharedTruckCardData = {
  id: string;
  slug: string;
  family: string;
  model: string;
  image: string;
  shadowImage?: string;
  badges: TruckCardBadge[];
};

function toPositiveQuantity(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function BadgeIcon({ badge }: { badge: TruckCardBadge }) {
  if (badge.icon) {
    return <img src={badge.icon} alt="" />;
  }

  if (badge.tone === "success") {
    return <img src={asset("icon-bolt.svg")} alt="" />;
  }

  if (badge.tone === "engine") {
    return <img src={asset("icon-engine.svg")} alt="" />;
  }

  return null;
}

export function TruckSelectionCard<T extends SharedTruckCardData>({
  truck,
  selected,
  quantity,
  onToggle,
  onQuantityChange,
  variant = "catalog",
  showProposalAction = true,
}: {
  truck: T;
  selected: boolean;
  quantity: number;
  onToggle: (truck: T) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  variant?: "catalog" | "landing";
  showProposalAction?: boolean;
}) {
  const isLanding = variant === "landing";
  const isWithoutProposalAction = !showProposalAction;
  const visibleBadges = isLanding ? truck.badges.slice(0, 1) : truck.badges;

  return (
    <article
      className={`catalog-truck-card ${isLanding ? "landing-truck-card" : ""} ${isWithoutProposalAction ? "without-proposal-action" : ""} ${selected ? "selected" : ""}`}
      data-motion={isLanding ? "catalogue-card" : undefined}
    >
      <div className="catalog-truck-surface" aria-hidden="true" />
      <div className="catalog-truck-media">
        <TruckImageStack
          image={truck.image}
          shadowImage={truck.shadowImage}
          alt={`${truck.family} ${truck.model}`}
          frontClassName="catalog-truck-image"
          shadowClassName="catalog-truck-image"
        />
      </div>
      <div className="catalog-truck-content">
        <div className="card-truck-heading">
          <div className="card-truck-title">
            <h3>{truck.family}</h3>
            <p>{truck.model}</p>
          </div>
          <button
            className="select-dot"
            type="button"
            onClick={() => onToggle(truck)}
            aria-label={
              selected
                ? `Remover ${truck.family} ${truck.model} da proposta`
                : `Adicionar ${truck.family} ${truck.model} à proposta`
            }
          />
        </div>
        {!selected ? (
          <div
            className={`badges${visibleBadges.length === 0 ? " empty" : ""}`}
            aria-hidden={visibleBadges.length === 0 ? "true" : undefined}
            aria-label={visibleBadges.length > 0 ? "Características" : undefined}
          >
            {visibleBadges.map((badge) => (
              <span className={`badge ${badge.tone}`} key={badge.label}>
                <BadgeIcon badge={badge} />
                {badge.label}
              </span>
            ))}
          </div>
        ) : null}
        {selected ? (
          <div className="card-selection-row catalog-card-selection-row">
            <label className="floating-field card-quantity-field catalog-card-quantity-field">
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => onQuantityChange(truck.id, toPositiveQuantity(event.target.value))}
              />
              <span>Qtd.</span>
            </label>
            <span className="card-selection-divider" aria-hidden="true" />
            <button className="card-remove-link" type="button" onClick={() => onToggle(truck)}>
              <span className="card-remove-label">Remover</span>
              <span className="card-remove-icon" aria-hidden="true">×</span>
            </button>
          </div>
        ) : null}
        <Link className="text-link" href={`/caminhoes/${truck.slug}`}>
          Ver detalhes
          <span className="action-icon text-link-icon arrow-icon" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
