import React, { useState } from "react";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import "./EpisodiosPage.css";

export default function EpisodiosPage() {
  const [page, setPage] = useState(1);
  const [season, setSeason] = useState("");

  const { data, loading, error } = useFetch(
    (signal) => api.episodes.list({ page, season, signal }),
    [page, season]
  );

  const episodios = data?.items ?? [];
  const pages = data?.pages ?? 1;
  const hasPrev = page > 1;
  const hasNext = page < pages;

  if (loading) return <Loader />;
  if (error) return <p className="episodes">Error: {error}</p>;

  return (
    <section className="episodes">
      <h1 className="episodes__title">Episodios de Los Simpsons</h1>

      <Filter
        season={season}
        onChange={(v) => {
          setPage(1);
          setSeason(v);
        }}
      />

      {episodios.length === 0 ? (
        <p className="episodes__empty">No hay episodios.</p>
      ) : (
        <>
          <div className="episodes__grid">
            {episodios.map((ep) => (
              <article key={ep.id} className="episode-card">
                <h3 className="episode-card__title">{ep.name}</h3>

                <div>
                  <span className="episode-chip" data-variant="season">
                    Temporada {ep.season ?? "?"}
                  </span>
                  <span className="episode-chip" data-variant="number">
                    Episodio {ep.episode ?? "?"}
                  </span>
                </div>

                <div className="episode-air">
                  Emitido: {ep.air_date || "Sin fecha"}
                </div>

                {/* opcional, info adicional */}
                <div className="episode-card__footer">
                  <span>ID: {ep.id}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="episodes__pagination">
            <Pagination
              mode="simple"
              currentPage={page}
              onPrev={() => hasPrev && setPage((x) => x - 1)}
              onNext={() => hasNext && setPage((x) => x + 1)}
              disablePrev={!hasPrev}
              disableNext={!hasNext}
            />
          </div>
        </>
      )}
    </section>
  );
}

function Filter({ season, onChange }) {
  return (
    <div className="episodes__filter">
      <label htmlFor="season-select">Filtrar por temporada:</label>
      <select
        id="season-select"
        value={season}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas</option>
        {Array.from({ length: 35 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Temporada {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
