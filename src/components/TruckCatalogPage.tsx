"use client";

/* eslint-disable @next/next/no-img-element */

import { type ChangeEvent, useMemo, useState } from "react";
import Link from "next/link";
import { catalogFilterSections, catalogTrucks, type CatalogTruck } from "@/data/catalog";
import {
  Header,
  Footer,
  ProposalDrawer,
  ProposalSummary,
  type ProposalItem,
} from "@/components/LandingPage";

const asset = (name: string) => `/assets/figma/${name}`;

function toPositiveQuantity(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function CatalogFilterSidebar() {
  return (
    <aside className="catalog-sidebar" aria-label="Filtros de caminhões">
      <div className="catalog-filter-header">
        <h2>Filtros</h2>
        <button type="button">
          Limpar filtros
          <span aria-hidden="true">×</span>
        </button>
      </div>

      {catalogFilterSections.map((section) => (
        <section className="catalog-filter-section" key={section.title}>
          <h3>{section.title}</h3>
          {section.options.map((option) => (
            <label key={option}>
              <input className="ds-checkbox" type="checkbox" name={section.title} value={option} />
              <span>{option}</span>
            </label>
          ))}
        </section>
      ))}

      <section className="catalog-filter-section capacity">
        <h3>Capacidade (CMT)</h3>
        <div className="capacity-slider" aria-hidden="true">
          <span />
        </div>
        <div className="capacity-scale">
          <span>10 t</span>
          <span>80 t</span>
        </div>
      </section>
    </aside>
  );
}

function CatalogTruckCard({
  truck,
  selected,
  quantity,
  onToggle,
  onQuantityChange,
}: {
  truck: CatalogTruck;
  selected: boolean;
  quantity: number;
  onToggle: (truck: CatalogTruck) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}) {
  return (
    <article className={`catalog-truck-card ${selected ? "selected" : ""}`}>
      <button
        className="select-dot"
        type="button"
        onClick={() => onToggle(truck)}
        aria-label={selected ? `Remover ${truck.family} ${truck.model} da proposta` : `Adicionar ${truck.family} ${truck.model} à proposta`}
      />
      <div className="catalog-truck-media">
        {truck.shadowImage ? <img src={truck.shadowImage} alt="" className="catalog-truck-shadow" /> : null}
        <img src={truck.image} alt={`${truck.family} ${truck.model}`} className="catalog-truck-image" />
      </div>
      <div className="catalog-truck-content">
        <h3>{truck.family}</h3>
        <p>{truck.model}</p>
        <div className="badges" aria-label="Características">
          {truck.badges.map((badge) => (
            <span className={`badge ${badge.tone}`} key={badge.label}>
              {badge.tone === "success" ? <img src={asset("icon-bolt.svg")} alt="" /> : null}
              {badge.tone === "engine" ? <img src={asset("icon-engine.svg")} alt="" /> : null}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onQuantityChange(truck.id, toPositiveQuantity(event.target.value))
                }
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

export function TruckCatalogPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isProposalDrawerOpen, setIsProposalDrawerOpen] = useState(false);

  const selectedItems = useMemo<ProposalItem[]>(
    () =>
      catalogTrucks
        .filter((truck) => selectedIds.includes(truck.id))
        .map((truck) => ({
          id: truck.id,
          family: truck.family,
          model: truck.model,
          image: truck.image,
          quantity: quantities[truck.id] ?? 1,
        })),
    [quantities, selectedIds],
  );

  function toggleTruck(truck: CatalogTruck) {
    setSelectedIds((current) => {
      if (current.includes(truck.id)) {
        setQuantities((currentQuantities) => {
          const next = { ...currentQuantities };
          delete next[truck.id];
          return next;
        });
        return current.filter((id) => id !== truck.id);
      }

      setQuantities((currentQuantities) => ({
        ...currentQuantities,
        [truck.id]: currentQuantities[truck.id] ?? 1,
      }));
      return [...current, truck.id];
    });
  }

  function removeProposalItem(id: string) {
    if (selectedIds.length <= 1) {
      setIsProposalDrawerOpen(false);
    }
    setQuantities((currentQuantities) => {
      const next = { ...currentQuantities };
      delete next[id];
      return next;
    });
    setSelectedIds((current) => current.filter((currentId) => currentId !== id));
  }

  function changeProposalQuantity(id: string, quantity: number) {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [id]: quantity,
    }));
  }

  return (
    <>
      <Header proposalCount={selectedIds.length} activePath="/caminhoes" />
      <main className="catalog-page">
        <CatalogFilterSidebar />
        <section className="catalog-main">
          <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Página inicial</Link>
            <span aria-hidden="true">›</span>
            <span>Caminhões</span>
          </nav>
          <div className="catalog-heading">
            <h1>
              Explore os modelos <span>e monte sua frota</span>
            </h1>
            <p>Selecione diferentes caminhões e solicite uma proposta personalizada para sua operação.</p>
          </div>
          <div className="catalog-divider" />
          <p className="catalog-count">{catalogTrucks.length} modelos encontrados</p>
          <div className="catalog-grid">
            {catalogTrucks.map((truck) => (
              <CatalogTruckCard
                key={truck.id}
                truck={truck}
                selected={selectedIds.includes(truck.id)}
                quantity={quantities[truck.id] ?? 1}
                onToggle={toggleTruck}
                onQuantityChange={changeProposalQuantity}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Link href="/#faq" className="fab" aria-label="Abrir WhatsApp">
        <img src={asset("icon-whatsapp.svg")} alt="" />
      </Link>
      <ProposalSummary
        selectedItems={selectedItems}
        onClear={() => {
          setSelectedIds([]);
          setIsProposalDrawerOpen(false);
        }}
        onContinue={() => setIsProposalDrawerOpen(true)}
      />
      {isProposalDrawerOpen ? (
        <ProposalDrawer
          selectedItems={selectedItems}
          onClose={() => setIsProposalDrawerOpen(false)}
          onRemoveItem={removeProposalItem}
          onQuantityChange={changeProposalQuantity}
          onSubmit={() => setIsProposalDrawerOpen(false)}
        />
      ) : null}
    </>
  );
}
