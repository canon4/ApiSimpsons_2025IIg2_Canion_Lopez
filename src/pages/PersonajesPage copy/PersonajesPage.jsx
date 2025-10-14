import React, { useEffect, useState } from "react";
import CardPersonaje from "../../Components/CardPersonaje/CardPersonaje.jsx";
import Pagination from "../../Components/Pagination/Pagination.jsx";

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // paginación
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // --- Ajusta la URL al endpoint que usan en el repo ---
    const API_URL = "https://thesimpsonsapi.com/api/characters"; // ejemplo, reemplaza si tu repo usa otra
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener personajes");
        return res.json();
      })
      .then((data) => {
        setPersonajes(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // lógica de slice para la página actual
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = personajes.slice(indexFirst, indexLast);

  if (loading) return <p>Cargando personajes...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!personajes.length) return <p>No hay personajes.</p>;

  return (
    <div className="personajes-page">
      <div className="cards-grid">
        {currentItems.map((p) => (
          <CardPersonaje key={p.id} personaje={p} />
        ))}
      </div>

      <Pagination
        totalItems={personajes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
