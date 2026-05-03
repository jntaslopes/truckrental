"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { TruckImageStack } from "@/components/TruckImageStack";
import { sanitizeProposalQuantity } from "@/features/proposal/model";
import { useProposal } from "@/features/proposal/ProposalProvider";
import type { ProposalConsents, ProposalContact } from "@/features/proposal/types";

const asset = (name: string) => `/assets/figma/${name}`;

const initialContact: ProposalContact = {
  name: "",
  email: "",
  phone: "",
  document: "",
  postalCode: "",
  contactPreference: "WhatsApp",
};

const initialConsents: ProposalConsents = {
  marketing: false,
  legal: false,
};

export function ProposalDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { selectedItems, removeTruck, setQuantity } = useProposal();
  const [contact, setContact] = useState<ProposalContact>(initialContact);
  const [consents, setConsents] = useState<ProposalConsents>(initialConsents);
  const [isPreviewAcknowledged, setIsPreviewAcknowledged] = useState(false);

  const selectedLabel = useMemo(
    () =>
      selectedItems.length === 1 ? "1 modelo selecionado" : `${selectedItems.length} modelos selecionados`,
    [selectedItems.length],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
  }, [isOpen]);

  if (!isOpen || selectedItems.length === 0) {
    return null;
  }

  function updateContact<K extends keyof ProposalContact>(field: K, value: ProposalContact[K]) {
    setContact((current) => ({ ...current, [field]: value }));
  }

  function updateConsent<K extends keyof ProposalConsents>(field: K, value: ProposalConsents[K]) {
    setConsents((current) => ({ ...current, [field]: value }));
  }

  function handleQuantityChange(id: string, event: ChangeEvent<HTMLInputElement>) {
    setQuantity(id, sanitizeProposalQuantity(Number(event.target.value) || 1));
  }

  function handlePreviewAction() {
    setIsPreviewAcknowledged(true);
  }

  function handleClose() {
    setIsPreviewAcknowledged(false);
    onClose();
  }

  return (
    <div className="proposal-drawer-backdrop" role="presentation" onClick={handleClose}>
      <div
        className="proposal-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-drawer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="proposal-drawer-header">
          <div>
            <h2 id="proposal-drawer-title">Prévia da solicitação de proposta</h2>
            <span aria-hidden="true" />
          </div>
          <button
            type="button"
            className="proposal-drawer-close"
            onClick={handleClose}
            aria-label="Fechar preview da proposta"
          >
            ×
          </button>
        </header>

        <div className="proposal-drawer-content">
          <p className="proposal-drawer-intro">
            Esta é uma prévia do fluxo final. Você pode selecionar caminhões e preencher os dados,
            mas nenhum envio real acontece nesta versão.
          </p>

          {isPreviewAcknowledged ? (
            <div className="proposal-submit-feedback success" role="status">
              <strong>Preview registrada localmente.</strong>
              <p>Os dados não foram enviados. Este passo continua apenas demonstrativo nesta versão.</p>
            </div>
          ) : null}

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
                  <button type="button" className="proposal-remove-item" onClick={() => removeTruck(truck.id)}>
                    <span className="proposal-remove-label">Remover</span>
                    <span className="proposal-remove-icon" aria-hidden="true">
                      ×
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="proposal-drawer-section">
            <h3>Informações gerais</h3>
            <div className="proposal-fields">
              <label className="floating-field">
                <input
                  name="name"
                  placeholder=" "
                  autoComplete="name"
                  value={contact.name}
                  onChange={(event) => updateContact("name", event.target.value)}
                />
                <span>Nome completo / Razão social</span>
              </label>
              <label className="floating-field">
                <input
                  name="email"
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  value={contact.email}
                  onChange={(event) => updateContact("email", event.target.value)}
                />
                <span>E-mail</span>
              </label>
              <label className="floating-field">
                <input
                  name="phone"
                  type="tel"
                  placeholder=" "
                  autoComplete="tel"
                  value={contact.phone}
                  onChange={(event) => updateContact("phone", event.target.value)}
                />
                <span>Telefone</span>
              </label>
              <label className="floating-field">
                <input
                  name="document"
                  placeholder=" "
                  value={contact.document}
                  onChange={(event) => updateContact("document", event.target.value)}
                />
                <span>CPF/CNPJ</span>
              </label>
              <label className="floating-field">
                <input
                  name="postalCode"
                  placeholder=" "
                  autoComplete="postal-code"
                  value={contact.postalCode}
                  onChange={(event) => updateContact("postalCode", event.target.value)}
                />
                <span>CEP do seu endereço</span>
              </label>
              <label className="floating-field">
                <select
                  name="contactPreference"
                  value={contact.contactPreference}
                  onChange={(event) =>
                    updateContact(
                      "contactPreference",
                      event.target.value as ProposalContact["contactPreference"],
                    )
                  }
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="E-mail">E-mail</option>
                  <option value="Telefone">Telefone</option>
                </select>
                <span>Preferência de contato</span>
              </label>
            </div>
          </section>

          <div className="proposal-consents">
            <label>
              <input
                className="ds-checkbox"
                type="checkbox"
                name="marketing"
                checked={consents.marketing}
                data-state="default"
                data-size="sm"
                onChange={(event) => updateConsent("marketing", event.target.checked)}
              />
              <span>Autorizo a utilização dos meus dados para marketing</span>
            </label>
            <label>
              <input
                className="ds-checkbox"
                type="checkbox"
                name="legal"
                checked={consents.legal}
                data-state="default"
                data-size="sm"
                onChange={(event) => updateConsent("legal", event.target.checked)}
              />
              <span>
                Li e concordo com as <a href="#top">Informações Legais</a> e com a{" "}
                <a href="#top">Política de Privacidade</a>
              </span>
            </label>
          </div>
        </div>

        <footer className="proposal-drawer-footer">
          <button type="button" className="proposal-cancel" onClick={handleClose}>
            Fechar
          </button>
          <button type="button" className="proposal-submit" onClick={handlePreviewAction}>
            Solicitar proposta
            <img
              className="action-icon button-icon button-icon-on-dark"
              src={asset("icon-arrow-right.svg")}
              alt=""
            />
          </button>
        </footer>
      </div>
    </div>
  );
}
