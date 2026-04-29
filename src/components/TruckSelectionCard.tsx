"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

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
}: {
  truck: T;
  selected: boolean;
  quantity: number;
  onToggle: (truck: T) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}) {
  return (
    <article className={`catalog-truck-card ${selected ? "selected" : ""}`}>
      <div className="catalog-truck-media">
        <img src={truck.image} alt={`${truck.family} ${truck.model}`} className="catalog-truck-image" />
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
        <div className="badges" aria-label="Características">
          {truck.badges.map((badge) => (
            <span className={`badge ${badge.tone}`} key={badge.label}>
              <BadgeIcon badge={badge} />
              {badge.label}
            </span>
          ))}
        </div>
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
        ) : (
          <button className="text-link" type="button" onClick={() => onToggle(truck)}>
            Adicionar à proposta
            <img className="action-icon text-link-icon" src={asset("icon-add.svg")} alt="" />
          </button>
        )}
        <Link className="text-link" href={`/caminhoes/${truck.slug}`}>
          Ver detalhes
          <img className="action-icon text-link-icon" src={asset("icon-arrow-right.svg")} alt="" />
        </Link>
      </div>
    </article>
  );
}
