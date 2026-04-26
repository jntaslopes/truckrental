"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  catalogFilterSections,
  catalogTrucks,
  type CatalogFilterKey,
  type CatalogTruck,
} from "@/data/catalog";
import { Header, Footer } from "@/components/LandingPage";

const asset = (name: string) => `/assets/figma/${name}`;
const defaultCapacityRange = { min: 10, max: 80 };

type CatalogFilters = Record<CatalogFilterKey, string[]> & {
  capacityMin: number;
  capacityMax: number;
};

const defaultFilters: CatalogFilters = {
  category: [],
  application: [],
  traction: [],
  fuel: [],
  capacityMin: defaultCapacityRange.min,
  capacityMax: defaultCapacityRange.max,
};

function hasActiveFilters(filters: CatalogFilters) {
  return (
    catalogFilterSections.some((section) => filters[section.key].length > 0) ||
    filters.capacityMin !== defaultCapacityRange.min ||
    filters.capacityMax !== defaultCapacityRange.max
  );
}

function matchesOptionFilter(truck: CatalogTruck, filters: CatalogFilters, key: CatalogFilterKey) {
  const selectedOptions = filters[key];
  return selectedOptions.length === 0 || selectedOptions.includes(String(truck[key]));
}

function clampCapacity(value: number) {
  if (!Number.isFinite(value)) {
    return defaultCapacityRange.min;
  }

  return Math.max(defaultCapacityRange.min, Math.min(defaultCapacityRange.max, value));
}

function CatalogFilterSidebar({
  filters,
  active,
  onToggleOption,
  onCapacityChange,
  onClear,
}: {
  filters: CatalogFilters;
  active: boolean;
  onToggleOption: (key: CatalogFilterKey, option: string) => void;
  onCapacityChange: (edge: "min" | "max", value: number) => void;
  onClear: () => void;
}) {
  return (
    <aside className="catalog-sidebar" aria-label="Filtros de caminhões">
      <div className="catalog-filter-header">
        <h2>Filtros</h2>
        {active ? (
          <button type="button" onClick={onClear}>
            Limpar filtros
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>

      {catalogFilterSections.map((section) => (
        <section className="catalog-filter-section" key={section.title}>
          <h3>{section.title}</h3>
          {section.options.map((option) => (
            <label
              key={option}
              onClick={(event) => {
                event.preventDefault();
                onToggleOption(section.key, option);
              }}
            >
              <input
                type="checkbox"
                checked={filters[section.key].includes(option)}
                onKeyDown={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    onToggleOption(section.key, option);
                  }
                }}
                readOnly
              />
              <span className="fake-checkbox" aria-hidden="true" />
              <span>{option}</span>
            </label>
          ))}
        </section>
      ))}

      <section className="catalog-filter-section capacity">
        <h3>Capacidade (CMT)</h3>
        <div className="capacity-slider">
          <div
            className="capacity-slider-track"
            style={{
              left: `${((filters.capacityMin - defaultCapacityRange.min) / (defaultCapacityRange.max - defaultCapacityRange.min)) * 100}%`,
              right: `${100 - ((filters.capacityMax - defaultCapacityRange.min) / (defaultCapacityRange.max - defaultCapacityRange.min)) * 100}%`,
            }}
          />
          <input
            aria-label="Capacidade mínima"
            type="range"
            min={defaultCapacityRange.min}
            max={defaultCapacityRange.max}
            step="1"
            value={filters.capacityMin}
            onChange={(event) => onCapacityChange("min", Number(event.target.value))}
          />
          <input
            aria-label="Capacidade máxima"
            type="range"
            min={defaultCapacityRange.min}
            max={defaultCapacityRange.max}
            step="1"
            value={filters.capacityMax}
            onChange={(event) => onCapacityChange("max", Number(event.target.value))}
          />
        </div>
        <div className="capacity-scale">
          <label>
            <input
              aria-label="Capacidade mínima em toneladas"
              type="number"
              min={defaultCapacityRange.min}
              max={filters.capacityMax}
              value={filters.capacityMin}
              onChange={(event) => onCapacityChange("min", Number(event.target.value))}
            />
            <span>t</span>
          </label>
          <label>
            <input
              aria-label="Capacidade máxima em toneladas"
              type="number"
              min={filters.capacityMin}
              max={defaultCapacityRange.max}
              value={filters.capacityMax}
              onChange={(event) => onCapacityChange("max", Number(event.target.value))}
            />
            <span>t</span>
          </label>
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
        <Link className="text-link" href={`/caminhoes/${truck.slug}`}>
          Ver detalhes
          <img src={asset("icon-arrow-right.svg")} alt="" />
        </Link>
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
  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters);

  const selectedTrucks = useMemo(
    () => catalogTrucks.filter((truck) => selectedIds.includes(truck.id)),
    [selectedIds],
  );

  const filtersActive = hasActiveFilters(filters);
  const filteredTrucks = useMemo(
    () =>
      catalogTrucks.filter(
        (truck) =>
          matchesOptionFilter(truck, filters, "category") &&
          matchesOptionFilter(truck, filters, "application") &&
          matchesOptionFilter(truck, filters, "traction") &&
          matchesOptionFilter(truck, filters, "fuel") &&
          truck.capacityTons >= filters.capacityMin &&
          truck.capacityTons <= filters.capacityMax,
      ),
    [filters],
  );

  function toggleTruck(truck: CatalogTruck) {
    setSelectedIds((current) =>
      current.includes(truck.id)
        ? current.filter((id) => id !== truck.id)
        : [...current, truck.id],
    );
  }

  function toggleFilterOption(key: CatalogFilterKey, option: string) {
    setFilters((current) => {
      const selectedOptions = current[key];
      const nextOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];

      return { ...current, [key]: nextOptions };
    });
  }

  function updateCapacityFilter(edge: "min" | "max", value: number) {
    setFilters((current) => {
      const nextValue = clampCapacity(value);

      if (edge === "min") {
        return { ...current, capacityMin: Math.min(nextValue, current.capacityMax) };
      }

      return { ...current, capacityMax: Math.max(nextValue, current.capacityMin) };
    });
  }

  return (
    <>
      <Header proposalCount={selectedIds.length} activePath="/caminhoes" />
      <main className="catalog-page">
        <CatalogFilterSidebar
          filters={filters}
          active={filtersActive}
          onToggleOption={toggleFilterOption}
          onCapacityChange={updateCapacityFilter}
          onClear={() => setFilters(defaultFilters)}
        />
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
          <p className="catalog-count">{filteredTrucks.length} modelos encontrados</p>
          <div className="catalog-grid">
            {filteredTrucks.map((truck) => (
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
      <Link href="/#faq" className="fab" aria-label="Abrir WhatsApp">
        <img src={asset("icon-whatsapp.svg")} alt="" />
      </Link>
      <CatalogProposalSummary selectedTrucks={selectedTrucks} onClear={() => setSelectedIds([])} />
    </>
  );
}
