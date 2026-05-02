/* eslint-disable @next/next/no-img-element */

import { footerTruckLinks } from "@/data/landing";

const asset = (name: string) => `/assets/figma/${name}`;

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
        {links.map((link, index) =>
          disabledLinks ? (
            <span className="static-link" key={`${link}-${index}`}>
              {link}
            </span>
          ) : (
            <a href="#top" key={`${link}-${index}`}>
              {link}
            </a>
          ),
        )}
      </div>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" data-motion="fade">
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
            links={["O que é o VW Truck Rental", "Como funciona", "Perguntas frequentes"]}
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
