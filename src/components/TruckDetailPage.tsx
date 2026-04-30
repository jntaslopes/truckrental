"use client";

/* eslint-disable @next/next/no-img-element */

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { faqs } from "@/data/landing";
import { catalogTrucks, type CatalogTruck, type TruckDetailData } from "@/data/catalog";
import {
  Footer,
  Header,
  ProposalDrawer,
  ProposalSummary,
  type ProposalItem,
} from "@/components/LandingPage";
import { TruckSelectionCard } from "@/components/TruckSelectionCard";
import { TruckImageStack } from "@/components/TruckImageStack";

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
        <a href="#top" className="outline-cta centered">Ver todas as perguntas frequentes (+50)</a>
      </div>
    </section>
  );
}

export function TruckDetailPage({ truck }: { truck: TruckDetailData }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isProposalDrawerOpen, setIsProposalDrawerOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [galleryDragOffset, setGalleryDragOffset] = useState(0);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const relatedTrackRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryDragStateRef = useRef({
    deltaX: 0,
    isDragging: false,
    pointerId: -1,
    startX: 0,
    width: 0,
  });

  const selectedItems = useMemo<ProposalItem[]>(
    () =>
      catalogTrucks
        .filter((item) => selectedIds.includes(item.id))
        .map((item) => ({
          id: item.id,
          family: item.family,
          model: item.model,
          image: item.image,
          shadowImage: item.shadowImage,
          quantity: quantities[item.id] ?? 1,
        })),
    [quantities, selectedIds],
  );
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

  function toggleTruck(item: CatalogTruck) {
    setSelectedIds((current) => {
      if (current.includes(item.id)) {
        if (current.length <= 1) {
          setIsProposalDrawerOpen(false);
        }
        setQuantities((currentQuantities) => {
          const next = { ...currentQuantities };
          delete next[item.id];
          return next;
        });
        return current.filter((id) => id !== item.id);
      }

      setQuantities((currentQuantities) => ({
        ...currentQuantities,
        [item.id]: currentQuantities[item.id] ?? 1,
      }));
      return [...current, item.id];
    });
  }

  function clearProposal() {
    setSelectedIds([]);
    setQuantities({});
    setIsProposalDrawerOpen(false);
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

  function scrollRelated(direction: "previous" | "next") {
    const track = relatedTrackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? 293 : -293,
    });
  }

  return (
    <>
      <Header proposalCount={selectedIds.length} activePath="/caminhoes" />
      <main id="top" className="truck-detail-page">
        <section className="truck-detail-hero">
          <div className="page-inner truck-detail-hero-inner">
            <div className="truck-detail-hero-copy">
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
                  <div className="truck-detail-spec" key={spec.label}>
                    <img src={spec.icon} alt="" />
                    <strong>{spec.value}</strong>
                    <span>{spec.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="truck-detail-hero-media">
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

        <section id="proposta" className="truck-detail-actions">
          <div className="page-inner detail-action-row">
            <button className="primary-action" type="button" onClick={() => toggleTruck(truck)}>
              {selectedIds.includes(truck.id) ? "Remover da proposta" : "Solicitar proposta"}
              <img className="action-icon button-icon" src={asset("icon-add.svg")} alt="" />
            </button>
            <button className="outline-cta" type="button">Falar agora com um Especialista</button>
          </div>
        </section>

        <section className="truck-detail-info page-band">
          <div className="page-inner">
            <h2>Detalhes do caminhão</h2>
            <div className="truck-detail-list">
              {truck.details.map((item) => (
                <div className="truck-detail-list-item" key={item}>
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
            <DetailTitle
              title="Assinatura"
              light={`vs compra de frota de um ${truck.family}`}
            />
            <p className="detail-section-copy">Veja como cada modelo impacta seu custo mensal e total ao longo do contrato.</p>
            <div className="detail-comparison">
              <div className="detail-comparison-column">
                <img className="detail-comparison-wordmark" src={asset("comparison-wordmark.png")} alt="VW Truck Rental" />
                <h3>
                  Frota por Assinatura
                  <img src={asset("comparison-icon-info.svg")} alt="" />
                </h3>
                <p>Gestão completa com previsibilidade de custos</p>
                <h4>Assinatura</h4>
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
                <h4>Financiamento</h4>
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

        <section className="detail-next-section page-band">
          <div className="page-inner">
            <DetailTitle
              eyebrow="Dê o próximo agora mesmo"
              title="Pronto para montar sua frota"
              light="com este caminhão"
            />
            <p className="detail-section-copy">Selecione a melhor forma de avançar com este modelo e receber uma proposta para sua operação.</p>
            <div className="detail-cta-grid">
              {truck.ctas.map((item) => (
                <article className="detail-cta-card" key={item.title}>
                  <img src={item.icon} alt="" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  {item.href === "#proposta" ? (
                    <button type="button" className="outline-cta" onClick={() => toggleTruck(truck)}>
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

        <section className="detail-related-section page-band">
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
              <div className="detail-related-grid" ref={relatedTrackRef}>
                {truck.related.map((item) => (
                  <TruckSelectionCard
                    key={item.id}
                    truck={item}
                    selected={selectedIds.includes(item.id)}
                    quantity={quantities[item.id] ?? 1}
                    onToggle={toggleTruck}
                    onQuantityChange={changeProposalQuantity}
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
      <ProposalSummary
        selectedItems={selectedItems}
        onClear={clearProposal}
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
