import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardPersonaje.css";

const CardPersonaje = ({ personaje }) => {
  const [fraseActual, setFraseActual] = useState("");
  const [frases, setFrases] = useState([]);

  useEffect(() => {
    setFrases(personaje?.phrases || []);
  }, [personaje]);

  const mostrarFrase = () => {
    if (!frases || frases.length === 0) {
      setFraseActual("Este personaje no tiene frases registradas 😅");
      return;
    }
    const randomIndex = Math.floor(Math.random() * frases.length);
    setFraseActual(frases[randomIndex]);
  };

  return (
    <div className="card">
      <img
        src={`https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`}
        alt={personaje.name}
        className="card-img"
      />
      <div className="card-body">
        <h2 className="name">{personaje.name}</h2>
        <p><strong>Edad:</strong> {personaje.age ?? "—"}</p>
        <p><strong>Fecha de nacimiento:</strong> {personaje.birthdate ?? "—"}</p>

        <button onClick={mostrarFrase}>🎙️ Decir frase</button>
        {fraseActual && <p className="frase">“{fraseActual}”</p>}

        <Link
          to={`/personaje/${personaje.id}`}
          state={{ personaje }}
          className="ver-mas-link"
        >
          🔍 Ver más
        </Link>
      </div>
    </div>
  );
};

export default CardPersonaje;
