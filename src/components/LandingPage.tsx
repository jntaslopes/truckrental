"use client";

/* eslint-disable @next/next/no-img-element */

import {
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  faqs,
  footerTruckLinks,
  navItems,
  trucks,
  type Truck,
} from "@/data/landing";
import { TruckImageStack } from "@/components/TruckImageStack";
import { TruckSelectionCard } from "@/components/TruckSelectionCard";

const asset = (name: string) => `/assets/figma/${name}`;

export type ProposalItem = {
  id: string;
  family: string;
  model: string;
  image: string;
  shadowImage?: string;
  quantity: number;
};

export function Header({
  proposalCount,
  activePath,
}: {
  proposalCount: number;
  activePath?: string;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          aria-label={"Encontrar uma Concession\u00E1ria"}
        >
          <img src={asset("icon-pin.svg")} alt="" />
          <span className="ghost-action-label ghost-action-label-full">
            {"Encontrar uma Concession\u00E1ria"}
          </span>
          <span className="ghost-action-label ghost-action-label-short">{"Concession\u00E1rias"}</span>
        </Link>
        <div className="cart-action" aria-label={`${proposalCount} itens na proposta`} role="img">
          <img src={asset("icon-cart.svg")} alt="" />
          <span>{proposalCount}</span>
        </div>
        <Link href="/#proposta" className="primary-action">
          Falar agora com um Especialista
        </Link>
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
          <aside
            id={mobileMenuId}
            className="mobile-menu-drawer"
            aria-label="Menu principal"
          >
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
                <span>{"Encontrar uma Concession\u00E1ria"}</span>
              </Link>
              <Link
                href="/#proposta"
                className="mobile-menu-primary-action"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Falar agora com um Especialista
              </Link>
            </div>
          </aside>
        </>
      ) : null}
    </header>
  );
}

