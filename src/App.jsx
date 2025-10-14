
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import PersonajesPage from "./pages/PersonajesPage/PersonajesPage";
import PersonajeDetail from "./pages/PersonajeDetail/PersonajeDetail";
import LocacionesPage from "./pages/LocacionesPage/LocacionesPage";
import EpisodiosPage from "./pages/EpisodiosPage/EpisodiosPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* 🚩 NavBar persiste en TODAS las rutas */}
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personajes" element={<PersonajesPage />} />
          <Route path="/personaje/:id" element={<PersonajeDetail />} />
          <Route path="/lugares" element={<LocacionesPage />} />
          <Route path="/episodios" element={<EpisodiosPage />} />
        </Routes>
      </main>

      {/* 🚩 Footer también persiste */}
      <Footer />
    </BrowserRouter>
  );
}
