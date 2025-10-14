import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>© {year} ApiSimpsons – Ingeniería de Sistemas</p>
        <p className="site-footer__link">
          Proyecto académico | React + Router + Fetch
        </p>
      </div>
    </footer>
  );
}
