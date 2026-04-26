"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  faqs,
  footerTruckLinks,
  navItems,
  trucks,
  type Truck,
} from "@/data/landing";

const asset = (name: string) => `/assets/figma/${name}`;

export function Header({
  proposalCount,
  activePath,
}: {
  proposalCount: number;
  activePath?: string;
}) {
  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="VW Truck Rental">
        <img src={asset("logo-symbol-blue.svg")} alt="" className="brand-symbol" />
        <img src={asset("logo-word-blue.png")} alt="VW Truck Rental" className="brand-word" />
      </Link>

      <nav className="main-nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={activePath === item.href ? "active" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link href="/#concessionarias" className="ghost-action">
          <img src={asset("icon-pin.svg")} alt="" />
          Encontrar uma Concessionária
        </Link>
        <Link href="/#proposta" className="cart-action" aria-label={`${proposalCount} itens na proposta`}>
          <img src={asset("icon-cart.svg")} alt="" />
          <span>{proposalCount}</span>
        </Link>
        <Link href="/#proposta" className="primary-action">
          Falar agora com um Especialista
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  const benefits = [
    ["benefit-sign.svg", "Assinatura", "100% digital ou presencial"],
    ["benefit-calendar.svg", "Planos", "de 36 ou 60 meses"],
    ["benefit-doc.svg", "Sem entrada", "e valor fixo mensal"],
    ["benefit-truck.svg", "Gestão", "completa da frota"],
  ];

  return (
    <section id="top" className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">ASSINATURA DE CAMINHÕES</p>
        <h1>
          Sua frota,
          <br />
          sem burocracia e
          <br />
          <span className="accent-line">com tudo incluso</span>
        </h1>
        <p>
          Assine a frota ideal para o seu negócio e tenha mais controle,
          previsibilidade e eficiência na sua operação.
        </p>
        <a href="#catalogo" className="secondary-action">
          Ver todos os caminhões para assinatura
        </a>
      </div>

      <div className="hero-visual" aria-label="Caminhão Volkswagen Meteor">
        <img className="hero-composite" src={asset("hero-truck.png")} alt="Caminhão Volkswagen Meteor" />
        <div className="hero-badge">
          <img src={asset("benefit-money.svg")} alt="" />
          <span>Assinatura mensal</span>
        </div>
      </div>

      <div className="benefits-bar">
        {benefits.map(([icon, title, copy]) => (
          <div className="benefit" key={title}>
            <img src={asset(icon)} alt="" />
            <div>
              <strong>{title}</strong>
              <span>{copy}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  light,
}: {
  eyebrow: string;
  title: string;
  light?: string;
}) {
  return (
    <div className="section-title">
      <p>{eyebrow}</p>
      <h2>
        {title}
        {light ? <span> {light}</span> : null}
      </h2>
    </div>
  );
}

function TruckCard({
  truck,
  selected,
  onToggle,
  onDetails,
}: {
  truck: Truck;
  selected: boolean;
  onToggle: (truck: Truck) => void;
  onDetails: (truck: Truck) => void;
}) {
  return (
    <article className={`truck-card ${selected ? "selected" : ""}`}>
      <button
        className="select-dot"
        onClick={() => onToggle(truck)}
        aria-label={selected ? `Remover ${truck.family} da proposta` : `Adicionar ${truck.family} à proposta`}
      />
      <div className="truck-media">
        {truck.shadowImage ? <img src={truck.shadowImage} alt="" className="truck-shadow" /> : null}
        <img src={truck.image} alt={`${truck.family} ${truck.model}`} className="truck-image" />
      </div>
      <div className="truck-content">
        <h3>{truck.family}</h3>
        <p>{truck.model}</p>
        <div className="badges" aria-label="Características">
          {truck.badges.map((badge) => (
            <span className={`badge ${badge.tone}`} key={badge.label}>
              {badge.icon ? <img src={badge.icon} alt="" /> : null}
              {badge.label}
            </span>
          ))}
        </div>
        <button className="text-link" onClick={() => onToggle(truck)}>
          {selected ? "Remover da proposta" : "Adicionar à proposta"}
          <img src={asset("icon-add.svg")} alt="" />
        </button>
        <button className="text-link" onClick={() => onDetails(truck)}>
          Ver detalhes
          <img src={asset("icon-arrow-right.svg")} alt="" />
        </button>
      </div>
    </article>
  );
}

function TruckCatalogue({
  selectedIds,
  onToggle,
  onDetails,
}: {
  selectedIds: string[];
  onToggle: (truck: Truck) => void;
  onDetails: (truck: Truck) => void;
}) {
  return (
    <section id="catalogo" className="catalogue-section page-band">
      <div className="page-inner">
        <SectionTitle
          eyebrow="Caminhões disponíveis para assinatura"
          title="Explore os modelos"
          light="e solicite uma proposta"
        />
        <div className="truck-grid">
          {trucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              selected={selectedIds.includes(truck.id)}
              onToggle={onToggle}
              onDetails={onDetails}
            />
          ))}
        </div>
        <a href="#proposta" className="outline-cta centered">
          Explorar todos os modelos
          <img src={asset("icon-add.svg")} alt="" />
        </a>
      </div>
    </section>
  );
}

function InfoLine({ title, copy, icon }: { title: string; copy: string; icon?: string }) {
  return (
    <div className="info-line">
      {icon ? <img className="info-line-icon" src={asset(icon)} alt="" /> : null}
      <div>
        <strong>{title}</strong>
        <span>{copy}</span>
      </div>
    </div>
  );
}

type BenefitCard = {
  icon: string;
  title: string;
  light: string;
  copy: string;
};

function BenefitCard({ item, side }: { item: BenefitCard; side: "left" | "right" }) {
  return (
    <article className={`benefits-card ${side}`}>
      <img className="benefits-card-icon" src={asset(item.icon)} alt="" />
      <div>
        <h3>
          {item.title} <span>{item.light}</span>
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
      copy: "IPVA, documentação e serviços em uma única mensalidade",
    },
    {
      icon: "benefits-icon-shield.svg",
      title: "Proteção",
      light: "completa da operação",
      copy: "Seguro e cobertura para rodar com tranquilidade",
    },
    {
      icon: "benefits-icon-wrench.svg",
      title: "Operação",
      light: "sem interrupções",
      copy: "Manutenção preventiva e corretiva inclusas",
    },
  ];

  const rightBenefits: BenefitCard[] = [
    {
      icon: "benefits-icon-truck-check.svg",
      title: "Gestão simplificada",
      light: "da frota",
      copy: "Menos burocracia e mais eficiência operacional",
    },
    {
      icon: "benefits-icon-data.svg",
      title: "Decisões",
      light: "baseadas em dados",
      copy: "Telemetria para otimizar custos e performance",
    },
    {
      icon: "benefits-icon-support.svg",
      title: "Suporte",
      light: "contínuo",
      copy: "Assistência 24h para manter sua operação rodando",
    },
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
          <div className="benefits-column">
            {leftBenefits.map((item) => (
              <BenefitCard key={item.title} item={item} side="left" />
            ))}
          </div>

          <div className="benefits-visual" aria-hidden="true">
            <div className="benefits-rings">
              <img className="benefits-ring benefits-ring-middle" src={asset("benefits-ellipse-middle.svg")} alt="" />
              <img className="benefits-ring benefits-ring-inner" src={asset("benefits-ellipse-inner.svg")} alt="" />
              <img className="benefits-ring benefits-ring-outer" src={asset("benefits-ellipse-outer.svg")} alt="" />
            </div>
            <img className="benefits-device" src={asset("benefits-device-composite.png")} alt="" />
          </div>

          <div className="benefits-column">
            {rightBenefits.map((item) => (
              <BenefitCard key={item.title} item={item} side="right" />
            ))}
          </div>
        </div>

        <a className="outline-cta benefits-cta" href="#faq">
          Entender tudo que está incluso
        </a>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section id="proposta" className="plans-section page-band">
      <div className="page-inner">
        <SectionTitle eyebrow="Assinatura vs. compra de frota" title="Mais controle" light="para crescer" />
        <div className="plans-grid">
          <div className="plan-column muted">
            <h3>Frota por assinatura</h3>
            <p>Sem entrada, com custos previstos e gestão operacional simplificada.</p>
            <img src={asset("truck-meteor-blue.png")} alt="Caminhão Meteor azul" />
          </div>
          <div className="plan-column highlighted">
            <h3>VW Truck Rental</h3>
            <p>Plano ideal para empresas que precisam operar com previsibilidade.</p>
            <ul>
              <li>Manutenção preventiva inclusa</li>
              <li>Documentação e taxas planejadas</li>
              <li>Suporte especializado</li>
              <li>Renovação de frota simplificada</li>
            </ul>
          </div>
          <div className="plan-column muted">
            <h3>Financiamento</h3>
            <p>Mais exposição a custos variáveis, imobilização e revenda do ativo.</p>
            <ul>
              <li>Entrada e parcelas</li>
              <li>Custos extras recorrentes</li>
              <li>Gestão interna mais pesada</li>
            </ul>
          </div>
        </div>
        <a href="#catalogo" className="outline-cta centered">
          Voltar aos caminhões
        </a>
      </div>
    </section>
  );
}

