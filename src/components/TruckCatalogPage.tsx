"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import { catalogFilterSections, catalogTrucks, type CatalogTruck } from "@/data/catalog";
import { Header, Footer } from "@/components/LandingPage";

const asset = (name: string) => `/assets/figma/${name}`;

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
              <span className="fake-checkbox" aria-hidden="true" />
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
  onToggle,
}: {
  truck: CatalogTruck;
  selected: boolean;
  onToggle: (truck: CatalogTruck) => void;
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
        <button className="text-link" type="button" onClick={() => onToggle(truck)}>
          {selected ? "Remover da proposta" : "Adicionar à proposta"}
          <img src={asset("icon-add.svg")} alt="" />
        </button>
        <button className="text-link" type="button">
          Ver detalhes
          <img src={asset("icon-arrow-right.svg")} alt="" />
        </button>
      </div>
    </article>
  );
}

function CatalogProposalSummary({
  selectedTrucks,
  onClear,
}: {
  selectedTrucks: CatalogTruck[];
  onClear: () => void;
}) {
  if (selectedTrucks.length === 0) {
    return null;
  }

  return (
    <aside className="proposal-summary" aria-live="polite">
      <img src={asset("icon-cart.svg")} alt="" />
      <div>
        <strong>{selectedTrucks.length} caminhão{selectedTrucks.length > 1 ? "s" : ""} na proposta</strong>
        <span>{selectedTrucks.map((truck) => `${truck.family} ${truck.model}`).join(", ")}</span>
      </div>
      <button type="button" onClick={onClear}>Limpar</button>
      <Link href="/#proposta">Falar com especialista</Link>
    </aside>
  );
}

export function TruckCatalogPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedTrucks = useMemo(
    () => catalogTrucks.filter((truck) => selectedIds.includes(truck.id)),
    [selectedIds],
  );

  function toggleTruck(truck: CatalogTruck) {
    setSelectedIds((current) =>
      current.includes(truck.id)
        ? current.filter((id) => id !== truck.id)
        : [...current, truck.id],
    );
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
                onToggle={toggleTruck}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Link href="/#faq" className="fab" aria-label="Abrir central de ajuda">
        ?
      </Link>
      <CatalogProposalSummary selectedTrucks={selectedTrucks} onClear={() => setSelectedIds([])} />
    </>
  );
}
