"use client";

/* eslint-disable @next/next/no-img-element */

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { faqs, trucks, type Truck } from "@/data/landing";
import { TruckSelectionCard } from "@/components/TruckSelectionCard";

const asset = (name: string) => `/assets/figma/${name}`;

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

export function HeroSection() {
  const benefits = [
    ["benefit-sign.svg", "Assinatura", "mensal"],
    ["benefit-calendar.svg", "Planos", "de 36 ou 60 meses"],
    ["benefit-doc.svg", "Sem entrada", "e valor fixo mensal"],
    ["benefit-truck.svg", "Gestão", "completa da frota"],
  ] as const;

  return (
    <section id="top" className="hero-section" data-motion="fade">
      <div className="hero-surface-shell">
        <div className="hero-surface">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">ASSINATURA DE CAMINHÕES</p>
              <h1>
                <span className="hero-copy-line">Sua frota,</span>
                <span className="hero-copy-line">sem burocracia e</span>
                <span className="hero-copy-line accent-line">com tudo incluso</span>
              </h1>
              <p>
                Assine a frota ideal para o seu negócio e tenha mais controle, previsibilidade e
                eficiência na sua operação.
              </p>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-stage">
                <img className="hero-banner-image" src={asset("hero-banner-visual.png")} alt="" aria-hidden="true" />
                <div className="hero-badge hero-price-badge">
                  <span>Plano a partir</span>
                  <span>de R$5mil/mês*</span>
                </div>
                <div className="hero-badge hero-subscription-badge">
                  <img src={asset("hero-badge-subscription.svg")} alt="" aria-hidden="true" />
                  <span>Assinatura mensal</span>
                </div>
              </div>
            </div>
            <a
              href="#catalogo"
              className="hero-cta"
              data-motion="fade"
              aria-label="Ver todos os caminhões para assinatura"
            >
              <span className="hero-cta-label-full">Ver todos os caminhões para assinatura</span>
              <span className="hero-cta-label-short" aria-hidden="true">
                Ver caminhões
              </span>
            </a>
            <p className="hero-disclaimer">
              Valor referente a modelos de entrada, sujeito a disponibilidade, região e análise de crédito
            </p>
          </div>
        </div>
      </div>

      <div className="hero-benefits-bar">
        <div className="hero-benefits-inner">
          {benefits.map(([icon, title, copy]) => (
            <div className="hero-benefit" key={title} data-motion="card">
              <img src={asset(icon)} alt="" />
              <div>
                <strong>{title}</strong> <span>{copy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TruckCatalogueSection({
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
          <Link href="/caminhoes" className="catalog-all-models-card" data-motion="card">
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
    <article className={`benefits-card${item.cardClassName ? ` ${item.cardClassName}` : ""}`} data-motion="card">
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

export function OperationSection() {
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
    <section id="como-funciona" className="benefits-section" data-motion="section">
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

        <div className="benefits-footer" data-motion="section">
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

export function PlansSection() {
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
    <section id="proposta" className="plans-section page-band" data-motion="section">
      <div className="page-inner">
        <div className="comparison-layout">
          <div className="comparison-hero" data-motion="fade">
            <img src={asset("comparison-hero.jpg")} alt="Profissional Volkswagen ao lado da frota" />
          </div>

          <div className="comparison-content" data-motion="section">
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

export function AssistanceSection({ onOpenProposal }: { onOpenProposal: () => void }) {
  const paths: Array<{
    icon: string;
    title: string;
    copy: string;
    cta: string;
    href?: string;
    action?: "proposal";
    wide?: boolean;
  }> = [
    {
      icon: "icon-fleet-online.svg",
      title: "Simule sua frota online",
      copy: "Selecione os modelos e organize sua proposta de preview.",
      cta: "Ver caminhões disponíveis",
      href: "/caminhoes",
    },
    {
      icon: "icon-specialist.svg",
      title: "Fale com um especialista",
      copy: "Abra a prévia da proposta para entender como o fluxo será na versão final.",
      cta: "Abrir preview da proposta",
      action: "proposal",
    },
    {
      icon: "icon-dealer-pin.svg",
      title: "Ou visite uma concessionária",
      copy: "Atendimento presencial com a rede Volkswagen",
      cta: "Buscar uma concessionária",
      href: "#concessionarias",
      wide: true,
    },
  ] as const;

  return (
    <section className="assistance-section page-band soft" data-motion="section">
      <div className="page-inner assistance-grid">
        <div className="assistance-shell">
          <div className="assistance-panel">
            <div className="assistance-content">
              <div className="assistance-copy">
                <p className="eyebrow">Dê o próximo passo agora mesmo</p>
                <h2>
                  <span>Três formas de</span> montar a sua frota Volkswagen
                </h2>
                <p>
                  Você pode simular online, abrir a prévia da proposta ou visitar uma concessionária.
                  Escolha o caminho mais conveniente para sua operação.
                </p>
              </div>

              <div className="assistance-cards">
                {paths.map((path) => (
                  <article className={`assistance-card${path.wide ? " wide" : ""}`} key={path.title} data-motion="card">
                    <div className="assistance-card-copy">
                      <img src={asset(path.icon)} alt="" />
                      <h3>{path.title}</h3>
                      <p>{path.copy}</p>
                    </div>
                    {path.action === "proposal" ? (
                      <button type="button" className="outline-cta" onClick={onOpenProposal}>
                        {path.cta}
                      </button>
                    ) : path.href?.startsWith("/") ? (
                      <Link href={path.href} className="outline-cta">
                        {path.cta}
                      </Link>
                    ) : (
                      <a href={path.href ?? "#"} className="outline-cta">
                        {path.cta}
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="assistance-photo" data-motion="fade">
            <img src={asset("assistance-fleet.png")} alt="Atendimento Volkswagen Caminhões" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DealersSection() {
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
    { icon: "dealer-stat-pin.svg", title: "+100", copy: "concessionárias em todo o Brasil" },
    { icon: "dealer-stat-person.svg", title: "+3.000", copy: "profissionais especializados" },
    { icon: "dealer-stat-tools.svg", title: "+500", copy: "pontos de atendimento e serviços" },
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
    <section id="concessionarias" className="dealers-section page-band" data-motion="section">
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
          <aside className="dealer-search" aria-label="Busca demonstrativa de concessionária" data-motion="card">
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
                <button className="dealer-route" type="button">
                  Traçar rota
                </button>
                <button className="dealer-details" type="button">
                  Ver detalhes
                </button>
              </div>
            </article>
          </aside>
          <div className="map-panel" aria-label="Mapa ilustrativo de concessionárias" data-motion="fade">
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
              <div className={`dealer-stat ${item.brand ? "brand-stat" : ""}`} key={item.title} data-motion="card">
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
                  <img className={`trusted-company-logo ${company.className}`} src={company.asset} alt={company.name} />
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

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="faq-section" data-motion="section">
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
                  <span>
                    {index + 1}. {item.question}
                  </span>
                  <span className="accordion-icon" aria-hidden="true" />
                </button>
                <p id={answerId} className={isOpen ? "open" : ""}>
                  {item.answer}
                </p>
              </div>
            );
          })}
        </div>
        <span className="outline-cta centered static-link">Ver todas as perguntas frequentes (+50)</span>
      </div>
    </section>
  );
}
