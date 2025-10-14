import React from "react";
import Header from "../../Components/Header/Header";
import { FaUserAlt, FaMapMarkedAlt, FaTv } from "react-icons/fa"; // íconos bonitos

export default function Home() {
  return (
    <>
      <Header />

      <section className="page-container fade-in" style={{ paddingTop: "20px" }}>
        <h2
          style={{
            color: "#0a285f",
            fontSize: "1.8rem",
            marginBottom: "18px",
            textAlign: "center",
          }}
        >
          ¿Qué puedes explorar?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Card: Personajes */}
          <div
            style={{
              background: "#fff8dc",
              border: "2px solid #ffcc00",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "20px",
              textAlign: "center",
              transition: "transform .2s ease, box-shadow .2s ease",
            }}
            className="fade-in"
          >
            <FaUserAlt
              size={36}
              color="#0a285f"
              style={{ marginBottom: "10px" }}
            />
            <h3 style={{ color: "#0a285f", marginBottom: "8px" }}>
              Personajes
            </h3>
            <p style={{ color: "#334155" }}>
              Explora una lista paginada de habitantes de Springfield con su
              imagen, edad, ocupación y frases más icónicas.
            </p>
          </div>

          {/* Card: Lugares */}
          <div
            style={{
              background: "#fff8dc",
              border: "2px solid #ffcc00",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "20px",
              textAlign: "center",
              transition: "transform .2s ease, box-shadow .2s ease",
            }}
            className="fade-in"
          >
            <FaMapMarkedAlt
              size={36}
              color="#0a285f"
              style={{ marginBottom: "10px" }}
            />
            <h3 style={{ color: "#0a285f", marginBottom: "8px" }}>Lugares</h3>
            <p style={{ color: "#334155" }}>
              Descubre los lugares más icónicos de la serie, con su tipo, nombre
              y descripción. Desde la Taberna de Moe hasta la escuela de Bart.
            </p>
          </div>

          {/* Card: Episodios */}
          <div
            style={{
              background: "#fff8dc",
              border: "2px solid #ffcc00",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "20px",
              textAlign: "center",
              transition: "transform .2s ease, box-shadow .2s ease",
            }}
            className="fade-in"
          >
            <FaTv
              size={36}
              color="#0a285f"
              style={{ marginBottom: "10px" }}
            />
            <h3 style={{ color: "#0a285f", marginBottom: "8px" }}>Episodios</h3>
            <p style={{ color: "#334155" }}>
              Recorre cada temporada con el nombre, número y fecha de emisión de
              los episodios. También puedes filtrarlos por temporada.
            </p>
          </div>
        </div>

        {/* Pie informativo */}
        <p
          style={{
            textAlign: "center",
            color: "#475569",
            marginTop: "30px",
            fontWeight: 500,
          }}
        >
          Esta aplicación está desarrollada con <code>React</code> y{" "}
          <code>Vite</code>, usando <code>react-router-dom</code> para la
          navegación dinámica y <code>fetch()</code> para el consumo de la API
          pública de <em> The Simpsons</em>.
        </p>
      </section>
    </>
  );
}
