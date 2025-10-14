import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../Components/Loader/Loader";

export default function PersonajeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const personajeFromState = location.state?.personaje || null;

  const { data, loading, error } = useFetch(
    (signal) => personajeFromState ? Promise.resolve(personajeFromState) : api.characters.getById(id, { signal }),
    [id] // si llega personaje por state, no fetch
  );

  if (loading) return <Loader />;
  if (error) return (
    <div style={{ padding: 20 }}>
      <p>Error: {error}</p>
      <Link to="/personajes">← Volver a personajes</Link>
    </div>
  );
  if (!data) return (
    <div style={{ padding: 20 }}>
      <p>Personaje no disponible.</p>
      <Link to="/personajes">← Volver</Link>
    </div>
  );

  const p = data;
  return (
    <div style={{ padding: 20 }}>
      <img
        src={`https://cdn.thesimpsonsapi.com/500${p.portrait_path}`}
        alt={p.name}
        style={{ maxWidth: 300, borderRadius: 12 }}
      />
      <h2>{p.name}</h2>
      <p><strong>Ocupación:</strong> {p.occupation || "Desconocida"}</p>
      <p><strong>Estado:</strong> {p.status || "Desconocido"}</p>
      <p><strong>Frases:</strong></p>
      <ul>
        {(p.phrases || []).length ? p.phrases.map((f, i) => <li key={i}>{f}</li>) : <li>No hay frases</li>}
      </ul>
      <Link to="/personajes">← Volver a personajes</Link>
    </div>
  );
}
