import React, { useMemo, useState } from "react";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import "./LocacionesPage.css";

export default function LocacionesPage() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const { data, loading, error } = useFetch(
    (signal) => api.locations.list({ page, signal }),
    [page]
  );

  const items = data?.items || data?.results || [];
  const pages = data?.pages ?? 1;

  // 🔍 Filtro por nombre
  const { list, totalInPage } = useMemo(() => {
    const filtered = q.trim()
      ? items.filter((l) =>
          String(l.name || "")
            .toLowerCase()
            .includes(q.trim().toLowerCase())
        )
      : items;
    return { list: filtered, totalInPage: items.length };
  }, [items, q]);

  if (loading) return <Loader />;
  if (error) return <p className="locations__error">Error: {error}</p>;
  if (!items.length)
    return <p className="locations__empty">No hay locaciones.</p>;

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
        Mostrando <strong>{list.length}</strong> de{" "}
        <strong>{totalInPage}</strong> · Página <strong>{page}</strong> de{" "}
        <strong>{pages}</strong>
      </p>

      {/* === GRID DE LOCACIONES === */}
      <div className="locations__grid">
        {list.map((l) => {
          const imageUrl = l.image_path
            ? `https://cdn.thesimpsonsapi.com/500${l.image_path}`
            : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

          return (
            <article key={l.id} className="location-card">
              <img
                src={imageUrl}
                alt={l.name}
                className="location-card__image"
                loading="lazy"
              />
              <div className="location-card__body">
                <h3 className="location-card__title">{l.name}</h3>
                {l.town && (
                  <p className="location-card__info">
                    <strong>Pueblo:</strong> {l.town}
                  </p>
                )}
                {l.use && (
                  <p className="location-card__info">
                    <strong>Uso:</strong> {l.use}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* === PAGINACIÓN === */}
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
    </section>
  );
}
