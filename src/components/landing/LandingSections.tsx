"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { faqs, trucks, type Truck } from "@/data/landing";
import { TruckSelectionCard } from "@/components/TruckSelectionCard";

const asset = (name: string) => `/assets/figma/${name}`;

type HeroSlide = {
  id: string;
  theme: "light" | "dark";
  variant: "current" | "background";
  backgroundImage?: string;
  compositeImage?: string;
  mobileImage?: string;
};

const heroSlides: HeroSlide[] = [
  { id: "fleet-subscription", theme: "light", variant: "current" },
  {
    id: "fixed-cost",
    theme: "dark",
    variant: "background",
    backgroundImage: asset("hero-banner-h2-bg.png"),
    compositeImage: asset("hero-banner-h2-composite-desktop.png"),
    mobileImage: asset("hero-banner-h2-mobile.png"),
  },
];

const trustedCompanies = [
  { name: "Coca-Cola", className: "coca-cola", asset: asset("trusted-company-coca-cola-540-12242.svg"), width: 104, height: 33 },
  { name: "Raízen", className: "raizen", asset: asset("trusted-company-raizen-540-12242.svg"), width: 84, height: 34 },
  { name: "Ambev", className: "ambev", asset: asset("trusted-company-ambev-540-12242.svg"), width: 82, height: 22 },
  {
    name: "BRF",
    className: "brf",
    width: 73,
    height: 36,
    parts: [
      { asset: asset("trusted-company-brf-part-b-540-12242.svg"), className: "brf-symbol" },
      { asset: asset("trusted-company-brf-part-a-540-12242.svg"), className: "brf-wordmark" },
    ],
  },
  { name: "Natura", className: "natura", asset: asset("trusted-company-natura-540-12242.svg"), width: 75, height: 58 },
  { name: "Mercado Livre", className: "mercado-livre", asset: asset("trusted-company-mercado-livre-540-12242.svg"), width: 116, height: 30 },
] as const;

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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = heroSlides[currentSlideIndex];
  const isBackgroundSlide = currentSlide.variant === "background";

  const benefits = [
    ["hero-benefit-refund.svg", "Assinatura", "Mensal"],
    ["hero-benefit-monthly.svg", "Planos", "de 18 a 60 meses"],
    ["hero-benefit-sign.svg", "Sem entrada", "e valor fixo mensal"],
    ["hero-benefit-shipment.svg", "Gestão", "completa da frota"],
  ] as const;

  const heroIcons = [
    ["hero-icon-dollar.svg", "hero-icon-overlay hero-icon-dollar"],
    ["hero-icon-zero-sign.svg", "hero-icon-overlay hero-icon-zero-sign"],
    ["hero-icon-shield-check.svg", "hero-icon-overlay hero-icon-shield-check"],
    ["hero-icon-calendar-cash.svg", "hero-icon-overlay hero-icon-calendar-cash"],
    ["hero-icon-baseline-chart.svg", "hero-icon-overlay hero-icon-baseline-chart"],
  ] as const;

  function showPreviousBanner() {
    setCurrentSlideIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length);
  }

  function showNextBanner() {
    setCurrentSlideIndex((index) => (index + 1) % heroSlides.length);
  }

  return (
    <section
      id="top"
      className={`hero-section hero-section-${currentSlide.variant} hero-section-theme-${currentSlide.theme}`}
      data-active-banner={currentSlide.id}
    >
      <div className="hero-surface-shell">
        <div className="hero-surface">
          <div className="hero-inner">
            {isBackgroundSlide ? (
              <div className="hero-background-scene" aria-hidden="true" data-node-id="544:20302">
                <img
                  className="hero-background-composite"
                  src={currentSlide.compositeImage ?? ""}
                  alt=""
                  aria-hidden="true"
                  data-node-id="544:20302"
                />
                <img
                  className="hero-background-mobile-image"
                  src={currentSlide.mobileImage ?? ""}
                  alt=""
                  aria-hidden="true"
                  data-node-id="595:1078"
                />
                <img
                  className="hero-background-image"
                  src={currentSlide.backgroundImage ?? ""}
                  alt=""
                  aria-hidden="true"
                  data-node-id="544:20304"
                />
                <div className="hero-background-cyan-tab" data-node-id="544:20305" />
                <div className="hero-background-copy-panel" data-node-id="544:20306" />
                <img
                  className="hero-background-shadow hero-background-shadow-wide"
                  src={asset("hero-banner-h2-shadow-wide.png")}
                  alt=""
                  aria-hidden="true"
                  data-node-id="544:20307"
                />
                <img
                  className="hero-background-shadow hero-background-shadow-tight"
                  src={asset("hero-banner-h2-shadow-tight.png")}
                  alt=""
                  aria-hidden="true"
                  data-node-id="544:20308"
                />
                <img
                  className="hero-background-montage"
                  src={asset("hero-banner-h2-montage.png")}
                  alt=""
                  aria-hidden="true"
                  data-node-id="544:20309"
                />
                <div className="hero-background-overlay" data-node-id="544:20324" />
              </div>
            ) : null}
            <div className="hero-copy">
              <p className="eyebrow">ALUGUEL DE CAMINHÕES</p>
              <h1>
                {isBackgroundSlide ? (
                  <>
                    <span className="hero-copy-line">Sua frota,</span>
                    <span className="hero-copy-line">sem burocracia</span>
                    <span className="hero-copy-line accent-line">e com tudo incluso</span>
                  </>
                ) : (
                  <>
                    <span className="hero-copy-line">Sua frota,</span>
                    <span className="hero-copy-line">sem burocracia e</span>
                    <span className="hero-copy-line accent-line">com tudo incluso</span>
                  </>
                )}
              </h1>
              {!isBackgroundSlide ? (
                <p>
                  Assine a frota ideal para o seu negócio e tenha mais controle, previsibilidade e
                  eficiência na sua operação.
                </p>
              ) : null}
            </div>

            {!isBackgroundSlide ? (
              <div className="hero-visual">
              <div className="hero-visual-stage">
                <img className="hero-banner-image" src={asset("hero-banner-vectors-v2.png")} alt="" aria-hidden="true" />
                {heroIcons.map(([icon, className]) => (
                  <img key={icon} className={className} src={asset(icon)} alt="" aria-hidden="true" />
                ))}
                <div className="hero-badge hero-fixed-cost-badge" data-node-id="540:8951">
                  <span>Custo</span>
                  <span>Fixo</span>
                  <span>Mensal</span>
                </div>
                <div className="hero-badge hero-flex-plan-badge" data-node-id="540:8947">
                  <span>Planos</span>
                  <span>flexíveis</span>
                  <span>para o seu</span>
                  <span>negócios</span>
                </div>
              </div>
              </div>
            ) : (
              <div className="hero-price-badges" data-node-id="544:20328">
                <div className="hero-h2-fixed-cost-badge" data-node-id="544:20330">
                  <span>Custo</span>
                  <span>Fixo</span>
                  <span>Mensal</span>
                </div>
                <div className="hero-h2-plan-badge" data-node-id="544:20331">
                  <div className="hero-h2-plan-copy" data-node-id="544:20334">
                    <div className="hero-h2-plan-label" data-node-id="544:20335">
                      <span>Planos</span>
                      <span>à partir de</span>
                    </div>
                    <div className="hero-h2-plan-price" data-node-id="544:20336">
                      <strong>R$5</strong>
                      <span>mil/mês</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <a
              href="#catalogo"
              className="hero-cta"
              aria-label="Ver caminhões disponíveis"
            >
              <span className="hero-cta-label-full">Ver Caminhões Disponíveis</span>
              <span className="hero-cta-label-short" aria-hidden="true">
                Ver caminhões
              </span>
              <span className="hero-cta-arrow" aria-hidden="true" />
            </a>
            <div className="hero-banner-control" aria-label="Controle do banner" data-node-id="540:9075">
              <button type="button" aria-label="Banner anterior" onClick={showPreviousBanner}>
                <span aria-hidden="true" />
              </button>
              <button type="button" aria-label="Próximo banner" onClick={showNextBanner}>
                <span aria-hidden="true" />
              </button>
            </div>
            <div className="hero-corner-shape" aria-hidden="true" data-node-id="540:9074" />
          </div>
        </div>
      </div>
      <div className="hero-benefits-bar">
        <div className="hero-benefits-inner">
          <div className="hero-benefits-brand" data-motion="card">
            <p>VW Truck | Rental</p>
            <h2>
              <strong>Aluguel de frota</strong>
              <span>descomplicado</span>
            </h2>
          </div>
          {benefits.map(([icon, title, copy]) => (
            <div className="hero-benefit" key={title} data-motion="card">
              <img src={asset(icon)} alt="" aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <span>{copy}</span>
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
  const truckRowRef = useRef<HTMLDivElement | null>(null);
  const operationCarouselRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const operationCards = [
    {
      slug: "road",
      title: "Rodoviário",
      application: "Rodoviário",
      description: "Desempenho e eficiência para longas distâncias",
      image: "/assets/figma/catalog-operation-road-figma.png",
    },
    {
      slug: "urban",
      title: "Urbano",
      application: "Urbano",
      description: "Agilidade e segurança para o dia a dia da cidade.",
      image: "/assets/figma/catalog-operation-urban-figma.png",
    },
    {
      slug: "construction",
      title: "Construção",
      application: "Construção",
      description: "Robustez e força para os trabalhos mais exigentes.",
      image: "/assets/figma/catalog-operation-construction-figma.png",
    },
    {
      slug: "distribution",
      title: "Distribuição",
      application: "Distribuição",
      description: "Versatilidade e economia para suas entregas.",
      image: "/assets/figma/catalog-operation-distribution-figma.png",
    },
  ] as const;

  useEffect(() => {
    const bindDragScroll = (scroller: HTMLDivElement | null) => {
      if (!scroller) {
        return undefined;
      }

      let pointerId: number | null = null;
      let startX = 0;
      let startY = 0;
      let startScrollLeft = 0;
      let didDrag = false;
      let isMouseDown = false;
      let suppressClick = false;
      let suppressClickTimeout: number | undefined;
      const supportsPointerEvents = "PointerEvent" in window;
      const interactiveSelector = "a, button, input, label, select, textarea";

      const clearSuppressClickTimeout = () => {
        if (suppressClickTimeout !== undefined) {
          window.clearTimeout(suppressClickTimeout);
          suppressClickTimeout = undefined;
        }
      };

      const isInteractiveTarget = (target: EventTarget | null) =>
        target instanceof Element && target.closest(interactiveSelector) !== null;

      const snapToNearestItem = () => {
        const currentScrollLeft = scroller.scrollLeft;
        const scrollerLeft = scroller.getBoundingClientRect().left;
        const items = Array.from(scroller.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement,
        );

        if (!items.length) {
          return;
        }

        const nearestScrollLeft = items.reduce((nearest, item) => {
          const itemScrollLeft =
            item.getBoundingClientRect().left - scrollerLeft + currentScrollLeft;

          if (Math.abs(itemScrollLeft - currentScrollLeft) < Math.abs(nearest - currentScrollLeft)) {
            return itemScrollLeft;
          }

          return nearest;
        }, 0);

        scroller.scrollTo({ left: nearestScrollLeft, behavior: "auto" });
      };

      const endDrag = (event: PointerEvent) => {
        if (pointerId !== event.pointerId) {
          return;
        }

        if (scroller.hasPointerCapture(event.pointerId)) {
          scroller.releasePointerCapture(event.pointerId);
        }

        pointerId = null;

        if (didDrag) {
          snapToNearestItem();
          clearSuppressClickTimeout();
          suppressClickTimeout = window.setTimeout(() => {
            suppressClick = false;
            suppressClickTimeout = undefined;
          }, 120);
        }

        scroller.classList.remove("is-pointer-down", "is-dragging");
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0 || isInteractiveTarget(event.target)) {
          return;
        }

        if (scroller.scrollWidth <= scroller.clientWidth) {
          return;
        }

        clearSuppressClickTimeout();
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        startScrollLeft = scroller.scrollLeft;
        didDrag = false;
        suppressClick = false;
        scroller.classList.add("is-pointer-down");
        event.preventDefault();
        scroller.setPointerCapture(event.pointerId);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (pointerId !== event.pointerId) {
          return;
        }

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        if (!didDrag && Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
          didDrag = true;
          suppressClick = true;
          scroller.classList.add("is-dragging");
        }

        if (!didDrag) {
          return;
        }

        event.preventDefault();
        scroller.scrollLeft = startScrollLeft - deltaX;
      };

      const endMouseDrag = () => {
        if (!isMouseDown) {
          return;
        }

        isMouseDown = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (didDrag) {
          snapToNearestItem();
          clearSuppressClickTimeout();
          suppressClickTimeout = window.setTimeout(() => {
            suppressClick = false;
            suppressClickTimeout = undefined;
          }, 120);
        }

        scroller.classList.remove("is-pointer-down", "is-dragging");
      };

      const onMouseMove = (event: MouseEvent) => {
        if (!isMouseDown) {
          return;
        }

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        if (!didDrag && Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
          didDrag = true;
          suppressClick = true;
          scroller.classList.add("is-dragging");
        }

        if (!didDrag) {
          return;
        }

        event.preventDefault();
        scroller.scrollLeft = startScrollLeft - deltaX;
      };

      const onMouseUp = () => {
        endMouseDrag();
      };

      const onMouseDown = (event: MouseEvent) => {
        if (supportsPointerEvents || event.button !== 0 || pointerId !== null || isInteractiveTarget(event.target)) {
          return;
        }

        if (scroller.scrollWidth <= scroller.clientWidth) {
          return;
        }

        clearSuppressClickTimeout();
        isMouseDown = true;
        startX = event.clientX;
        startY = event.clientY;
        startScrollLeft = scroller.scrollLeft;
        didDrag = false;
        suppressClick = false;
        scroller.classList.add("is-pointer-down");
        event.preventDefault();
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      const onClickCapture = (event: MouseEvent) => {
        if (!suppressClick) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
        clearSuppressClickTimeout();
      };

      scroller.addEventListener("pointerdown", onPointerDown);
      scroller.addEventListener("pointermove", onPointerMove);
      scroller.addEventListener("pointerup", endDrag);
      scroller.addEventListener("pointercancel", endDrag);
      scroller.addEventListener("lostpointercapture", endDrag);
      if (!supportsPointerEvents) {
        scroller.addEventListener("mousedown", onMouseDown);
      }
      scroller.addEventListener("click", onClickCapture, true);

      return () => {
        clearSuppressClickTimeout();
        endMouseDrag();
        scroller.removeEventListener("pointerdown", onPointerDown);
        scroller.removeEventListener("pointermove", onPointerMove);
        scroller.removeEventListener("pointerup", endDrag);
        scroller.removeEventListener("pointercancel", endDrag);
        scroller.removeEventListener("lostpointercapture", endDrag);
        if (!supportsPointerEvents) {
          scroller.removeEventListener("mousedown", onMouseDown);
        }
        scroller.removeEventListener("click", onClickCapture, true);
      };
    };

    const cleanupTruckRow = bindDragScroll(truckRowRef.current);
    const cleanupOperationCarousel = bindDragScroll(operationCarouselRef.current);

    return () => {
      cleanupTruckRow?.();
      cleanupOperationCarousel?.();
    };
  }, []);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (window.location.hash === "#catalogo") {
      const hashReveal = window.setTimeout(() => {
        setIsRevealed(true);
      }, 0);

      return () => {
        window.clearTimeout(hashReveal);
      };
    }

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
          eyebrow="DESTAQUES"
          title="Explore os modelos"
          light="e solicite uma proposta"
        />
        <div className="catalogue-model-grid catalogue-reveal catalogue-reveal-grid">
          <div className="catalogue-truck-row" ref={truckRowRef}>
            {trucks.map((truck) => (
              <TruckSelectionCard
                key={truck.id}
                truck={truck}
                selected={selectedIds.includes(truck.id)}
                quantity={quantities[truck.id] ?? 1}
                onToggle={onToggle}
                onQuantityChange={onQuantityChange}
                variant="landing"
              />
            ))}
            <Link href="/caminhoes" className="catalog-all-models-card">
              <span>
                e mais 53 modelos.
                <br />
                <strong>Confira todos os</strong>
                <br />
                <strong>caminhões</strong>
                <br />
                <strong>disponíveis</strong>
              </span>
              <span className="catalog-all-models-arrow" aria-hidden="true" />
            </Link>
          </div>

          <div className="catalogue-operation-row">
            <article className="catalog-operation-intro-card">
              <span>
                Encontre os ideais{" "}
                <br />
                para <strong>a sua</strong>{" "}
                <br />
                <strong>operação</strong>
              </span>
              <img src={asset("catalog-all-models-arrow-72.svg")} alt="" />
            </article>
            <div className="catalogue-operation-carousel" ref={operationCarouselRef}>
              {operationCards.map((item) => (
                <Link
                  className={`catalog-operation-card ${item.slug}`}
                  href={`/caminhoes?application=${encodeURIComponent(item.application)}`}
                  key={item.title}
                >
                  <span className="catalog-operation-media" aria-hidden="true">
                    <img src={item.image} alt="" className="catalog-operation-banner" />
                  </span>
                  <div className="catalog-operation-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
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

export function OperationSection() {
  const benefits: BenefitCard[] = [
    {
      icon: "benefits-icon-document-figma.svg",
      title: "Custos",
      light: "centralizados",
      titleClassName: "benefits-card-title--inline",
      copy: "IPVA, documentação e serviços em uma única mensalidade",
    },
    {
      icon: "benefits-icon-shield-figma.svg",
      iconClassName: "benefits-card-icon--compact",
      title: "Proteção",
      light: "completa da operação",
      titleClassName: "benefits-card-title--inline",
      copy: "Seguro e cobertura para rodar com tranquilidade",
    },
    {
      icon: "benefits-icon-wrench-figma.svg",
      iconClassName: "benefits-card-icon--compact",
      title: "Operação",
      light: "sem interrupções",
      titleClassName: "benefits-card-title--inline",
      copy: "Manutenção preventiva e corretiva inclusas",
    },
    {
      icon: "benefits-icon-truck-included-figma.svg",
      title: "Gestão",
      light: "simplificada da frota",
      titleClassName: "benefits-card-title--inline",
      copy: "Menos burocracia e mais eficiência operacional",
    },
    {
      icon: "benefits-icon-data-figma.svg",
      title: "Decisões",
      light: "baseadas em dados",
      titleClassName: "benefits-card-title--inline",
      copy: "Telemetria para otimizar custos e performance",
    },
    {
      icon: "benefits-icon-support-figma.svg",
      title: "Suporte",
      light: "contínuo",
      titleClassName: "benefits-card-title--inline",
      copy: "Assistência 24h para manter sua operação rodando",
    },
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

        <div className="benefits-photo" aria-hidden="true">
          <img src={asset("benefits-operation-photo.png")} alt="" />
        </div>

        <div className="benefits-content">
          <div className="benefits-card-grid">
            {benefits.map((item) => (
              <BenefitCard key={`${item.title}-${item.light}`} item={item} />
            ))}
          </div>

          <div className="benefits-cta-card">
            <div className="benefits-cta-copy">
              <h3>
                Tudo incluso. <span>Um só contrato.</span>
              </h3>
              <p>Zero surpresas.</p>
            </div>

            <button className="benefits-cta" type="button">
              <span>Entender como funciona</span>
              <span className="action-icon button-icon arrow-icon" aria-hidden="true" />
            </button>
          </div>
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
    <section id="proposta" className="plans-section page-band">
      <div className="page-inner">
        <div className="comparison-layout" data-motion="section">
          <div className="comparison-heading">
            <p>POR QUE ALUGAR?</p>
            <h2>
              Aluguel vs <span>compra de frota</span>
            </h2>
          </div>

          <div className="comparison-grid-wrap">
            <div className="comparison-grid" aria-label="Comparativo entre assinatura e financiamento">
              <div className="comparison-column comparison-column-subscription">
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

                <ul className="comparison-list">
                  {subscriptionBenefits.map(([icon, label]) => (
                    <li key={label}>
                      <img src={asset(icon)} alt="" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="comparison-column comparison-column-financing">
                <div className="comparison-feature-mark">
                  <img className="comparison-vw-badge" src={asset("comparison-vw-badge.png")} alt="" />
                </div>

                <div className="comparison-feature-copy">
                  <h3>
                    Financiamento
                    <img src={asset("comparison-icon-info.svg")} alt="" />
                  </h3>
                  <p>Aquisição do ativo com gestão própria</p>
                </div>

                <ul className="comparison-list">
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
  }> = [
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
      action: "proposal",
    },
    {
      icon: "icon-dealer-pin.svg",
      title: "Ou visite uma concessionária",
      copy: "Atendimento presencial com a rede Volkswagen",
      cta: "Encontrar uma concessionária",
      href: "#concessionarias",
    },
  ] as const;

  return (
    <section id="assistance" className="assistance-section page-band soft">
      <div className="page-inner assistance-grid" data-motion="section">
        <div className="assistance-copy">
          <p className="eyebrow">DÊ O PRÓXIMO PASSO AGORA MESMO</p>
          <h2>
            <span>Três formas de</span> montar a sua frota Volkswagen
          </h2>
          <div className="assistance-title-rule" aria-hidden="true" />
        </div>

        <div className="assistance-shell">
          <div className="assistance-panel">
            <div className="assistance-actions">
              {paths.map((path) => {
                const actionContent = (
                  <>
                    <div className="assistance-card-copy">
                      <img src={asset(path.icon)} alt="" />
                      <div>
                        <h3>{path.title}</h3>
                        <p>{path.copy}</p>
                      </div>
                    </div>
                    <span className="assistance-arrow" aria-hidden="true">
                      <span className="assistance-arrow-text">{path.cta}</span>
                      <span className="action-icon button-icon arrow-icon" aria-hidden="true" />
                    </span>
                  </>
                );

                return path.action === "proposal" ? (
                  <button
                    type="button"
                    className="assistance-card"
                    onClick={onOpenProposal}
                    aria-label={path.cta}
                    key={path.title}
                    data-motion="card"
                  >
                    {actionContent}
                  </button>
                ) : path.href?.startsWith("/") ? (
                  <Link
                    href={path.href}
                    className="assistance-card"
                    aria-label={path.cta}
                    key={path.title}
                    data-motion="card"
                  >
                    {actionContent}
                  </Link>
                ) : (
                  <a
                    href={path.href ?? "#"}
                    className="assistance-card"
                    aria-label={path.cta}
                    key={path.title}
                    data-motion="card"
                  >
                    {actionContent}
                  </a>
                );
              })}
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
  const dealerStats = [
    { title: "+100", copy: "concessionárias em todo o Brasil" },
    { title: "+3.000", copy: "profissionais especializados" },
    { title: "+500", copy: "pontos de atendimento e serviços" },
  ];

  return (
    <section id="concessionarias" className="dealers-section page-band" data-motion="section">
      <div className="dealer-map-frame">
        <div className="dealer-map-copy-panel">
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
        </div>
        <div className="map-panel" aria-label="Mapa ilustrativo de concessionárias" data-motion="fade">
          <img className="dealer-map-image dealer-map-base" src={asset("dealer-map-base-540-12183.png")} alt="" aria-hidden="true" />
          <img className="dealer-map-image dealer-map-overlay" src={asset("dealer-map-overlay-540-12183.png")} alt="" aria-hidden="true" />
          <button className="map-card" type="button">
            <span>Ver todas as concessionárias</span>
            <span className="action-icon button-icon arrow-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="page-inner">
        <div className="dealer-stats-shell">
          <div className="dealer-stats">
            {dealerStats.map((item) => (
              <div className="dealer-stat" key={item.title} data-motion="card">
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="trusted-companies-shell">
          <div className="trusted-companies" aria-label="Empresas que confiam na frota">
            <p>Junte-se a empresas que confiam na nossa frota</p>
            <ul className="trusted-companies-list">
              {trustedCompanies.map((company) => (
                <li className={`trusted-company-item ${company.className}`} key={company.name}>
                  {"parts" in company ? (
                    <span className="trusted-company-logo brf-composite" aria-label={company.name}>
                      {company.parts.map((part) => (
                        <img className={`trusted-company-logo-part ${part.className}`} src={part.asset} alt="" aria-hidden="true" key={part.className} />
                      ))}
                    </span>
                  ) : (
                    <img className={`trusted-company-logo ${company.className}`} src={company.asset} alt={company.name} />
                  )}
                </li>
              ))}
            </ul>
          </div>
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
          <div className="faq-heading-copy">
            <p>Respostas rápidas para seguir com mais clareza</p>
            <h2>
              <span className="faq-heading-strong">Perguntas frequentes</span>
              <span className="faq-heading-soft">sobre o VW Truck Rental</span>
            </h2>
          </div>
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
