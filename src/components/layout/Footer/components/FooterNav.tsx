import React from "react";
import { footerData, type FooterColumn } from "./footerData";
import "./FooterNav.scss";

export const FooterNav: React.FC = () => {
  return (
    <section className="footer-nav">
      <div className="footer-container">
        {footerData.map((column: FooterColumn) => (
          <div key={column.id} className="footer-column">
            <h3 className="column-title">{column.title}</h3>
            <ul className="links-list">
              {column.links.map((link) => (
                <li key={link.id} className="link-item">
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};