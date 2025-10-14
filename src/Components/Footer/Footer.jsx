import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <span className="dot"></span>
          <h4>ApiSimpsons</h4>
        </div>

        <div className="footer-text">
          <p>© {year} – Ingeniería de Sistemas | Universidad de la Amazonia</p>
          <p className="subtext">Proyecto académico realizado con React + Router + Fetch API</p>
        </div>
      </div>
    </footer>
  );
}
