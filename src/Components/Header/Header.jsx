import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="hero">
      <div className="hero__content">
        <h1 className="hero__title">The Simpsons API Explorer</h1>
        <p className="hero__subtitle">
          Explora personajes, lugares y episodios con React + Router + Fetch
        </p>
        <div className="hero__chips">
          <span className="chip">React</span>
          <span className="chip">Vite</span>
          <span className="chip">API pública</span>
          <span className="chip">Responsive</span>
        </div>
      </div>
    </header>
  );
}