function AssistanceSection() {
  return (
    <section className="assistance-section page-band soft">
      <div className="page-inner assistance-grid">
        <div className="assistance-copy">
          <p className="eyebrow">Atendimento para sua empresa</p>
          <h2>Tenha acesso ao mercado e à sua frota Volkswagen.</h2>
          <p>
            Especialistas ajudam a escolher o caminhão, estimar o plano ideal e avançar com a proposta.
          </p>
          <div className="mini-actions">
            <a href="#concessionarias" className="outline-cta">Encontrar concessionária</a>
            <a href="#faq" className="outline-cta">Central de ajuda</a>
          </div>
        </div>
        <div className="assistance-photo">
          <img src={asset("faq-truck.png")} alt="Atendimento Volkswagen Caminhões" />
        </div>
      </div>
    </section>
  );
}

function DealersSection() {
  return (
    <section id="concessionarias" className="dealers-section page-band">
      <div className="page-inner">
        <SectionTitle
          eyebrow="Rede de atendimento"
          title="Uma rede pronta para atender sua operação"
          light="em todo o Brasil"
        />
        <div className="dealer-layout">
          <div className="dealer-search">
            <label htmlFor="dealer-city">Encontre uma Concessionária</label>
            <input id="dealer-city" value="São Paulo, SP" readOnly />
            <button>Buscar</button>
          </div>
          <div className="map-panel" aria-label="Mapa ilustrativo de concessionárias">
            {Array.from({ length: 15 }).map((_, index) => (
              <span key={index} className={`map-pin pin-${index + 1}`} />
            ))}
            <div className="map-card">
              <strong>Volkswagen Caminhões</strong>
              <span>Rede nacional de atendimento</span>
            </div>
          </div>
        </div>
        <div className="dealer-stats">
          <InfoLine title="+130" copy="concessionárias" />
          <InfoLine title="+3.000" copy="profissionais especializados" />
          <InfoLine title="+500" copy="pontos de atendimento" />
          <InfoLine title="Volkswagen" copy="presente no Brasil" />
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
        <a href="#top" className="outline-cta centered">Ver todas as perguntas frequentes (+50)</a>
      </div>
    </section>
  );
}

