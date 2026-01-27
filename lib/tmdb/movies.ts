import { fetchTmdb } from "./client";
import type { Movie } from "./types";

export async function getPopularMovies(language = "en-US", page = 1) {
  return fetchTmdb<{ results: Movie[] }>(
    `/movies/popular?language=${language}&page=${page}`,
  );
}

export async function getTopRatedMovies(language = "en-US", page = 1) {
  return fetchTmdb<{ results: Movie[] }>(
    `/movies/top-rated?language=${language}&page=${page}`,
  );
}

export async function getUpcomingMovies(language = "en-US", page = 1) {
  return fetchTmdb<{ results: Movie[] }>(
    `/movies/upcoming?language=${language}&page=${page}`,
  );
}

export async function getMovieById(language = "en-US", id: string) {
  return fetchTmdb<{ results: Movie[] }>(`/movies/${id}?language=${language}`);
}
