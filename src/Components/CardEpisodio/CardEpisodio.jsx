import React from "react";
import "./CardEpisodio.css";

const CardEpisodio = ({ episodio }) => {
  // Generar la URL de imagen
  const imageUrl = `https://cdn.thesimpsonsapi.com/200/episode/${episodio.id}.webp`;

  return (
    <article className="episode-card">
      <div className="episode-card__image">
        <img
          src={imageUrl}
          alt={episodio.name}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png";
          }}
        />
      </div>
      <h3 className="episode-card__title">{episodio.name}</h3>

      <div className="episode-card__chips">
        <span className="episode-chip" data-variant="season">
          Temporada {episodio.season ?? "?"}
        </span>
        <span className="episode-chip" data-variant="number">
          Episodio {episodio.episode_number ?? episodio.episode ?? "?"}
        </span>
      </div>

      <div className="episode-air">
        Emitido: {episodio.airdate || episodio.air_date || "Sin fecha"}
      </div>
    </article>
  );
};

export default CardEpisodio;
