import React, { useState, useEffect } from "react";
import "./CardPersonaje.css";

const CardPersonaje = ({ data }) => {
  const [fraseActual, setFraseActual] = useState("");
  const [frases, setFrases] = useState([]);

  useEffect(() => {
    setFrases(data.phrases || []);
  }, [data]);

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
        src={`https://cdn.thesimpsonsapi.com/500${data.portrait_path}`}
        alt={data.name}
        className="card-img"
      />
      <div className="card-body">
        <h2 className="name">{data.name}</h2>
        <p>
          <strong>Edad:</strong> {data.age}
        </p>
        <p>
          <strong>Fecha de nacimiento:</strong> {data.birthdate}
        </p>
        <button onClick={mostrarFrase}>🎙️ Decir frase</button>
        {fraseActual && <p className="frase">“{fraseActual}”</p>}
      </div>
    </div>
  );
};

export default CardPersonaje;
