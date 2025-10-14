import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound__content">
        <img
          className="notfound__img"
          src="https://i.pinimg.com/474x/17/01/77/170177e2f0a024564a2f78db42599e23.jpg"
          alt="Homero diciendo D'oh"
        />
        <div className="notfound__info">
          <h1 className="notfound__title">404 - ¡D’oh!</h1>
          <p className="notfound__text">
            Parece que Homero rompió algo… ¡No encontramos esta página!
          </p>
          <Link to="/" className="notfound__link">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
