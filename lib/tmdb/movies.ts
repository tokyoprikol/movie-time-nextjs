import { fetchTmdb } from "./client";
import type { Movie, Genre, MediaResponse } from "./types";

export async function getPopularMovies(
  language: string = "en-US",
  page: number = 1,
): Promise<MediaResponse<Movie>> {
  return fetchTmdb<MediaResponse<Movie>>(
    `/movie/popular?language=${language}&page=${page}`,
  );
}

export async function getTopRatedMovies(
  language: string = "en-US",
  page: number = 1,
): Promise<MediaResponse<Movie>> {
  return fetchTmdb<MediaResponse<Movie>>(
    `/movie/top_rated?language=${language}&page=${page}`,
  );
}

export async function getUpcomingMovies(
  language: string = "en-US",
  page: number = 1,
): Promise<MediaResponse<Movie>> {
  return fetchTmdb<MediaResponse<Movie>>(
    `/movie/upcoming?language=${language}&page=${page}`,
  );
}

export async function getMovieById(
  id: string,
  language: string = "en-US",
  append: string = "credits,reviews,release_dates,keywords",
): Promise<Movie> {
  const query = append ? `&append_to_response=${append}` : "";
  return fetchTmdb<Movie>(`/movie/${id}?language=${language}${query}`);
}

export async function getAllMovieGenres(
  language: string = "en-US",
): Promise<{ genres: Genre[] }> {
  return fetchTmdb<{ genres: Genre[] }>(
    `/genre/movie/list?language=${language}`,
  );
}
