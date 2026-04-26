"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import { faqs } from "@/data/landing";
import { catalogTrucks, type CatalogTruck, type TruckDetailData } from "@/data/catalog";
import { Footer, Header } from "@/components/LandingPage";

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

function DetailTruckCard({
  truck,
  selected,
  onToggle,
}: {
  truck: CatalogTruck;
  selected: boolean;
  onToggle: (truck: CatalogTruck) => void;
}) {
  return (
    <article className={`detail-related-card ${selected ? "selected" : ""}`}>
      <button
        className="select-dot"
        type="button"
        onClick={() => onToggle(truck)}
        aria-label={selected ? `Remover ${truck.family} ${truck.model} da proposta` : `Adicionar ${truck.family} ${truck.model} à proposta`}
      />
      <div className="detail-related-media">
        {truck.shadowImage ? <img src={truck.shadowImage} alt="" className="catalog-truck-shadow" /> : null}
        <img src={truck.image} alt={`${truck.family} ${truck.model}`} />
      </div>
      <div className="detail-related-content">
        <h3>{truck.family}</h3>
        <p>{truck.model}</p>
        <div className="badges" aria-label="Características">
          {truck.badges.slice(0, 1).map((badge) => (
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

function DetailProposalSummary({
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
      <a href="#proposta">Falar com especialista</a>
    </aside>
  );
}

export function TruckDetailPage({ truck }: { truck: TruckDetailData }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const selectedTrucks = useMemo(
    () => catalogTrucks.filter((item) => selectedIds.includes(item.id)),
    [selectedIds],
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
    setSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    );
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
              <img src={truck.heroImage} alt={`${truck.family} ${truck.model}`} />
            </div>
          </div>
        </section>

        <section id="proposta" className="truck-detail-actions">
          <div className="page-inner detail-action-row">
            <button className="primary-action" type="button" onClick={() => toggleTruck(truck)}>
              {selectedIds.includes(truck.id) ? "Remover da proposta" : "Solicitar proposta"}
              <img src={asset("icon-add.svg")} alt="" />
            </button>
            <Link className="outline-cta" href="/#proposta">Falar agora com um Especialista</Link>
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
          <div className="truck-detail-gallery" aria-label="Fotos do caminhão">
            {visibleGalleryPhotos.map((photo) => (
              <img
                className={`truck-detail-gallery-photo ${photo.position}`}
                src={photo.image}
                alt={photo.alt}
                key={`${photo.position}-${photo.image}`}
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
                <img src={asset("logo-word-blue.png")} alt="VW Truck Rental" />
                <h3>Frota por Assinatura</h3>
                <p>Gestão completa com previsibilidade de custos</p>
                <h4>Assinatura</h4>
                <ul>
                  {truck.comparison.subscription.map((item) => (
                    <li key={item}>
                      <img src={asset("detail-icon-check.svg")} alt="" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-versus" aria-hidden="true">VS</div>
              <div className="detail-comparison-column">
                <img className="detail-comparison-symbol" src={asset("logo-symbol-blue.svg")} alt="" />
                <h3>Financiamento</h3>
                <p>Aquisição do ativo com gestão própria</p>
                <h4>Financiamento</h4>
                <ul>
                  {truck.comparison.financing.map((item) => (
                    <li key={item}>
                      <img src={asset("detail-icon-check.svg")} alt="" />
                      {item}
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
              light="com este caminhão?"
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
                  ) : (
                    <a className="outline-cta" href={item.href}>{item.cta}</a>
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
            <div className="detail-related-grid">
              {truck.related.map((item) => (
                <DetailTruckCard
                  key={item.id}
                  truck={item}
                  selected={selectedIds.includes(item.id)}
                  onToggle={toggleTruck}
                />
              ))}
            </div>
            <Link href="/caminhoes" className="outline-cta centered">
              Explorar todos os modelos
              <img src={asset("icon-add.svg")} alt="" />
            </Link>
          </div>
        </section>

        <DetailFaq />
      </main>
      <Footer />
      <a href="#faq" className="fab" aria-label="Abrir central de ajuda">
        ?
      </a>
      <DetailProposalSummary selectedTrucks={selectedTrucks} onClear={() => setSelectedIds([])} />
    </>
  );
}
