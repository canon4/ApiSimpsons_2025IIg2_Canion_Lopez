import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import CardEpisodio from "../../Components/CardEpisodio/CardEpisodio";
import "./EpisodiosPage.css";

export default function EpisodiosPage() {
  const [page, setPage] = useState(1);
  const [season, setSeason] = useState("");
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function loadAll() {
      try {
        setLoading(true);
        setError(null);

        const firstRes = await fetch(
          "https://thesimpsonsapi.com/api/episodes?page=1",
          { signal: controller.signal }
        );
        if (!firstRes.ok) throw new Error("Error al obtener episodios (p1)");
        const firstData = await firstRes.json();
        const totalPages = firstData.pages ?? 1;

        const promises = [];
        for (let p = 2; p <= totalPages; p++) {
          promises.push(
            fetch(`https://thesimpsonsapi.com/api/episodes?page=${p}`, {
              signal: controller.signal,
            }).then((r) => {
              if (!r.ok) throw new Error(`Error en página ${p}`);
              return r.json();
            })
          );
        }

        const rest = await Promise.all(promises);

        const combined = [
          ...(firstData.results ?? []),
          ...rest.flatMap((d) => d.results ?? []),
        ];

        if (!cancelled) setAllEpisodes(combined);
      } catch (err) {
        if (!cancelled) {
          if (err.name === "AbortError") return;
          console.error(err);
          setError("No se pudieron cargar los episodios.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [season]);

  const { filteredEpisodes, totalPages } = useMemo(() => {
    const filtered = season
      ? allEpisodes.filter((ep) => String(ep.season) === String(season))
      : allEpisodes.slice();

    const totalPagesLocal = Math.max(
      1,
      Math.ceil(filtered.length / ITEMS_PER_PAGE)
    );
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

    return { filteredEpisodes: pageItems, totalPages: totalPagesLocal };
  }, [allEpisodes, season, page]);

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  if (loading) return <Loader />;
  if (error) return <p className="episodes__empty">{error}</p>;

  return (
    <section className="episodes">
      <h1 className="episodes__title">Lista de Episodios</h1>

      <Filter season={season} onChange={(v) => setSeason(v)} />

      {filteredEpisodes.length === 0 ? (
        <p className="episodes__empty">No hay episodios para esta selección.</p>
      ) : (
        <>
          <div className="episodes__grid">
            {filteredEpisodes.map((ep) => (
              <CardEpisodio key={ep.id} episodio={ep} />
            ))}
          </div>

          <div className="episodes__pagination">
            <Pagination
              mode="simple"
              currentPage={page}
              onPrev={() => hasPrev && setPage((x) => x - 1)}
              onNext={() => hasNext && setPage((x) => x + 1)}
              disablePrev={!hasPrev}
              disableNext={!hasNext}
            />
            <div
              className="locations__page-indicator"
              style={{ marginTop: 8, fontSize: 13 }}
            >
              Página {page} de {totalPages} ·{" "}
              {season
                ? `filtrando temporada ${season}`
                : `${allEpisodes.length} episodios totales`}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function Filter({ season, onChange }) {
  return (
    <div className="episodes__filter">
      <label htmlFor="season-select">Filtrar por temporada:</label>
      <select
        id="season-select"
        value={season}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas</option>
        {Array.from({ length: 35 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Temporada {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
