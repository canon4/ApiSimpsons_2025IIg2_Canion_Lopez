import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import PersonajesPage from "./pages/PersonajesPage/PersonajesPage";
import PersonajeDetail from "./pages/PersonajeDetail/PersonajeDetail";
import LocacionesPage from "./pages/LocacionesPage/LocacionesPage";
import EpisodiosPage from "./pages/EpisodiosPage/EpisodiosPage";
import NotFound from "./pages/NotFound/NotFound";
import SplashScreen from "./Components/SplashScreen/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <HashRouter>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {/*  NavBar persiste en TODAS las rutas */}
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personajes" element={<PersonajesPage />} />
          <Route path="/personaje/:id" element={<PersonajeDetail />} />
          <Route path="/lugares" element={<LocacionesPage />} />
          <Route path="/episodios" element={<EpisodiosPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/*Footer también persiste */}
      <Footer />
    </HashRouter>
  );
}
