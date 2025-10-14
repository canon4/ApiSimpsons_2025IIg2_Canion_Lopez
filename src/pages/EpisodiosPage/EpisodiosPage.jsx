import React, { useState } from "react";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Components/Pagination/Pagination";

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
  if (error) return <p>Error: {error}</p>;
  if (!episodios.length) return (
    <div style={{ padding: 20 }}>
      <h1>📺 Episodios de Los Simpsons</h1>
      <Filter season={season} onChange={(v) => { setPage(1); setSeason(v); }} />
      <p>No hay episodios.</p>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>📺 Episodios de Los Simpsons</h1>

      <Filter season={season} onChange={(v) => { setPage(1); setSeason(v); }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1rem",
        marginTop: 20
      }}>
        {episodios.map((ep) => (
          <div key={ep.id} style={{
            border: "2px solid #00bcd4",
            borderRadius: 12,
            background: "#e3f2fd",
            padding: "1rem",
            fontFamily: "'Comic Sans MS', sans-serif",
          }}>
            <h3 style={{ color: "#0d47a1" }}>{ep.name}</h3>
            <p><strong>Temporada:</strong> {ep.season ?? "?"}</p>
            <p><strong>Episodio:</strong> {ep.episode ?? "?"}</p>
            <p><strong>Emitido:</strong> {ep.air_date || "Sin fecha"}</p>
          </div>
        ))}
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

function Filter({ season, onChange }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <label htmlFor="season-select">Filtrar por temporada: </label>
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
