"use client";

/* eslint-disable @next/next/no-img-element */

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { faqs } from "@/data/landing";
import { type CatalogTruck, type TruckDetailData } from "@/data/catalog";
import { ProposalDrawer } from "@/components/proposal/ProposalDrawer";
import { ProposalSummary } from "@/components/proposal/ProposalSummary";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useMotionObserver } from "@/lib/useMotionObserver";
import { TruckSelectionCard } from "@/components/TruckSelectionCard";
import { TruckImageStack } from "@/components/TruckImageStack";
import { useProposal } from "@/features/proposal/ProposalProvider";

const asset = (name: string) => `/assets/figma/${name}`;

function DetailTitle({
  eyebrow,
  title,
  light,
}: {
  eyebrow?: string;
  title: string;
  light?: string;
}) {
  return (
    <div className="detail-section-title">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>
        {title}
        {light ? <span> {light}</span> : null}
      </h2>
      <div />
    </div>
  );
}

function DetailFaq() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="detail-faq-section">
      <div className="page-inner">
        <DetailTitle
          eyebrow="Respostas rápidas para seguir com mais clareza"
          title="Perguntas frequentes"
          light="sobre o VW Truck Rental"
        />
        <div className="accordion">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `detail-faq-answer-${index}`;

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

export function TruckDetailPage({ truck }: { truck: TruckDetailData }) {
  useMotionObserver();

  const { isSelected, selectedItems, setQuantity, toggleTruck } = useProposal();
  const [isProposalDrawerOpen, setIsProposalDrawerOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [galleryDragOffset, setGalleryDragOffset] = useState(0);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const relatedTrackRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryDragStateRef = useRef({
    deltaX: 0,
    isDragging: false,
    pointerId: -1,
    startX: 0,
    width: 0,
  });

  const visibleGalleryPhotos = useMemo(() => {
    if (truck.gallery.length === 0) {
      return [];
    }

    const currentIndex = activePhotoIndex % truck.gallery.length;
    const previousIndex = (currentIndex - 1 + truck.gallery.length) % truck.gallery.length;
    const nextIndex = (currentIndex + 1) % truck.gallery.length;

    return [
      { ...truck.gallery[previousIndex], position: "previous" },
      { ...truck.gallery[currentIndex], position: "active" },
      { ...truck.gallery[nextIndex], position: "next" },
    ];
  }, [activePhotoIndex, truck.gallery]);
  const quantities = useMemo(
    () => Object.fromEntries(selectedItems.map((item) => [item.id, item.quantity])),
    [selectedItems],
  );

  useEffect(() => {
    const scroller = relatedTrackRef.current;

    if (!scroller) {
      return undefined;
    }

    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let didDrag = false;
    let isMouseDown = false;
    let suppressClick = false;
    let suppressClickTimeout: number | undefined;
    let visibilityFrame = 0;
    const mobileDragQuery = window.matchMedia("(max-width: 640px)");

    const clearSuppressClickTimeout = () => {
      if (suppressClickTimeout !== undefined) {
        window.clearTimeout(suppressClickTimeout);
        suppressClickTimeout = undefined;
      }
    };

    const getItems = () =>
      Array.from(scroller.children).filter((child): child is HTMLElement => child instanceof HTMLElement);

    const updateCardVisibility = () => {
      visibilityFrame = 0;
      const scrollerRect = scroller.getBoundingClientRect();
      const tolerance = 1;

      getItems().forEach((item) => {
        const rect = item.getBoundingClientRect();
        const isFullyVisible = rect.left >= scrollerRect.left - tolerance && rect.right <= scrollerRect.right + tolerance;
        item.classList.toggle("is-partial", !isFullyVisible);
      });
    };

    const scheduleCardVisibility = () => {
      if (visibilityFrame) {
        return;
      }

      visibilityFrame = window.requestAnimationFrame(updateCardVisibility);
    };

    const snapToNearestItem = () => {
      const currentScrollLeft = scroller.scrollLeft;
      const scrollerLeft = scroller.getBoundingClientRect().left;
      const items = getItems();

      if (!items.length) {
        return;
      }

      const nearestScrollLeft = items.reduce((nearest, item) => {
        const itemScrollLeft = item.getBoundingClientRect().left - scrollerLeft + currentScrollLeft;

        if (Math.abs(itemScrollLeft - currentScrollLeft) < Math.abs(nearest - currentScrollLeft)) {
          return itemScrollLeft;
        }

        return nearest;
      }, 0);

      scroller.scrollTo({ left: nearestScrollLeft, behavior: "auto" });
      scheduleCardVisibility();
    };

    const finishDrag = () => {
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

    const endMouseDrag = () => {
      if (!isMouseDown) {
        return;
      }

      isMouseDown = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      finishDrag();
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
      scheduleCardVisibility();
    };

    const onMouseUp = () => {
      endMouseDrag();
    };

    const onMouseDown = (event: MouseEvent) => {
      if (!mobileDragQuery.matches) {
        return;
      }

      if (event.button !== 0) {
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

    const onScroll = () => {
      scheduleCardVisibility();
    };

    scroller.addEventListener("mousedown", onMouseDown);
    scroller.addEventListener("click", onClickCapture, true);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleCardVisibility);
    scheduleCardVisibility();

    return () => {
      clearSuppressClickTimeout();
      endMouseDrag();

      if (visibilityFrame) {
        window.cancelAnimationFrame(visibilityFrame);
      }

      scroller.removeEventListener("mousedown", onMouseDown);
      scroller.removeEventListener("click", onClickCapture, true);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleCardVisibility);
    };
  }, [truck.related]);

  function scrollRelated(direction: "previous" | "next") {
    const track = relatedTrackRef.current;

    if (!track) {
      return;
    }

    const card = track.querySelector(".catalog-truck-card");
    const cardWidth = card instanceof HTMLElement ? card.getBoundingClientRect().width : 292;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || "24");

    track.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? cardWidth + gap : -(cardWidth + gap),
    });
  }

  function ensureTruckInProposal(item: TruckDetailData | CatalogTruck) {
    if (!isSelected(item.id)) {
      toggleTruck(item);
    }

    setIsProposalDrawerOpen(true);
  }

  function showPreviousPhoto() {
    if (truck.gallery.length === 0) {
      return;
    }

    setActivePhotoIndex((current) => (current - 1 + truck.gallery.length) % truck.gallery.length);
  }

  function showNextPhoto() {
    if (truck.gallery.length === 0) {
      return;
    }

    setActivePhotoIndex((current) => (current + 1) % truck.gallery.length);
  }

  function startGalleryDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (truck.gallery.length <= 1) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const targetElement = event.target instanceof Element ? event.target : null;

    if (targetElement?.closest(".gallery-arrow")) {
      return;
    }

    const gallery = galleryRef.current;

    if (!gallery) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    galleryDragStateRef.current = {
      deltaX: 0,
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      width: gallery.clientWidth,
    };
    setIsGalleryDragging(true);
    setGalleryDragOffset(0);
  }

  function moveGalleryDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const dragState = galleryDragStateRef.current;

    if (!dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    dragState.deltaX = deltaX;
    setGalleryDragOffset(deltaX);
  }

  function endGalleryDrag(event: ReactPointerEvent<HTMLDivElement>, canceled = false) {
    const dragState = galleryDragStateRef.current;

    if (!dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const deltaX = dragState.deltaX;
    const threshold = Math.max(48, dragState.width * 0.12);

    galleryDragStateRef.current = {
      deltaX: 0,
      isDragging: false,
      pointerId: -1,
      startX: 0,
      width: 0,
    };
    setIsGalleryDragging(false);
    setGalleryDragOffset(0);

    if (canceled) {
      return;
    }

    if (deltaX > threshold) {
      showPreviousPhoto();
      return;
    }

    if (deltaX < -threshold) {
      showNextPhoto();
    }
  }

  return (
    <>
      <Header activePath="/caminhoes" onOpenProposal={() => setIsProposalDrawerOpen(true)} />
      <main id="top" className="truck-detail-page">
        <section className="truck-detail-hero" data-motion="fade">
          <div className="page-inner truck-detail-hero-inner">
            <div className="truck-detail-hero-copy" data-motion="section">
              <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Página inicial</Link>
                <span aria-hidden="true">›</span>
                <Link href="/caminhoes">Caminhões</Link>
                <span aria-hidden="true">›</span>
                <span>{truck.family} {truck.model}</span>
              </nav>
              <h1>
                <strong>{truck.family}</strong> <span>{truck.model}</span>
                <em>por assinatura</em>
              </h1>
              <p>{truck.heroCopy}</p>
              <div className="truck-detail-rule" />
              <div className="truck-detail-specs" aria-label="Especificações principais">
                {truck.specs.map((spec) => (
                  <div className="truck-detail-spec" key={spec.label} data-motion="card">
                    <img src={spec.icon} alt="" />
                    <strong>{spec.value}</strong>
                    <span>{spec.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="truck-detail-hero-media" data-motion="fade">
              <TruckImageStack
                image={truck.heroImage}
                shadowImage={truck.heroShadowImage}
                alt={`${truck.family} ${truck.model}`}
                frontClassName="truck-detail-hero-image truck-detail-hero-image-front"
                shadowClassName="truck-detail-hero-image truck-detail-hero-image-shadow"
              />
            </div>
          </div>
        </section>

        <section id="proposta" className="truck-detail-actions" data-motion="fade">
          <div className="page-inner detail-action-row">
            <button className="primary-action" type="button" onClick={() => ensureTruckInProposal(truck)}>
              {isSelected(truck.id) ? "Atualizar proposta" : "Solicitar proposta"}
              <img className="action-icon button-icon" src={asset("icon-add.svg")} alt="" />
            </button>
            <button className="outline-cta" type="button" onClick={() => setIsProposalDrawerOpen(true)}>
              Falar agora com um especialista
            </button>
          </div>
        </section>

        <section className="truck-detail-info page-band" data-motion="section">
          <div className="page-inner">
            <h2>Detalhes do caminhão</h2>
            <div className="truck-detail-list">
              {truck.details.map((item) => (
                <div className="truck-detail-list-item" key={item} data-motion="fade">
                  <img src={asset("detail-icon-check.svg")} alt="" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <h2 className="truck-detail-gallery-title">Fotos</h2>
          </div>
          <div
            ref={galleryRef}
            className={`truck-detail-gallery ${truck.gallery.length > 1 ? "is-draggable" : ""} ${isGalleryDragging ? "is-dragging" : ""}`}
            aria-label="Fotos do caminhão"
            onPointerDown={startGalleryDrag}
            onPointerMove={moveGalleryDrag}
            onPointerUp={endGalleryDrag}
            onPointerCancel={(event) => endGalleryDrag(event, true)}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") {
                endGalleryDrag(event, true);
              }
            }}
            style={{ "--gallery-drag-offset": `${galleryDragOffset}px` } as CSSProperties}
          >
            {visibleGalleryPhotos.map((photo) => (
              <img
                className={`truck-detail-gallery-photo ${photo.position}`}
                src={photo.image}
                alt={photo.alt}
                key={`${photo.position}-${photo.image}`}
                draggable={false}
              />
            ))}
            <button className="gallery-arrow previous" type="button" aria-label="Foto anterior" onClick={showPreviousPhoto}>
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button className="gallery-arrow next" type="button" aria-label="Próxima foto" onClick={showNextPhoto}>
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
        </section>

        <section className="detail-comparison-section page-band">
          <div className="page-inner">
            <div className="detail-comparison-title">
              <p>POR QUE ALUGAR?</p>
              <h2>
                Aluguel vs <span>compra de um {truck.family}</span>
              </h2>
              <div />
            </div>
            <div className="detail-comparison">
              <div className="detail-comparison-column">
                <img className="detail-comparison-wordmark" src={asset("comparison-wordmark.png")} alt="VW Truck Rental" />
                <h3>
                  Frota por Assinatura
                  <img src={asset("comparison-icon-info.svg")} alt="" />
                </h3>
                <p>Gestão completa com previsibilidade de custos</p>
                <ul>
                  {truck.comparison.subscription.map((item) => (
                    <li key={item.label}>
                      <img src={item.icon} alt="" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-versus" aria-hidden="true">VS</div>
              <div className="detail-comparison-column">
                <img className="detail-comparison-symbol" src={asset("comparison-vw-badge.png")} alt="" />
                <h3>
                  Financiamento
                  <img src={asset("comparison-icon-info.svg")} alt="" />
                </h3>
                <p>Aquisição do ativo com gestão própria</p>
                <ul>
                  {truck.comparison.financing.map((item) => (
                    <li key={item.label}>
                      <img src={item.icon} alt="" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="detail-next-section page-band" data-motion="section">
          <div className="page-inner">
            <DetailTitle
              eyebrow="Dê o próximo agora mesmo"
              title="Pronto para montar sua frota"
              light="com este caminhão"
            />
            <p className="detail-section-copy">Selecione a melhor forma de avançar com este modelo e receber uma proposta para sua operação.</p>
            <div className="detail-cta-grid">
              {truck.ctas.map((item) => (
                <article className="detail-cta-card" key={item.title} data-motion="card">
                  <img src={item.icon} alt="" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  {item.href === "#proposta" ? (
                    <button type="button" className="outline-cta" onClick={() => ensureTruckInProposal(truck)}>
                      {item.cta}
                    </button>
                  ) : item.href ? (
                    <a className="outline-cta" href={item.href}>{item.cta}</a>
                  ) : (
                    <button type="button" className="outline-cta">{item.cta}</button>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-related-section page-band" data-motion="section">
          <div className="page-inner">
            <DetailTitle
              eyebrow="Caminhões disponíveis para assinatura"
              title="Explore mais modelos"
              light="para adicionar em sua proposta"
            />
            <div className="detail-related-carousel">
              <button
                className="detail-related-arrow previous"
                type="button"
                aria-label="Modelos anteriores"
                onClick={() => scrollRelated("previous")}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <div className="detail-related-grid" ref={relatedTrackRef} aria-label="Modelos relacionados">
                {truck.related.map((item) => (
                  <TruckSelectionCard
                    key={item.id}
                    truck={item}
                    selected={isSelected(item.id)}
                    quantity={quantities[item.id] ?? 1}
                    onToggle={toggleTruck}
                    onQuantityChange={setQuantity}
                  />
                ))}
              </div>
              <button
                className="detail-related-arrow next"
                type="button"
                aria-label="Próximos modelos"
                onClick={() => scrollRelated("next")}
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
            <Link href="/caminhoes" className="outline-cta centered">
              Explorar todos os modelos
              <img className="action-icon button-icon" src={asset("icon-add.svg")} alt="" />
            </Link>
          </div>
        </section>

        <DetailFaq />
      </main>
      <Footer />
      <ProposalSummary onContinue={() => setIsProposalDrawerOpen(true)} />
      <ProposalDrawer isOpen={isProposalDrawerOpen} onClose={() => setIsProposalDrawerOpen(false)} />
    </>
  );
}
