"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  catalogFilterSections,
  catalogTrucks,
  type CatalogFilterKey,
  type CatalogTruck,
} from "@/data/catalog";
import {
  Header,
  Footer,
  ProposalDrawer,
  ProposalSummary,
  type ProposalItem,
} from "@/components/LandingPage";
import { TruckSelectionCard } from "@/components/TruckSelectionCard";

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

const applicationFilterOptions =
  catalogFilterSections.find((section) => section.key === "application")?.options ?? [];

function getFiltersFromApplication(application?: string): CatalogFilters {
  if (!application || !applicationFilterOptions.includes(application)) {
    return defaultFilters;
  }

  return { ...defaultFilters, application: [application] };
}

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
                className="ds-checkbox"
                type="checkbox"
                checked={filters[section.key].includes(option)}
                data-selection={filters[section.key].includes(option) ? "checked" : "unchecked"}
                data-state="default"
                data-size="sm"
                onKeyDown={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    onToggleOption(section.key, option);
                  }
                }}
                readOnly
              />
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

export function TruckCatalogPage({ initialApplication }: { initialApplication?: string }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isProposalDrawerOpen, setIsProposalDrawerOpen] = useState(false);
  const initialFilters = useMemo(() => getFiltersFromApplication(initialApplication), [initialApplication]);
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);

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
              <TruckSelectionCard
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
