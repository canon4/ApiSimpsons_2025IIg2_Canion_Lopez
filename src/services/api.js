// src/services/api.js
const BASE_URL = "https://thesimpsonsapi.com/api";

/**
 * Helper de fetch con manejo de errores y AbortController.
 * Recibe un path relativo (e.g., "/characters?page=1") y un AbortSignal opcional.
 */
async function fetchJson(path, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    // Intentamos leer mensaje del servidor si existe
    let serverMessage = "";
    try {
      const t = await res.text();
      serverMessage = t?.slice(0, 200);
    } catch {}
    throw new Error(`HTTP ${res.status} - ${res.statusText} ${serverMessage ? `| ${serverMessage}` : ""}`);
  }
  return res.json();
}

/** Normaliza respuestas paginadas de la API ({results, pages, ...}) */
function normalizePaged(data) {
  if (Array.isArray(data)) {
    // fallback por si algún endpoint devolviera array directo
    return { items: data, pages: 1, count: data.length, next: null, prev: null };
  }
  return {
    items: data.results ?? [],
    pages: data.pages ?? 1,
    count: data.count ?? (data.results?.length ?? 0),
    next: data.next ?? null,
    prev: data.prev ?? null,
  };
}

export const api = {
  characters: {
    /** Lista personajes (paginado). Permite filtrar por nombre opcional. */
    async list({ page = 1, name = "", signal } = {}) {
      const q = new URLSearchParams({ page: String(page), ...(name ? { name } : {}) });
      const data = await fetchJson(`/characters?${q.toString()}`, { signal });
      return normalizePaged(data);
    },
    /** Detalle por id */
    async getById(id, { signal } = {}) {
      if (!id) throw new Error("characters.getById: id requerido");
      return fetchJson(`/characters/${id}`, { signal });
    },
  },
  locations: {
    async list({ page = 1, signal } = {}) {
      const data = await fetchJson(`/locations?page=${page}`, { signal });
      return normalizePaged(data);
    },
  },
  episodes: {
    async list({ page = 1, season = "", signal } = {}) {
      const q = new URLSearchParams({ page: String(page), ...(season ? { season: String(season) } : {}) });
      const data = await fetchJson(`/episodes?${q.toString()}`, { signal });
      return normalizePaged(data);
    },
  },
};
