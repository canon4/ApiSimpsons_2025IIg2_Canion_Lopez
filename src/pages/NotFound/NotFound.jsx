import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="notfound">
      <div className="notfound__content">
        <img
          className="notfound__img"
          src="https://i.pinimg.com/474x/17/01/77/170177e2f0a024564a2f78db42599e23.jpg"
          alt="Homero diciendo D'oh"
        />
        <h1 className="notfound__title">404 - ¡D'oh!</h1>
        <p className="notfound__text">
          No encontramos la página que buscas. ¡Parece que Homero rompió algo
          otra vez!
        </p>
        <Link to="/" className="notfound__link">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
