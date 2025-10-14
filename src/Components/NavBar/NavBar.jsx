import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const cx = ({ isActive }) => "nav__link" + (isActive ? " is-active" : "");

  return (
    <nav className="nav">
      {/* Branding superior */}
      <div className="nav__brand">
        <img src="./The_Simpsons_yellow_logo.svg" alt="logo" />
      </div>

      <ul className="nav__list">
        <li>
          <NavLink to="/" end className={cx}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/personajes" className={cx}>
            Personajes
          </NavLink>
        </li>
        <li>
          <NavLink to="/lugares" className={cx}>
            Lugares
          </NavLink>
        </li>
        <li>
          <NavLink to="/episodios" className={cx}>
            Episodios
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
