"use client";

/* eslint-disable @next/next/no-img-element */

import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  faqs,
  footerTruckLinks,
  navItems,
  trucks,
  type Truck,
} from "@/data/landing";

const asset = (name: string) => `/assets/figma/${name}`;

function toPositiveQuantity(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export type ProposalItem = {
  id: string;
  family: string;
  model: string;
  image: string;
  quantity: number;
};

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
  quantity,
  onToggle,
  onQuantityChange,
  onDetails,
}: {
  truck: Truck;
  selected: boolean;
  quantity: number;
  onToggle: (truck: Truck) => void;
  onQuantityChange: (id: string, quantity: number) => void;
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
        {selected ? (
          <div className="card-selection-row">
            <label className="floating-field card-quantity-field">
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onQuantityChange(truck.id, toPositiveQuantity(event.target.value))
                }
              />
              <span>Qtd.</span>
            </label>
            <span className="card-selection-divider" aria-hidden="true" />
            <button className="card-remove-link" type="button" onClick={() => onToggle(truck)}>
              <span className="card-remove-label">Remover</span>
              <span className="card-remove-icon" aria-hidden="true">×</span>
            </button>
          </div>
        ) : (
          <button className="text-link" onClick={() => onToggle(truck)}>
            Adicionar à proposta
            <img className="action-icon text-link-icon" src={asset("icon-add.svg")} alt="" />
          </button>
        )}
        <button className="text-link" onClick={() => onDetails(truck)}>
          Ver detalhes
          <img className="action-icon text-link-icon" src={asset("icon-arrow-right.svg")} alt="" />
        </button>
      </div>
    </article>
  );
}

function TruckCatalogue({
  selectedIds,
  quantities,
  onToggle,
  onQuantityChange,
  onDetails,
}: {
  selectedIds: string[];
  quantities: Record<string, number>;
  onToggle: (truck: Truck) => void;
  onQuantityChange: (id: string, quantity: number) => void;
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
              quantity={quantities[truck.id] ?? 1}
              onToggle={onToggle}
              onQuantityChange={onQuantityChange}
              onDetails={onDetails}
            />
          ))}
        </div>
        <a href="#proposta" className="outline-cta centered">
          Explorar todos os modelos
          <img className="action-icon button-icon" src={asset("icon-add.svg")} alt="" />
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
              <span>Três formas de</span>
              {" "}
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
            <label className="floating-field dealer-field" htmlFor="dealer-city">
              <input id="dealer-city" defaultValue="São Paulo, SP" placeholder=" " />
              <span>Encontre uma Concessionária</span>
            </label>
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
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-image">
        <img src={asset("faq-truck.png")} alt="Caminhão Volkswagen em operação" />
      </div>
      <div className="faq-panel">
        <p className="eyebrow">Perguntas frequentes</p>
        <h2>Perguntas frequentes sobre o VW Truck Rental</h2>
        <div className="accordion">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="accordion-item" key={item.question}>
                <button onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span>{index + 1}. {item.question}</span>
                  <span className="accordion-icon">{isOpen ? "-" : "+"}</span>
                </button>
                <p className={isOpen ? "open" : ""}>{item.answer}</p>
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
  onSubmit,
}: {
  selectedItems: ProposalItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onSubmit: () => void;
}) {
  const selectedLabel = selectedItems.length === 1 ? "1 modelo selecionado" : `${selectedItems.length} modelos selecionados`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
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
                    <img src={truck.image} alt="" />
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
            <input className="ds-checkbox" type="checkbox" name="marketing" />
            <span>Autorizo a utilização dos meus dados para Marketing</span>
          </label>
          <label>
            <input className="ds-checkbox" type="checkbox" name="legal" />
            <span>
              Li e concordo com as <a href="#top">Informações Legais</a> e com a <a href="#top">Política de Privacidade</a>
            </span>
          </label>
        </div>

        <footer className="proposal-drawer-footer">
          <button type="button" className="proposal-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="proposal-submit">
            Solicitar Proposta
            <img className="action-icon button-icon button-icon-on-dark" src={asset("icon-arrow-right.svg")} alt="" />
          </button>
        </footer>
      </form>
    </div>
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
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeTruck, setActiveTruck] = useState<Truck | null>(null);
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
          onDetails={setActiveTruck}
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
      <FloatingActionButton />
      {activeTruck ? <DetailModal truck={activeTruck} onClose={() => setActiveTruck(null)} /> : null}
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
