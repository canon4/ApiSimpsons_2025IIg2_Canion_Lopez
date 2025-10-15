import React from "react";
import "./CardLocacion.css";

const CardLocacion = ({ locacion }) => {
  const imageUrl = locacion.image_path
    ? `https://cdn.thesimpsonsapi.com/500${locacion.image_path}`
    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

  return (
    <article className="location-card">
      <img
        src={imageUrl}
        alt={locacion.name}
        className="location-card__image"
        loading="lazy"
      />
      <div className="location-card__body">
        <h3 className="location-card__title">{locacion.name}</h3>
        {locacion.town && (
          <p className="location-card__info">
            <strong>Pueblo:</strong> {locacion.town}
          </p>
        )}
        {locacion.use && (
          <p className="location-card__info">
            <strong>Uso:</strong> {locacion.use}
          </p>
        )}
      </div>
    </article>
  );
};

export default CardLocacion;
