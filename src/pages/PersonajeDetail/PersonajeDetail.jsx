import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

export default function PersonajeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [personaje, setPersonaje] = useState(location.state?.personaje || null);
  const [loading, setLoading] = useState(!personaje);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (personaje) return;
    setLoading(true);
    // Intentar obtener por id (si la API lo permite). Si no, mostrar mensaje.
    fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("No se encontró el personaje (endpoint id no disponible)");
        return res.json();
      })
      .then(data => setPersonaje(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, personaje]);

  if (loading) return <p>Cargando personaje...</p>;
  if (error) return (
    <div>
      <p>Error: {error}</p>
      <p>Vuelve a la lista y selecciona el personaje.</p>
      <Link to="/personajes">← Volver a personajes</Link>
    </div>
  );
  if (!personaje) return (
    <div>
      <p>Personaje no disponible.</p>
      <Link to="/personajes">← Volver</Link>
    </div>
  );

  return (
    <div style={{padding:20}}>
      <img src={`https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`} alt={personaje.name} style={{maxWidth:300}} />
      <h2>{personaje.name}</h2>
      <p><strong>Ocupación:</strong> {personaje.occupation || "Desconocida"}</p>
      <p><strong>Estado:</strong> {personaje.status || "Desconocido"}</p>
      <p><strong>Frases:</strong></p>
      <ul>
        {(personaje.phrases || []).length ? personaje.phrases.map((f,i) => <li key={i}>{f}</li>) : <li>No hay frases</li>}
      </ul>
      <Link to="/personajes">← Volver a personajes</Link>
    </div>
  );
}
