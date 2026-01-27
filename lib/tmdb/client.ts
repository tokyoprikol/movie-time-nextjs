const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTmdb<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${TMDB_BASE_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.PUBLIC_NEXT_TMDB_API_BEARER}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB ${res.status} - ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
