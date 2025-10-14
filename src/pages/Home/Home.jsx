import React from "react";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="page-container">
        <h2 style={{ marginTop: 16 }}>¿Qué puedes explorar?</h2>
        <ul>
          <li><strong>Personajes:</strong> lista paginada (20/pg), detalle con imagen y frases.</li>
          <li><strong>Lugares:</strong> íconos de Springfield con tipo y descripción.</li>
          <li><strong>Episodios:</strong> temporada, número y fecha; filtro por temporada.</li>
        </ul>
        <p style={{ marginTop: 8 }}>
          Esta app usa <code>react-router-dom</code> para el ruteo y <code>fetch</code> para consumir la API.
        </p>
      </div>
    </>
  );
}
