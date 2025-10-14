import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import "./PersonajeDetail.css"; // 👈 Importa los estilos

export default function PersonajeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const personajeFromState = location.state?.personaje || null;

  const { data, loading, error } = useFetch(
    (signal) =>
      personajeFromState
        ? Promise.resolve(personajeFromState)
        : api.characters.getById(id, { signal }),
    [id]
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="detail" style={{ padding: 20 }}>
        <p>Error: {error}</p>
        <Link to="/personajes" className="detail__back">
          ← Volver a personajes
        </Link>
      </div>
    );
  if (!data)
    return (
      <div className="detail" style={{ padding: 20 }}>
        <p>Personaje no disponible.</p>
        <Link to="/personajes" className="detail__back">
          ← Volver
        </Link>
      </div>
    );

  const p = data;

  return (
    <div className="detail">
      {/* Imagen del personaje */}
      <img
        className="detail__img"
        src={`https://cdn.thesimpsonsapi.com/500${p.portrait_path}`}
        alt={p.name}
      />

      {/* Información del personaje */}
      <div>
        <h2 className="detail__title">{p.name}</h2>

        {/* Badges */}
        <div className="detail__badges">
          <span className="badge" title="Ocupación">
            {p.occupation || "Desconocida"}
          </span>
          <span className="badge" data-variant="status" title="Estado">
            {p.status || "Desconocido"}
          </span>
        </div>

        {/* Frases */}
        <div className="detail__quotes">
          <ul>
            {(p.phrases || []).length ? (
              p.phrases.map((f, i) => <li key={i}>{f}</li>)
            ) : (
              <li>No hay frases registradas.</li>
            )}
          </ul>
        </div>

        {/* Botón volver */}
        <Link to="/personajes" className="detail__back">
          ← Volver a personajes
        </Link>
      </div>
    </div>
  );
}
