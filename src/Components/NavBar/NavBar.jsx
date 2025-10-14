import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/personajes">Personajes</Link></li>
        <li><Link to="/lugares">Lugares</Link></li>
        <li><Link to="/episodios">Episodios</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
