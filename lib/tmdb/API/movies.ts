import { fetchTmdb } from "./client";
import type {
  MediaResponse,
  MovieListItem,
  MovieDetails,
  GenresResponse,
} from "../tmdbTypes";

export async function getPopularMovies(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<MovieListItem[]>> {
  return fetchTmdb<MediaResponse<MovieListItem[]>>(
    `/movie/popular?language=${language}&page=${page}`,
  );
}

export async function getNowPlayingMovies(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<MovieListItem[]>> {
  return fetchTmdb<MediaResponse<MovieListItem[]>>(
    `/movie/now_playing?language=${language}&page=${page}`,
  );
}

export async function getUpcomingMovies(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<MovieListItem[]>> {
  return fetchTmdb<MediaResponse<MovieListItem[]>>(
    `/movie/upcoming?language=${language}&page=${page}`,
  );
}

export async function getTopRatedMovies(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<MovieListItem[]>> {
  return fetchTmdb<MediaResponse<MovieListItem[]>>(
    `/movie/top_rated?language=${language}&page=${page}`,
  );
}

export async function getMovieById(
  id: string,
  language: string = "en-US",
  append: string = "credits,reviews,release_dates,keywords,images,videos",
): Promise<MovieDetails> {
  const query = append ? `&append_to_response=${append}` : "";
  return fetchTmdb<MovieDetails>(
    `/movie/${id}?language=${language}${query}&include_image_language=en-US,ja-JP,xx-XX`,
  );
}

export async function getAllMovieGenres(
  language: string = "en-US",
): Promise<GenresResponse> {
  return fetchTmdb<GenresResponse>(`/genre/movie/list?language=${language}`);
}
