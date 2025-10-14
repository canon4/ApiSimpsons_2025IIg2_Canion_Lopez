const BASE_URL = "https://thesimpsonsapi.com/api";

async function fetchJson(path, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    let serverMessage = "";
    try {
      const t = await res.text();
      serverMessage = t?.slice(0, 200);
    } catch {}
    throw new Error(
      `HTTP ${res.status} - ${res.statusText} ${
        serverMessage ? `| ${serverMessage}` : ""
      }`
    );
  }
  return res.json();
}

function normalizePaged(data) {
  if (Array.isArray(data)) {
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
    async list({ page = 1, name = "", signal } = {}) {
      const q = new URLSearchParams({
        page: String(page),
        ...(name ? { name } : {}),
      });
      const data = await fetchJson(`/characters?${q.toString()}`, { signal });
      return normalizePaged(data);
    },
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
      const q = new URLSearchParams({
        page: String(page),
        ...(season ? { season: String(season) } : {}),
      });
      const data = await fetchJson(`/episodes?${q.toString()}`, { signal });
      return normalizePaged(data);
    },
  },
};
