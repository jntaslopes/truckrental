"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { navItems } from "@/data/landing";
import { useProposal } from "@/features/proposal/ProposalProvider";

const asset = (name: string) => `/assets/figma/${name}`;

export function Header({
  activePath,
  onOpenProposal,
}: {
  activePath?: string;
  onOpenProposal?: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { selectedCount } = useProposal();
  const disableSectionLinks = Boolean(activePath);
  const disabledNavHrefs = new Set(["/#como-funciona", "/#faq"]);
  const mobileMenuId = "mobile-navigation-drawer";

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    const mediaQuery = window.matchMedia("(min-width: 641px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="VW Truck Rental">
        <img src={asset("logo-symbol-blue.svg")} alt="" className="brand-symbol" />
        <img src={asset("logo-word-blue.png")} alt="VW Truck Rental" className="brand-word" />
      </Link>

      <nav className="main-nav" aria-label="Navegação principal">
        {navItems.map((item) => {
          const isDisabled = disableSectionLinks && disabledNavHrefs.has(item.href);
          const className = [
            activePath === item.href ? "active" : "",
            isDisabled ? "nav-link-disabled" : "",
          ]
            .filter(Boolean)
            .join(" ") || undefined;

          if (isDisabled) {
            return (
              <span key={item.href} className={className} aria-disabled="true">
                {item.label}
              </span>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={className}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="header-actions">
        <Link
          href="/#concessionarias"
          className="ghost-action"
          aria-label="Encontrar uma concessionária"
        >
          <img src={asset("icon-pin.svg")} alt="" />
          <span className="ghost-action-label ghost-action-label-full">
            Encontrar uma concessionária
          </span>
          <span className="ghost-action-label ghost-action-label-short">Concessionárias</span>
        </Link>
        <div className="cart-action" aria-label={`${selectedCount} itens na proposta`} role="img">
          <img src={asset("icon-cart.svg")} alt="" />
          <span>{selectedCount}</span>
        </div>
        {selectedCount > 0 && onOpenProposal ? (
          <button type="button" className="primary-action" onClick={onOpenProposal}>
            Falar agora com um especialista
          </button>
        ) : (
          <Link href={activePath ? "/caminhoes" : "/#catalogo"} className="primary-action">
            Falar agora com um especialista
          </Link>
        )}
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-controls={mobileMenuId}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {isMobileMenuOpen ? (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Fechar menu"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside id={mobileMenuId} className="mobile-menu-drawer" aria-label="Menu principal">
            <div className="mobile-menu-drawer-header">
              <span>Menu</span>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label="Fechar menu"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>

            <nav className="mobile-menu-nav" aria-label="Navegação mobile">
              {navItems.map((item) => {
                const isDisabled = disableSectionLinks && disabledNavHrefs.has(item.href);
                const className = [
                  activePath === item.href ? "active" : "",
                  isDisabled ? "nav-link-disabled" : "",
                ]
                  .filter(Boolean)
                  .join(" ") || undefined;

                if (isDisabled) {
                  return (
                    <span key={item.href} className={className} aria-disabled="true">
                      {item.label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={className}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-menu-actions">
              <Link
                href="/#concessionarias"
                className="mobile-menu-ghost-action"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img src={asset("icon-pin.svg")} alt="" />
                <span>Encontrar uma concessionária</span>
              </Link>
              {selectedCount > 0 && onOpenProposal ? (
                <button
                  type="button"
                  className="mobile-menu-primary-action"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProposal();
                  }}
                >
                  Falar agora com um especialista
                </button>
              ) : (
                <Link
                  href={activePath ? "/caminhoes" : "/#catalogo"}
                  className="mobile-menu-primary-action"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Falar agora com um especialista
                </Link>
              )}
            </div>
          </aside>
        </>
      ) : null}
    </header>
  );
}
