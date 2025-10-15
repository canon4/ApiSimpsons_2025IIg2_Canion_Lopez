import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__wave" />

      <div className="site-footer__inner">
        {/* Brand */}
        <div className="f-col brand">
          <div className="brand__row">
            <span className="brand__dot" />
            <h4>
              Simpsons <span>API</span>
            </h4>
          </div>
          <p className="brand__subtitle">
            Proyecto académico — React + Router + Fetch
          </p>
        </div>

        {/* Navegación rápida */}
        <nav className="f-col quick">
          <h5>Explora</h5>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/personajes">Personajes</Link>
            </li>
            <li>
              <Link to="/lugares">Lugares</Link>
            </li>
            <li>
              <Link to="/episodios">Episodios</Link>
            </li>
          </ul>
        </nav>

        <div className="f-col credits">
          <h5>Créditos</h5>
          <p>© {year} – Ingeniería de Sistemas</p>
          <p>Universidad de la Amazonia</p>
          <p>Desarrolado Por:</p>
          <h5>
            <b>Diego Cañon </b>
          </h5>
          <h5>Jaderson Lopez</h5>
        </div>
      </div>
    </footer>
  );
}
