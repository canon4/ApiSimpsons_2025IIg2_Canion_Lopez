import React, { useState } from "react";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import CardPersonaje from "../../components/CardPersonaje/CardPersonaje";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";

export default function PersonajesPage() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  const { data, loading, error } = useFetch(
    (signal) => api.characters.list({ page, name, signal }),
    [page, name]
  );

  const personajes = data?.items ?? [];
  const pages = data?.pages ?? 1;

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!personajes.length) return (
    <div style={{ padding: 20 }}>
      <h2>Personajes</h2>
      <SearchBox name={name} onChange={(v) => { setPage(1); setName(v); }} />
      <p>No hay personajes.</p>
    </div>
  );

  const hasPrev = page > 1;
  const hasNext = page < pages;

  return (
    <div className="personajes-page" style={{ padding: 20 }}>
      <h2>Personajes</h2>

      <SearchBox name={name} onChange={(v) => { setPage(1); setName(v); }} />

      <div className="cards-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1rem",
        marginTop: 12
      }}>
        {personajes.map((p) => <CardPersonaje key={p.id} personaje={p} />)}
      </div>

      <Pagination
        mode="simple"
        currentPage={page}
        onPrev={() => hasPrev && setPage((x) => x - 1)}
        onNext={() => hasNext && setPage((x) => x + 1)}
        disablePrev={!hasPrev}
        disableNext={!hasNext}
      />
    </div>
  );
}

function SearchBox({ name, onChange }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <input
        placeholder="Buscar por nombre..."
        value={name}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", width: 280 }}
      />
    </div>
  );
}
