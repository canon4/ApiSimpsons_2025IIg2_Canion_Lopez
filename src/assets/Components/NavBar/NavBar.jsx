import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      {/* <div className="hero_nav">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/0/0d/Simpsons_FamilyPicture.png"
          alt="Logo Simpsons"
        />
      </div> */}
      <ul>
        <li>
          <Link to="/personajes">Personajes</Link>
        </li>
        <li>
          <Link to="/locaciones">Locaciones</Link>
        </li>
        <li>
          <Link to="/episodios">Episodios</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
