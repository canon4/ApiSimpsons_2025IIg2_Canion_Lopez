import React from "react";
import { useState, useEffect } from "react";
import CardPersonaje from "../../assets/Components/CardPersonaje/CardPersonaje";
import "./PersonajesPage.css";

const PersonajesPage = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://thesimpsonsapi.com/api/characters")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  return (
    <>
      <div className="personajes-container">
        {characters.length > 0 ? (
          characters.map((character) => (
            <CardPersonaje key={character.id} data={character} />
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </>
  );
};

export default PersonajesPage;
