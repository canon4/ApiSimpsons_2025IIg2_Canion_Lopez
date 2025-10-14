import React from "react";

export default function Pagination(props) {
  // Modo con números (tu versión original)
  if (props.mode !== "simple") {
    const { totalItems, itemsPerPage, currentPage, onPageChange } = props;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    return (
      <nav className="pagination-container">
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
          Anterior
        </button>
        {pages.map((p) => (
          <button
            key={p}
            className={p === currentPage ? "active" : ""}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </nav>
    );
  }

  // Modo simple (Prev/Sig) para APIs que no exponen total
  const { currentPage, onPrev, onNext, disablePrev, disableNext } = props;
  return (
    <nav className="pagination-container">
      <button onClick={onPrev} disabled={disablePrev}>Anterior</button>
      <span style={{ padding: "0 12px", fontWeight: 600 }}>Página {currentPage}</span>
      <button onClick={onNext} disabled={disableNext}>Siguiente</button>
    </nav>
  );
}