function Hero() {
  const benefits = [
    ["benefit-sign.svg", "Assinatura", "mensal"],
    ["benefit-calendar.svg", "Planos", "de 36 ou 60 meses"],
    ["benefit-doc.svg", "Sem entrada", "e valor fixo mensal"],
    ["benefit-truck.svg", "Gest\u00E3o", "completa da frota"],
  ] as const;

  const visualLabels = [
    { text: ["Prote\u00E7\u00E3o e seguro"], className: "hero-label-protection" },
    { text: ["Documenta\u00E7\u00E3o", "Completa"], className: "hero-label-documentation" },
    { text: ["Assist\u00EAncia 24 horas", "em todo o Brasil"], className: "hero-label-support" },
    { text: ["Manuten\u00E7\u00E3o Preventiva"], className: "hero-label-maintenance" },
    { text: ["Mais previsibilidade", "para o seu neg\u00F3cio"], className: "hero-label-visibility" },
  ] as const;

  const visualIcons = [
    ["hero-icon-shield.svg", "hero-icon-frame-shield", "hero-icon-shield"],
    ["hero-icon-document.svg", "hero-icon-frame-document", "hero-icon-document"],
    ["hero-icon-support.svg", "hero-icon-frame-support", "hero-icon-support"],
    ["hero-icon-wrench.svg", "hero-icon-frame-wrench", "hero-icon-wrench"],
    ["hero-icon-data.svg", "hero-icon-frame-data", "hero-icon-data"],
  ] as const;

  return (
    <section id="top" className="hero-section">
      <div className="hero-surface-shell">
        <div className="hero-surface">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">{"ASSINATURA DE CAMINH\u00D5ES"}</p>
              <h1>
                <span className="hero-copy-line">Sua frota,</span>
                <span className="hero-copy-line">sem burocracia e</span>
                <span className="hero-copy-line accent-line">com tudo incluso</span>
              </h1>
              <p>
                {"Assine a frota ideal para o seu neg\u00F3cio e tenha mais controle,"}
                {" previsibilidade e efici\u00EAncia na sua opera\u00E7\u00E3o."}
              </p>
              <a href="#catalogo" className="hero-cta">
                {"Ver todos os caminh\u00F5es para assinatura"}
              </a>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-stage">
                <img className="hero-vectors" src={asset("hero-vectors.svg")} alt="" aria-hidden="true" />
                <div className="hero-trucks" aria-hidden="true">
                  <img className="hero-truck-small-shadow" src={asset("hero-truck-small-shadow.png")} alt="" />
                  <img className="hero-truck-large" src={asset("hero-truck-large.png")} alt="" />
                </div>
                <div className="hero-icons" aria-hidden="true">
                  {visualIcons.map(([icon, frameClassName, iconClassName]) => (
                    <div key={icon} className={`hero-visual-icon-frame ${frameClassName}`}>
                      <img
                        className={`hero-visual-icon ${iconClassName}`}
                        src={asset(icon)}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
                <div className="hero-badge">
                  <div className="hero-badge-icon" aria-hidden="true">
                    <img src={asset("hero-badge-money.svg")} alt="" />
                  </div>
                  <span>Assinatura mensal</span>
                </div>
                <div className="hero-visual-texts">
                  <div className="hero-visual-labels">
                    {visualLabels.map((label) => (
                      <div
                        key={`${label.className}-${label.text[0]}`}
                        className={`hero-visual-label ${label.className}`}
                      >
                        {label.text.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-benefits-bar">
        <div className="hero-benefits-inner">
          {benefits.map(([icon, title, copy]) => (
            <div className="hero-benefit" key={title}>
              <img src={asset(icon)} alt="" />
              <div>
                <strong>{title}</strong>{" "}
                <span>{copy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  light,
  className,
}: {
  eyebrow: string;
  title: string;
  light?: string;
  className?: string;
}) {
  return (
    <div className={`section-title${className ? ` ${className}` : ""}`}>
      <p>{eyebrow}</p>
      <h2>
        {title}
        {light ? <span> {light}</span> : null}
      </h2>
    </div>
  );
}

function TruckCatalogue({
  selectedIds,
  quantities,
  onToggle,
  onQuantityChange,
}: {
  selectedIds: string[];
  quantities: Record<string, number>;
  onToggle: (truck: Truck) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.location.hash === "#catalogo";
  });
  const operationCards = [
    {
      slug: "road",
      title: "Rodoviário",
      application: "Rodoviário",
      description: "Desempenho e eficiência para longas distâncias",
      image: "/assets/figma/catalog-banner-road.jpg",
    },
    {
      slug: "urban",
      title: "Urbano",
      application: "Urbano",
      description: "Agilidade e segurança para o dia a dia da cidade.",
      image: "/assets/figma/catalog-banner-urban-figma-362-1278.png",
    },
    {
      slug: "construction",
      title: "Construção",
      application: "Construção",
      description: "Robustez e força para os trabalhos mais exigentes.",
      image: "/assets/figma/catalog-banner-construction.jpg",
    },
    {
      slug: "distribution",
      title: "Distribuição",
      application: "Distribuição",
      description: "Versatilidade e economia para suas entregas.",
      image: "/assets/figma/catalog-banner-distribution.jpg",
    },
  ] as const;

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement || isRevealed) {
      return;
    }

    const revealIfVisible = () => {
      const rect = sectionElement.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08) {
        setIsRevealed(true);
        return true;
      }

      return false;
    };

    if (revealIfVisible()) {
      return;
    }

    const fallbackReveal = window.setTimeout(() => {
      revealIfVisible();
    }, 180);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        setIsRevealed(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.05,
      },
    );

    observer.observe(sectionElement);

    return () => {
      window.clearTimeout(fallbackReveal);
      observer.disconnect();
    };
  }, [isRevealed]);

  return (
    <section
      id="catalogo"
      ref={sectionRef}
      className={`catalogue-section page-band${isRevealed ? " catalogue-section-visible" : ""}`}
    >
      <div className="page-inner">
        <SectionTitle
          className="section-title-catalog catalogue-reveal catalogue-reveal-title"
          eyebrow="Caminhões disponíveis para assinatura"
          title="Explore os modelos"
          light="e solicite uma proposta"
        />
        <div className="catalog-operation-grid catalogue-reveal catalogue-reveal-operations">
          <article className="catalog-operation-intro">
            <h3>
              Caminhões para cada
              <span> tipo de operação</span>
            </h3>
            <p>Explore por tipo de uso e descubra os modelos ideais</p>
          </article>
          {operationCards.map((item) => (
            <Link
              className={`catalog-operation-card ${item.slug}`}
              href={`/caminhoes?application=${encodeURIComponent(item.application)}`}
              key={item.title}
            >
              <img src={item.image} alt="" className="catalog-operation-banner" />
              <div className="catalog-operation-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="truck-grid catalogue-reveal catalogue-reveal-grid">
          {trucks.map((truck) => (
            <TruckSelectionCard
              key={truck.id}
              truck={truck}
              selected={selectedIds.includes(truck.id)}
              quantity={quantities[truck.id] ?? 1}
              onToggle={onToggle}
              onQuantityChange={onQuantityChange}
            />
          ))}
          <Link href="/caminhoes" className="catalog-all-models-card">
            <span>
              <strong>Ver todos</strong> os
              <br />
              modelos
              <br />
              disponíveis
            </span>
            <img src={asset("catalog-all-models-arrow-72.svg")} alt="" />
          </Link>
        </div>
      </div>
    </section>
  );
}

type BenefitCard = {
  cardClassName?: string;
  icon: string;
  iconClassName?: string;
  titleClassName?: string;
  title: string;
  light?: string;
  copy: string;
};

function BenefitCard({ item }: { item: BenefitCard }) {
  return (
    <article className={`benefits-card${item.cardClassName ? ` ${item.cardClassName}` : ""}`}>
      <div className="benefits-card-icon-surface" aria-hidden="true">
        <img
          className={`benefits-card-icon${item.iconClassName ? ` ${item.iconClassName}` : ""}`}
          src={asset(item.icon)}
          alt=""
        />
      </div>
      <div className="benefits-card-copy">
        <h3 className={item.titleClassName}>
          <span className="benefits-card-title-strong">{item.title}</span>
          <span className="benefits-card-title-light">{item.light}</span>
        </h3>
        <p>{item.copy}</p>
      </div>
    </article>
  );
}

function OperationSection() {
  const leftBenefits: BenefitCard[] = [
    {
      icon: "benefits-icon-document.svg",
      title: "Custos",
      light: "centralizados",
      titleClassName: "benefits-card-title--inline",
      copy: "IPVA, documentação e serviços em uma única mensalidade",
    },
    {
      icon: "benefits-icon-shield.svg",
      iconClassName: "benefits-card-icon--compact",
      title: "Proteção",
      light: "completa da operação",
      titleClassName: "benefits-card-title--stacked",
      copy: "Seguro e cobertura para rodar com tranquilidade",
    },
    {
      icon: "benefits-icon-wrench.svg",
      iconClassName: "benefits-card-icon--compact",
      title: "Operação",
      light: "sem interrupções",
      titleClassName: "benefits-card-title--stacked",
      copy: "Manutenção preventiva e corretiva inclusas",
    },
  ];

  const rightBenefits: BenefitCard[] = [
    {
      icon: "benefits-icon-truck-check.svg",
      title: "Gestão simplificada",
      light: "da frota",
      titleClassName: "benefits-card-title--stacked",
      copy: "Menos burocracia e mais eficiência operacional",
    },
    {
      icon: "benefits-icon-data.svg",
      title: "Decisões",
      light: "baseadas em dados",
      titleClassName: "benefits-card-title--stacked",
      copy: "Telemetria para otimizar custos e performance",
    },
    {
      icon: "benefits-icon-support.svg",
      iconClassName: "benefits-card-icon--compact",
      title: "Suporte",
      light: "contínuo",
      titleClassName: "benefits-card-title--inline",
      copy: "Assistência 24h para manter sua operação rodando",
    },
  ];

  const includedHighlights = [
    ["comparison-icon-zero.svg", "Zero imobilização de capital"],
    ["benefits-icon-handshake.svg", "Sem preocupação com revenda"],
  ];

  return (
    <section id="como-funciona" className="benefits-section">
      <div className="benefits-inner">
        <div className="benefits-heading">
          <p>Tudo incluso para você não se preocupar</p>
          <h2>
            <span>Menos gestão de frota.</span> Mais foco na sua operação.
          </h2>
          <div className="benefits-heading-rule" />
          <p className="benefits-intro">
            Na assinatura do VW Truck | Rental, <strong>tudo o que você precisa já está incluso</strong> em uma única
            parcela previsível.
          </p>
        </div>

        <div className="benefits-layout">
          <div className="benefits-visual" aria-hidden="true">
            <div className="benefits-rings">
              <img className="benefits-ring benefits-ring-middle" src={asset("benefits-ellipse-middle.svg")} alt="" />
              <img className="benefits-ring benefits-ring-inner" src={asset("benefits-ellipse-inner.svg")} alt="" />
              <img className="benefits-ring benefits-ring-outer" src={asset("benefits-ellipse-outer.svg")} alt="" />
            </div>
            <img className="benefits-device-layer benefits-device-base" src={asset("benefits-device-base.png")} alt="" />
            <img className="benefits-device-layer benefits-device-overlay" src={asset("benefits-device-overlay.png")} alt="" />
          </div>

          <div className="benefits-card-grid">
            <div className="benefits-column">
              {leftBenefits.map((item) => (
                <BenefitCard key={item.title} item={item} />
              ))}
            </div>

            <div className="benefits-column">
              {rightBenefits.map((item) => (
                <BenefitCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="benefits-footer">
          <div className="benefits-footer-copy">
            <h3>
              Tudo incluso. <span>Um só contrato.</span>
            </h3>
            <p>Zero surpresas.</p>
          </div>

          <div className="benefits-footer-highlights">
            <div className="benefits-footer-divider" aria-hidden="true" />
            {includedHighlights.map(([icon, label]) => (
              <div className="benefits-footer-highlight" key={label}>
                <img src={asset(icon)} alt="" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <button className="outline-cta benefits-cta" type="button">
            Entender tudo que está incluso
          </button>
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  const subscriptionBenefits = [
    ["comparison-icon-zero.svg", "Sem imobilizar capital"],
    ["comparison-icon-cost.svg", "Custos previsíveis ao longo do contrato"],
    ["comparison-icon-shipment.svg", "Gestão da frota terceirizada"],
    ["comparison-icon-included.svg", "Foco na operação, não na gestão"],
    ["comparison-icon-truck.svg", "Flexibilidade para ajustar a frota"],
  ];
  const financingItems = [
    ["comparison-icon-dollar.svg", "Investimento inicial elevado"],
    ["comparison-icon-laptop.svg", "Custos operacionais não inclusos"],
    ["comparison-icon-briefcase.svg", "Gestão interna da frota"],
    ["comparison-icon-monitor.svg", "Maior esforço operacional"],
    ["comparison-icon-script.svg", "Menor flexibilidade contratual"],
  ];

  return (
    <section id="proposta" className="plans-section page-band">
      <div className="page-inner">
        <div className="comparison-layout">
          <div className="comparison-hero">
            <img src={asset("comparison-hero.jpg")} alt="Profissional Volkswagen ao lado da frota" />
          </div>

          <div className="comparison-content">
            <div className="comparison-heading">
              <h2>
                Assinatura <span>vs compra de frota</span>
              </h2>
              <p>Veja como cada modelo impacta seu custo mensal e total ao longo do contrato.</p>
            </div>

            <div className="comparison-grid-wrap">
              <div className="comparison-grid" aria-label="Comparativo entre assinatura e financiamento">
                <div className="comparison-feature comparison-feature-header comparison-feature-subscription">
                  <div className="comparison-feature-mark">
                    <img className="comparison-wordmark" src={asset("comparison-wordmark.png")} alt="VW Truck Rental" />
                  </div>
                  <div className="comparison-feature-copy">
                    <h3>
                      Frota por Assinatura
                      <img src={asset("comparison-icon-info.svg")} alt="" />
                    </h3>
                    <p>Gestão completa com previsibilidade de custos</p>
                  </div>
                </div>

                <div className="comparison-feature comparison-feature-header comparison-feature-financing">
                  <div className="comparison-feature-mark">
                    <img className="comparison-vw-badge" src={asset("comparison-vw-badge.png")} alt="" />
                  </div>
                  <div className="comparison-feature-copy">
                    <h3>
                      Financia<wbr />mento
                      <img src={asset("comparison-icon-info.svg")} alt="" />
                    </h3>
                    <p>Aquisição do ativo com gestão própria</p>
                  </div>
                </div>

                <div className="comparison-feature comparison-feature-list comparison-feature-subscription">
                  <h4>Assinatura</h4>
                  <ul>
                    {subscriptionBenefits.map(([icon, label]) => (
                      <li key={label}>
                        <img src={asset(icon)} alt="" />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="comparison-feature comparison-feature-list comparison-feature-financing">
                  <h4>Financiamento</h4>
                  <ul>
                    {financingItems.map(([icon, label]) => (
                      <li key={label}>
                        <img src={asset(icon)} alt="" />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="comparison-divider-axis" aria-hidden="true">
                <img src={asset("comparison-divider.svg")} alt="" />
              </div>

              <div className="comparison-vs" aria-hidden="true">
                <img className="comparison-vs-ring comparison-vs-ring-outer" src={asset("comparison-vs-outer.svg")} alt="" />
                <img className="comparison-vs-ring comparison-vs-ring-middle" src={asset("comparison-vs-middle.svg")} alt="" />
                <img className="comparison-vs-ring comparison-vs-ring-inner" src={asset("comparison-vs-inner.svg")} alt="" />
                <span className="comparison-vs-label">VS</span>
              </div>
            </div>

            <Link href="/caminhoes" className="outline-cta centered comparison-cta">
              Ver todos os caminhões disponíveis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
function AssistanceSection() {
  const paths = [
    {
      icon: "icon-fleet-online.svg",
      title: "Simule sua frota online",
      copy: "Selecione os modelos e receba uma proposta personalizada",
      cta: "Ver caminhões disponíveis",
      href: "/caminhoes",
    },
    {
      icon: "icon-specialist.svg",
      title: "Fale com um especialista",
      copy: "Nossa equipe ajuda a montar a melhor solução para sua operação",
      cta: "Falar com um especialista",
      href: "",
    },
    {
      icon: "icon-dealer-pin.svg",
      title: "Ou visite uma concessionária",
      copy: "Atendimento presencial com a rede Volkswagen",
      cta: "Buscar uma concessionária",
      href: "#concessionarias",
      wide: true,
    },
  ];

  return (
    <section className="assistance-section page-band soft">
      <div className="page-inner assistance-grid">
        <div className="assistance-shell">
          <div className="assistance-panel">
            <div className="assistance-content">
              <div className="assistance-copy">
                <p className="eyebrow">Dê o próximo passo agora mesmo</p>
                <h2>
                  <span>Três formas de</span>{" "}
                  montar a sua frota Volkswagen
                </h2>
                <p>
                  Você pode simular online, falar com um especialista ou visitar uma concessionária.
                  Escolha o caminho mais conveniente para sua operação.
                </p>
              </div>

              <div className="assistance-cards">
                {paths.map((path) => (
                  <article className={`assistance-card${path.wide ? " wide" : ""}`} key={path.title}>
                    <div className="assistance-card-copy">
                      <img src={asset(path.icon)} alt="" />
                      <h3>{path.title}</h3>
                      <p>{path.copy}</p>
                    </div>
                    {path.href.startsWith("/") ? (
                      <Link href={path.href} className="outline-cta">
                        {path.cta}
                      </Link>
                    ) : path.href ? (
                      <a href={path.href} className="outline-cta">
                        {path.cta}
                      </a>
                    ) : (
                      <button type="button" className="outline-cta">
                        {path.cta}
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="assistance-photo">
            <img src={asset("assistance-fleet.png")} alt="Atendimento Volkswagen Caminhões" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DealersSection() {
  const [dealerQuery, setDealerQuery] = useState("");

  const dealers = [
    {
      name: "Volkswagen Itaim Bibi",
      distance: "3km de você",
      address: "Av. Brig. Faria Lima, 3.173",
      city: "Itaim Bibi, São Paulo - SP",
      phone: "(11) 3047-7400",
      terms: ["são paulo", "sao paulo", "sp", "itaim", "itaim bibi", "faria lima", "04538", "cep"],
    },
    {
      name: "Volkswagen Vila Leopoldina",
      distance: "5km de você",
      address: "Av. Imperatriz Leopoldina, 950",
      city: "Vila Leopoldina, São Paulo - SP",
      phone: "(11) 3838-1200",
      terms: ["vila leopoldina", "leopoldina", "lapa", "alto de pinheiros", "05085"],
    },
    {
      name: "Volkswagen ABC",
      distance: "18km de você",
      address: "Av. Pereira Barreto, 1.600",
      city: "Santo André - SP",
      phone: "(11) 4433-2200",
      terms: ["santo andre", "santo andré", "abc", "são bernardo", "sao bernardo", "maua", "mauá"],
    },
  ];

  const normalizedDealerQuery = dealerQuery.trim().toLocaleLowerCase("pt-BR");
  const selectedDealer = normalizedDealerQuery
    ? dealers.find((dealer) => dealer.terms.some((term) => normalizedDealerQuery.includes(term))) ?? dealers[0]
    : dealers[0];

  const dealerStats = [
    {
      icon: "dealer-stat-pin.svg",
      title: "+100",
      copy: "concessionárias em todo o Brasil",
    },
    {
      icon: "dealer-stat-person.svg",
      title: "+3.000",
      copy: "profissionais especializados",
    },
    {
      icon: "dealer-stat-tools.svg",
      title: "+500",
      copy: "pontos de atendimento e serviços",
    },
    {
      icon: "dealer-stat-vw.svg",
      title: "Padrão Volkswagen",
      copy: "qualidade que você já conhece e confia",
      brand: true,
    },
  ];

  const trustedCompanies = useMemo(
    () => [
      { name: "Coca-Cola", className: "coca-cola", asset: asset("trusted-company-coca-cola.png"), x: 313.33, width: 109, height: 34, offsetTop: 3 },
      { name: "Raízen", className: "raizen", asset: asset("trusted-company-raizen.png"), x: 514.67, width: 83, height: 34, offsetTop: 3 },
      { name: "Ambev", className: "ambev", asset: asset("trusted-company-ambev.png"), x: 690, width: 104, height: 26, offsetTop: 7 },
      { name: "BRF", className: "brf", asset: asset("trusted-company-brf.png"), x: 886.33, width: 71, height: 34, offsetTop: 3 },
      { name: "Natura", className: "natura", asset: asset("trusted-company-natura.png"), x: 1049.67, width: 44, height: 33, offsetTop: 3.5 },
      { name: "Mercado Livre", className: "mercado-livre", asset: asset("trusted-company-mercado-livre.png"), x: 1186, width: 136, height: 34, offsetTop: 3 },
    ],
    [],
  );

  return (
    <section id="concessionarias" className="dealers-section page-band">
      <div className="page-inner">
        <div className="dealer-section-header">
          <p>Por todo o Brasil</p>
          <h2>
            <span>Uma rede pronta para atender seu negócio </span>
            <strong>em todo o Brasil</strong>
          </h2>
          <p className="dealer-section-copy">
            Conte com uma rede nacional pronta para apoiar sua operação, com atendimento especializado e suporte completo para sua frota.
          </p>
        </div>
        <div className="dealer-layout">
          <aside className="dealer-search" aria-label="Busca demonstrativa de concessionária">
            <h3>Encontre uma Concessionária</h3>
            <div className="dealer-controls">
              <label className="dealer-field" htmlFor="dealer-city">
                <img src={asset("dealer-icon-search.svg")} alt="" />
                <input
                  id="dealer-city"
                  value={dealerQuery}
                  onChange={(event) => setDealerQuery(event.target.value)}
                  placeholder="Digite o CEP, cidade, ou região"
                  aria-label="Digite o CEP, cidade, ou região"
                />
              </label>
              <button className="dealer-location" type="button" disabled>
                <img src={asset("dealer-icon-target.svg")} alt="" />
                Usar minha localização
              </button>

            </div>
            <div className="dealer-divider" />
            <p className="dealer-nearest-label">Concessionária mais próxima:</p>
            <article className="dealer-nearest-card">
              <div className="dealer-nearest-copy">
                <span className="dealer-distance">
                  <img src={asset("dealer-icon-target-small.svg")} alt="" />
                  {selectedDealer.distance}
                </span>
                <h4>{selectedDealer.name}</h4>
                <p>
                  {selectedDealer.address}
                  <br />
                  {selectedDealer.city}
                </p>
                <p>{selectedDealer.phone}</p>
              </div>
              <div className="dealer-card-actions">
                <button className="dealer-route" type="button">Traçar rota</button>
                <button className="dealer-details" type="button">Ver detalhes</button>
              </div>
            </article>
          </aside>
          <div className="map-panel" aria-label="Mapa ilustrativo de concessionárias">
            <img className="dealer-map-image" src={asset("dealer-map-figma.png")} alt="" aria-hidden="true" />
            <button className="map-card" type="button">
              Ver todas as concessionárias
            </button>
          </div>
        </div>
        <div className="dealer-stats-shell">
          <div className="dealer-section-divider" />
          <div className="dealer-stats">
            {dealerStats.map((item) => (
              <div className={`dealer-stat ${item.brand ? "brand-stat" : ""}`} key={item.title}>
                <img src={asset(item.icon)} alt="" />
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="trusted-companies-shell">
          <div className="dealer-section-divider" />
          <div className="trusted-companies" aria-label="Empresas que confiam na frota">
            <p>Junte-se a empresas que confiam na nossa frota</p>
            <ul className="trusted-companies-list">
              {trustedCompanies.map((company) => (
                <li
                  className={`trusted-company-item ${company.className}`}
                  key={company.name}
                  style={{
                    "--trusted-company-x": `${company.x}px`,
                    "--trusted-company-left": `${(company.x / 1322) * 100}%`,
                    "--trusted-company-width": `${company.width}px`,
                    "--trusted-company-height": `${company.height}px`,
                    "--trusted-company-offset-top": `${company.offsetTop}px`,
                  } as CSSProperties}
                >
                  <img
                    className={`trusted-company-logo ${company.className}`}
                    src={company.asset}
                    alt={company.name}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="dealer-section-divider" />
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-panel">
        <div className="faq-heading">
          <p>Respostas rápidas para seguir com mais clareza</p>
          <h2>
            Perguntas frequentes <span>sobre o VW Truck Rental</span>
          </h2>
          <div className="faq-heading-rule" />
        </div>
        <div className="accordion">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div className={`accordion-item ${isOpen ? "open" : ""}`} key={item.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span>{index + 1}. {item.question}</span>
                  <span className="accordion-icon" aria-hidden="true" />
                </button>
                <p id={answerId} className={isOpen ? "open" : ""}>{item.answer}</p>
              </div>
            );
          })}
        </div>
        <span className="outline-cta centered static-link">Ver todas as perguntas frequentes (+50)</span>
      </div>
    </section>
  );
}

function FooterColumn({
  title,
  links,
  twoColumns,
  disabledLinks,
  children,
}: {
  title: string;
  links: string[];
  twoColumns?: boolean;
  disabledLinks?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <div className={twoColumns ? "footer-list two-columns" : "footer-list"}>
        {links.map((link, index) => (
          disabledLinks ? (
            <span className="static-link" key={`${link}-${index}`}>{link}</span>
          ) : (
            <a href="#top" key={`${link}-${index}`}>{link}</a>
          )
        ))}
      </div>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="footer-logo" href="#top" aria-label="VW Truck Rental">
            <img src={asset("footer-logo-symbol-white.svg")} alt="" className="footer-logo-symbol" />
            <img src={asset("footer-logo-word-white.png")} alt="" className="footer-logo-word" />
          </a>
          <div className="social-links">
            <img src={asset("icon-facebook.svg")} alt="Facebook" />
            <img src={asset("icon-instagram.svg")} alt="Instagram" />
          </div>
        </div>
        <div className="footer-links">
          <FooterColumn
            title="VW Truck Rental"
            links={["O que é o VW Truck Rental", "Como Funciona", "Perguntas Frequentes"]}
            disabledLinks
          />
          <FooterColumn title="Caminhões por assinatura" links={footerTruckLinks} twoColumns />
          <FooterColumn title="Atendimento" links={["Central de Ajuda"]} disabledLinks>
            <span className="footer-button static-link">Falar com um especialista</span>
          </FooterColumn>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <span className="static-link">Aviso de Privacidade</span>
          <span className="static-link">Política de Cookies</span>
          <span className="static-link">Termos de Uso</span>
          <span className="static-link">Condições Legais</span>
        </div>
        <span>© Volkswagen Financial Services 2025</span>
      </div>
    </footer>
  );
}

export function ProposalSummary({
  selectedItems,
  onClear,
  onContinue,
}: {
  selectedItems: ProposalItem[];
  onClear: () => void;
  onContinue: () => void;
}) {
  if (selectedItems.length === 0) {
    return null;
  }

  const selectedLabel = selectedItems.length === 1 ? "1 modelo selecionado" : `${selectedItems.length} modelos selecionados`;
  const detailsLabel = selectedItems
    .map((truck) => `${truck.family} ${truck.model} (${truck.quantity})`)
    .join(", ");

  return (
    <aside className="proposal-summary" aria-live="polite">
      <div className="proposal-cart-badge" aria-hidden="true">
        <img src={asset("icon-cart.svg")} alt="" />
        <span>{selectedItems.length}</span>
      </div>
      <div className="proposal-summary-copy">
        <strong>{selectedLabel}</strong>
        <span>{detailsLabel}</span>
      </div>
      <div className="proposal-summary-actions">
        <button className="proposal-clear" type="button" onClick={onClear}>
          Remover tudo
        </button>
        <button className="proposal-continue" type="button" onClick={onContinue}>
          Continuar com a proposta
          <img className="action-icon button-icon" src={asset("icon-arrow-right.svg")} alt="" />
        </button>
      </div>
    </aside>
  );
}

export function ProposalDrawer({
  selectedItems,
  onClose,
  onRemoveItem,
  onQuantityChange,
}: {
  selectedItems: ProposalItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}) {
  const selectedLabel = selectedItems.length === 1 ? "1 modelo selecionado" : `${selectedItems.length} modelos selecionados`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleQuantityChange(id: string, event: ChangeEvent<HTMLInputElement>) {
    onQuantityChange(id, Math.max(1, Number(event.target.value) || 1));
  }

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;

    root.classList.add("proposal-drawer-open");
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      root.classList.remove("proposal-drawer-open");
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, []);

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="proposal-drawer-backdrop" role="presentation" onClick={onClose}>
      <form
        className="proposal-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-drawer-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="proposal-drawer-content">
          <header className="proposal-drawer-header">
            <div>
              <h2 id="proposal-drawer-title">Enviar solicitação de proposta</h2>
              <span aria-hidden="true" />
            </div>
            <button type="button" className="proposal-drawer-close" onClick={onClose} aria-label="Fechar solicitação">
              ×
            </button>
          </header>

          <p className="proposal-drawer-intro">
            Confirme e envie seus dados que entraremos em contato sobre a oferta
          </p>

          <section className="proposal-drawer-section">
            <h3>{selectedLabel}</h3>
            <div className="proposal-selected-list">
              {selectedItems.map((truck) => (
                <article className="proposal-selected-card" key={truck.id}>
                  <div className="proposal-selected-media">
                    <TruckImageStack
                      image={truck.image}
                      shadowImage={truck.shadowImage}
                      alt={`${truck.family} ${truck.model}`}
                      frontClassName="proposal-selected-image"
                      shadowClassName="proposal-selected-image"
                    />
                  </div>
                  <div className="proposal-selected-details">
                    <strong>{truck.family}</strong>
                    <span>{truck.model}</span>
                  </div>
                  <label className="floating-field proposal-quantity-field">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={truck.quantity}
                      placeholder=" "
                      aria-label={`Quantidade de ${truck.family} ${truck.model}`}
                      onChange={(event) => handleQuantityChange(truck.id, event)}
                    />
                    <span>Qtd.</span>
                  </label>
                  <button type="button" className="proposal-remove-item" onClick={() => onRemoveItem(truck.id)}>
                    <span className="proposal-remove-label">Remover</span>
                    <span className="proposal-remove-icon" aria-hidden="true">×</span>
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="proposal-drawer-section">
            <h3>Informações Gerais</h3>
            <div className="proposal-fields">
              <label className="floating-field">
                <input name="name" placeholder=" " autoComplete="name" />
                <span>Nome Completo / Razão Social</span>
              </label>
              <label className="floating-field">
                <input name="email" type="email" placeholder=" " autoComplete="email" />
                <span>E-mail</span>
              </label>
              <label className="floating-field">
                <input name="phone" type="tel" placeholder=" " autoComplete="tel" />
                <span>Telefone</span>
              </label>
              <label className="floating-field">
                <input name="document" placeholder=" " />
                <span>CPF/CNPJ</span>
              </label>
              <label className="floating-field">
                <input name="postalCode" placeholder=" " autoComplete="postal-code" />
                <span>CEP do seu endereço</span>
              </label>
              <label className="floating-field">
                <select name="contactPreference" defaultValue="">
                  <option value="" disabled hidden />
                  <option>Whatsapp</option>
                  <option>E-mail</option>
                  <option>Telefone</option>
                </select>
                <span>Preferência de contato</span>
              </label>
            </div>
          </section>
        </div>

        <div className="proposal-consents">
          <label>
            <input className="ds-checkbox" type="checkbox" name="marketing" data-state="default" data-size="sm" />
            <span>Autorizo a utilização dos meus dados para Marketing</span>
          </label>
          <label>
            <input className="ds-checkbox" type="checkbox" name="legal" data-state="default" data-size="sm" />
            <span>
              Li e concordo com as <a href="#top">Informações Legais</a> e com a <a href="#top">Política de Privacidade</a>
            </span>
          </label>
        </div>

        <footer className="proposal-drawer-footer">
          <button type="button" className="proposal-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="proposal-submit">
            Solicitar Proposta
            <img className="action-icon button-icon button-icon-on-dark" src={asset("icon-arrow-right.svg")} alt="" />
          </button>
        </footer>
      </form>
    </div>
  );
}

export function LandingPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isProposalDrawerOpen, setIsProposalDrawerOpen] = useState(false);

  const selectedItems = useMemo<ProposalItem[]>(
    () =>
      trucks
        .filter((truck) => selectedIds.includes(truck.id))
        .map((truck) => ({
          id: truck.id,
          family: truck.family,
          model: truck.model,
          image: truck.image,
          shadowImage: truck.shadowImage,
          quantity: quantities[truck.id] ?? 1,
        })),
    [quantities, selectedIds],
  );

  function toggleTruck(truck: Truck) {
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
      <Header proposalCount={selectedIds.length} />
      <main className="landing-page">
        <Hero />
        <TruckCatalogue
          selectedIds={selectedIds}
          quantities={quantities}
          onToggle={toggleTruck}
          onQuantityChange={changeProposalQuantity}
        />
        <OperationSection />
        <PlansSection />
        <AssistanceSection />
        <DealersSection />
        <FaqSection />
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
        />
      ) : null}
    </>
  );
}
