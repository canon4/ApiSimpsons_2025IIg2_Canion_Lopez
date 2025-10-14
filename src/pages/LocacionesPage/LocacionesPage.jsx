import React, { useState } from "react";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Components/Pagination/Pagination";

export default function LocacionesPage() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(
    (signal) => api.locations.list({ page, signal }),
    [page]
  );

  const locaciones = data?.items ?? [];
  const pages = data?.pages ?? 1;
  const hasPrev = page > 1;
  const hasNext = page < pages;

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!locaciones.length) return <p style={{ padding: 20 }}>No hay locaciones.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🏙️ Lugares de Springfield</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1rem",
        marginTop: 20
      }}>
        {locaciones.map((l) => (
          <div key={l.id} style={{
            border: "2px solid #ffcc00",
            borderRadius: 12,
            background: "#fff8dc",
            padding: "1rem",
            textAlign: "center",
            fontFamily: "'Comic Sans MS', sans-serif",
          }}>
            <h3 style={{ color: "#003366" }}>{l.name}</h3>
            <p><strong>Tipo:</strong> {l.type || "No especificado"}</p>
            <p style={{ fontSize: "0.9rem" }}>
              {l.description || "Sin descripción disponible."}
            </p>
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
