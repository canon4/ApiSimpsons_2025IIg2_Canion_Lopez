import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTES
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";

// PÁGINAS
import Home from "./pages/Home/Home";
import Characters from "./pages/PersonajesPage/PersonajesPage";
import CharacterDetail from "./pages/PersonajeDetail/PersonajeDetail";
import Locations from "./pages/LocacionesPage/LocacionesPage";
import Episodes from "./pages/EpisodiosPage/EpisodiosPage";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main style={{ minHeight: "70vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personajes" element={<Characters />} />
          <Route path="/personaje/:id" element={<CharacterDetail />} />
          <Route path="/lugares" element={<Locations />} />
          <Route path="/episodios" element={<Episodes />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
