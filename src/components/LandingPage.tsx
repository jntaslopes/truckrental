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
}: {
  truck: Truck;
  selected: boolean;
  onToggle: (truck: Truck) => void;
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
        <Link className="text-link" href={`/caminhoes/${truck.slug}`}>
          Ver detalhes
          <img src={asset("icon-arrow-right.svg")} alt="" />
        </Link>
      </div>
    </article>
  );
}

function TruckCatalogue({
  selectedIds,
  onToggle,
}: {
  selectedIds: string[];
  onToggle: (truck: Truck) => void;
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
        <div className="comparison-heading">
          <h2>
            Assinatura <span>vs compra de frota</span>
          </h2>
          <p>Veja como cada modelo impacta seu custo mensal e total ao longo do contrato.</p>
        </div>

        <div className="comparison-content">
          <div className="comparison-grid" aria-label="Comparativo entre assinatura e financiamento">
            <div className="comparison-fleet-card">
              <div className="comparison-fleet-copy">
                <h3>Frota por assinatura</h3>
                <p>Gestão completa com previsibilidade de custos</p>
                <div className="comparison-divider" />
                <span>Frota exemplo:</span>
                <small>10 caminhões para operação rodoviária</small>
              </div>
              <div className="comparison-trucks" aria-hidden="true">
                <img className="comparison-trucks-image" src={asset("comparison-trucks.png")} alt="" />
              </div>
            </div>

            <div className="comparison-feature comparison-feature-header comparison-feature-highlighted">
              <div className="comparison-ribbon">Mais previsibilidade para sua operação</div>
              <img className="comparison-wordmark" src={asset("comparison-wordmark.png")} alt="VW Truck Rental" />
              <div>
                <h3>
                  Frota por Assinatura
                  <img src={asset("comparison-icon-info.svg")} alt="" />
                </h3>
                <p>Gestão completa com previsibilidade de custos</p>
              </div>
            </div>

            <div className="comparison-feature comparison-feature-header comparison-feature-financing">
              <img className="comparison-vw-badge" src={asset("comparison-vw-badge.png")} alt="" />
              <div>
                <h3>
                  Financiamento
                  <img src={asset("comparison-icon-info.svg")} alt="" />
                </h3>
                <p>Aquisição do ativo com gestão própria</p>
              </div>
            </div>

            <div className="comparison-feature comparison-feature-list comparison-feature-highlighted">
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

          <a href="#catalogo" className="outline-cta centered">
            Ver todos os caminhões disponíveis
          </a>
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
      href: "#catalogo",
    },
    {
      icon: "icon-specialist.svg",
      title: "Fale com um especialista",
      copy: "Nossa equipe ajuda a montar a melhor solução para sua operação",
      cta: "Falar com um especialista",
      href: "#proposta",
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
                <a href={path.href} className="outline-cta">
                  {path.cta}
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="assistance-photo">
          <img src={asset("assistance-fleet.png")} alt="Atendimento Volkswagen Caminhões" />
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
        {links.map((link, index) => (
          <a href="#top" key={`${link}-${index}`}>{link}</a>
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
    <a href="#faq" className="fab" aria-label="Abrir WhatsApp">
      <img src={asset("icon-whatsapp.svg")} alt="" />
    </a>
  );
}

export function LandingPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
        <TruckCatalogue selectedIds={selectedIds} onToggle={toggleTruck} />
        <OperationSection />
        <PlansSection />
        <AssistanceSection />
        <DealersSection />
        <FaqSection />
      </main>
      <Footer />
      <ProposalSummary selectedTrucks={selectedTrucks} onClear={() => setSelectedIds([])} />
      <FloatingActionButton />
    </>
  );
}
