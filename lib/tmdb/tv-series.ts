import { fetchTmdb } from "./client";
import type { TvSeries, MediaResponse, Genre } from "./types";

export async function getPopularTvSeries(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<TvSeries>> {
  return fetchTmdb<MediaResponse<TvSeries>>(
    `/tv/popular?language=${language}&page=${page}`,
  );
}

export async function getTopRatedTvSeries(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<TvSeries>> {
  return fetchTmdb<MediaResponse<TvSeries>>(
    `/tv/top_rated?language=${language}&page=${page}`,
  );
}

export async function getOnTheAirTvSeries(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<TvSeries>> {
  return fetchTmdb<MediaResponse<TvSeries>>(
    `/tv/on_the_air?language=${language}&page=${page}`,
  );
}

export async function getTvSeriesById(
  id: string,
  language: string = "en-US",
  append: string = "aggregate_credits,reviews,content_ratings,keywords,images,videos",
): Promise<TvSeries> {
  const query = append ? `&append_to_response=${append}` : "";
  return fetchTmdb<TvSeries>(`/tv/${id}?language=${language}${query}`);
}

export async function getAllTvSeriesGenres(
  language: string = "en-US",
): Promise<{ genres: Genre[] }> {
  return fetchTmdb<{ genres: Genre[] }>(`/genre/tv/list?language=${language}`);
}
