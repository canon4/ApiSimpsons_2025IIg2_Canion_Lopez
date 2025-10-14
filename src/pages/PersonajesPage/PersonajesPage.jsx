import React, { useEffect, useMemo, useState } from "react";
import CardPersonaje from "../../Components/CardPersonaje/CardPersonaje.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./PersonajesPage.css";

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(null);

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setDebounced(query.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page) });
    if (debounced) {
      params.set("name", debounced);
      params.set("search", debounced);
    }

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://thesimpsonsapi.com/api/characters?${params.toString()}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Error al obtener personajes");
        const data = await res.json();
        const results = Array.isArray(data) ? data : data.results || [];
        setPersonajes(results);
        setPages(data.pages || 1);
        setCount(data.count ?? null);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [page, debounced]);

  const visible = useMemo(() => {
    if (!debounced) return personajes;
    const q = debounced.toLowerCase();
    return personajes.filter((p) =>
      String(p.name || "").toLowerCase().includes(q)
    );
  }, [personajes, debounced]);

  const hasPrev = page > 1;
  const hasNext = page < pages;

  if (loading) return <Loader />;
  if (error) return <p className="personajes-error">Error: {error}</p>;

  return (
    <section className="personajes-page">
      <div className="personajes-header">
        <h1 className="personajes-title">Personajes</h1>

        <form
          className="personajes-search"
          onSubmit={(e) => {
            e.preventDefault();
            setDebounced(query.trim());
            setPage(1);
          }}
          role="search"
        >
          <input
            className="personajes-search__input"
            type="search"
            placeholder="Buscar por nombre…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar personaje por nombre"
          />
          {query && (
            <button
              type="button"
              className="personajes-search__clear"
              onClick={() => {
                setQuery("");
                setDebounced("");
                setPage(1);
              }}
              aria-label="Limpiar búsqueda"
              title="Limpiar"
            >
              ×
            </button>
          )}
          <button className="personajes-search__submit" type="submit">
            Buscar
          </button>
        </form>
      </div>

      <p className="personajes-counter">
        Mostrando <strong>{visible.length}</strong>
        {count != null ? (
          <>
            {" "}
            de <strong>{count}</strong>
          </>
        ) : null}
        &nbsp;· Página <strong>{page}</strong> de <strong>{pages}</strong>
      </p>

      {visible.length ? (
        <div className="cards-grid">
          {visible.map((p) => (
            <CardPersonaje key={p.id} personaje={p} />
          ))}
        </div>
      ) : (
        <p className="personajes-empty">No hay personajes para esta búsqueda.</p>
      )}

      <div className="personajes-pagination">
        <Pagination
          mode="simple"
          currentPage={page}
          onPrev={() => hasPrev && setPage((p) => p - 1)}
          onNext={() => hasNext && setPage((p) => p + 1)}
          disablePrev={!hasPrev}
          disableNext={!hasNext}
        />
        <span className="page-indicator">
          Página {page} de {pages}
        </span>
      </div>
    </section>
  );
}