function FooterColumn({
  title,
  links,
  twoColumns,
  children,
}: {
  title: string;
  links: string[];
  twoColumns?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <div className={twoColumns ? "footer-list two-columns" : "footer-list"}>
        {links.map((link) => (
          <a href="#top" key={link}>{link}</a>
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
          <a className="brand inverse" href="#top">
            <img src={asset("logo-symbol-white.svg")} alt="" className="brand-symbol" />
            <img src={asset("logo-word-white.png")} alt="VW Truck Rental" className="brand-word" />
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
          />
          <FooterColumn title="Caminhões por assinatura" links={footerTruckLinks} twoColumns />
          <FooterColumn title="Atendimento" links={["Central de Ajuda"]}>
            <a className="footer-button" href="#proposta">Falar com um especialista</a>
          </FooterColumn>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <a href="#top">Aviso de Privacidade</a>
          <a href="#top">Política de Cookies</a>
          <a href="#top">Termos de Uso</a>
          <a href="#top">Condições Legais</a>
        </div>
        <span>© Volkswagen Financial Services 2025</span>
      </div>
    </footer>
  );
}

function ProposalSummary({
  selectedTrucks,
  onClear,
}: {
  selectedTrucks: Truck[];
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
        <span>{selectedTrucks.map((truck) => truck.family).join(", ")}</span>
      </div>
      <button onClick={onClear}>Limpar</button>
      <a href="#proposta">Falar com especialista</a>
    </aside>
  );
}

function FloatingActionButton() {
  return (
    <a href="#faq" className="fab" aria-label="Abrir central de ajuda">
      ?
    </a>
  );
}

function DetailModal({ truck, onClose }: { truck: Truck; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="truck-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="truck-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar detalhes">×</button>
        <img src={truck.image} alt={`${truck.family} ${truck.model}`} />
        <div>
          <p className="eyebrow">Detalhes do modelo</p>
          <h2 id="truck-modal-title">{truck.family}</h2>
          <h3>{truck.model}</h3>
          <p>{truck.detail}</p>
          <a className="primary-action" href="#proposta" onClick={onClose}>
            Solicitar proposta
          </a>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTruck, setActiveTruck] = useState<Truck | null>(null);

  const selectedTrucks = useMemo(
    () => trucks.filter((truck) => selectedIds.includes(truck.id)),
    [selectedIds],
  );

  function toggleTruck(truck: Truck) {
    setSelectedIds((current) =>
      current.includes(truck.id)
        ? current.filter((id) => id !== truck.id)
        : [...current, truck.id],
    );
  }

  return (
    <>
      <Header proposalCount={selectedIds.length} />
      <main className="landing-page">
        <Hero />
        <TruckCatalogue selectedIds={selectedIds} onToggle={toggleTruck} onDetails={setActiveTruck} />
        <OperationSection />
        <PlansSection />
        <AssistanceSection />
        <DealersSection />
        <FaqSection />
      </main>
      <Footer />
      <ProposalSummary selectedTrucks={selectedTrucks} onClear={() => setSelectedIds([])} />
      <FloatingActionButton />
      {activeTruck ? <DetailModal truck={activeTruck} onClose={() => setActiveTruck(null)} /> : null}
    </>
  );
}
