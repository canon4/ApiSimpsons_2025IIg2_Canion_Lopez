import React, { useMemo, useState } from "react";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import "./LocacionesPage.css";

/* Enriquecimiento inline (sin archivos extra) */
const LOCATIONS_EXTRA = {
  "742 Evergreen Terrace": {
    type: "Residencia",
    description: "Casa de la familia Simpson desde la primera temporada."
  },
  "Moe's Tavern": {
    type: "Bar",
    description: "La taberna de Moe Szyslak; sitio habitual de Homero."
  },
  "Springfield Nuclear Power Plant": {
    type: "Planta nuclear",
    description: "Lugar de trabajo de Homero; propiedad del Sr. Burns."
  },
  "Springfield Elementary School": {
    type: "Escuela",
    description: "Escuela de Bart y Lisa; a cargo de Seymour Skinner."
  },
  "Kwik-E-Mart": {
    type: "Tienda",
    description: "Minisúper atendido por Apu Nahasapeemapetilon."
  },
  "Springfield Police Station": {
    type: "Estación de policía",
    description: "Sede del Jefe Wiggum y su equipo."
  },
  "Springfield General Hospital": {
    type: "Hospital",
    description: "Centro médico principal de la ciudad."
  },
  "Krusty Burger": {
    type: "Restaurante",
    description: "Cadena de comida rápida de Krusty el Payaso."
  },
  "Springfield Town Hall": {
    type: "Ayuntamiento",
    description: "Oficinas del alcalde Quimby y administración local."
  },
  "Springfield Cemetery": {
    type: "Cementerio",
    description: "Camposanto con varias referencias a la serie."
  }
};

function enrich(loc) {
  const extra = LOCATIONS_EXTRA[loc.name];
  return extra
    ? {
        ...loc,
        type: loc.type || extra.type,
        description: loc.description || extra.description,
      }
    : loc;
}

export default function LocacionesPage() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const { data, loading, error } = useFetch(
    (signal) => api.locations.list({ page, signal }),
    [page]
  );

  const items = data?.items ?? [];
  const pages = data?.pages ?? 1;

  // Enriquecer + filtrar por nombre (solo página actual)
  const { list, totalInPage } = useMemo(() => {
    const enriched = items.map(enrich);
    const filtered = q.trim()
      ? enriched.filter((l) =>
          String(l.name || "").toLowerCase().includes(q.trim().toLowerCase())
        )
      : enriched;
    return { list: filtered, totalInPage: enriched.length };
  }, [items, q]);

  if (loading) return <Loader />;
  if (error) return <p className="locations__error">Error: {error}</p>;
  if (!items.length) return <p className="locations__empty">No hay locaciones.</p>;

  const hasPrev = page > 1;
  const hasNext = page < pages;

  return (
    <section className="locations">
      <div className="locations__header">
        <h1 className="locations__title">Lugares de Springfield</h1>
        <input
          className="locations__search-input"
          type="search"
          placeholder="Buscar por nombre…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar lugar por nombre"
        />
      </div>

      <p className="locations__counter">
        Mostrando <strong>{list.length}</strong> de <strong>{totalInPage}</strong> ·
        Página <strong>{page}</strong> de <strong>{pages}</strong>
      </p>

      <div className="locations__grid">
        {list.map((l) => {
          const typeText = String(l.type ?? "").trim();
          const descText = String(l.description ?? "").trim();
          const hasType = !!typeText;
          const hasDesc = !!descText;

          return (
            <article
              key={l.id}
              className={
                "location-card" + (!hasType && !hasDesc ? " location-card--compact" : "")
              }
            >
              <div className="location-card__header">
                <div className="location-card__icon" aria-hidden />
                <h3 className="location-card__title">{l.name}</h3>
              </div>

              {hasType && (
                <span className="location-chip" title="Tipo de lugar">
                  {typeText}
                </span>
              )}

              {hasDesc && <p className="location-card__desc">{descText}</p>}
            </article>
          );
        })}
      </div>

      <div className="locations__pagination">
        <Pagination
          mode="simple"
          currentPage={page}
          onPrev={() => hasPrev && setPage((x) => x - 1)}
          onNext={() => hasNext && setPage((x) => x + 1)}
          disablePrev={!hasPrev}
          disableNext={!hasNext}
        />
        <span className="locations__page-indicator">
          Página {page} de {pages}
        </span>
      </div>

      <p className="locations__note">
        *Los campos “tipo” y “descripción” dependen de la información disponible en la API pública. 
        Se agregan datos complementarios para lugares icónicos.*
      </p>
    </section>
  );
}
