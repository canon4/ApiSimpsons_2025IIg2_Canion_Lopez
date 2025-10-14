import React, { useEffect, useState } from "react";
import CardPersonaje from "../../Components/CardPersonaje/CardPersonaje.jsx";
import Pagination from "../../Components/Pagination/Pagination.jsx";
import Loader from "../../Components/Loader/Loader.jsx";

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);   // total de páginas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const API_URL = `https://thesimpsonsapi.com/api/characters?page=${page}`;

    setLoading(true);
    setError(null);

    fetch(API_URL, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener personajes");
        return res.json();
      })
      .then(data => {
        setPersonajes(Array.isArray(data) ? data : (data.results || []));
        setPages(data.pages || 1);
      })
      .catch(err => { if (err.name !== "AbortError") setError(err.message); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!personajes.length) return <p>No hay personajes.</p>;

  const hasPrev = page > 1;
  const hasNext = page < pages;

  return (
    <div className="personajes-page" style={{ padding: 20 }}>
      <div className="cards-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1rem"
      }}>
        {personajes.map(p => <CardPersonaje key={p.id} personaje={p} />)}
      </div>

      <Pagination
        mode="simple"
        currentPage={page}
        onPrev={() => hasPrev && setPage(p => p - 1)}
        onNext={() => hasNext && setPage(p => p + 1)}
        disablePrev={!hasPrev}
        disableNext={!hasNext}
      />
    </div>
  );
}
