import { fetchTmdb } from "./client";
import type { TvSeries, MediaResponse } from "./types";

export async function getPopularTvSeries(
  language: string = "en-US",
  page: number = 1,
): Promise<MediaResponse<TvSeries>> {
  return fetchTmdb<MediaResponse<TvSeries>>(
    `/tv/popular?language=${language}&page=${page}`,
  );
}

export async function getTopRatedTvSeries(
  language: string = "en-US",
  page: number = 1,
): Promise<MediaResponse<TvSeries>> {
  return fetchTmdb<MediaResponse<TvSeries>>(
    `/tv/top_rated?language=${language}&page=${page}`,
  );
}

export async function getOnTheAirTvSeries(
  language: string = "en-US",
  page: number = 1,
): Promise<MediaResponse<TvSeries>> {
  return fetchTmdb<MediaResponse<TvSeries>>(
    `/tv/on_the_air?language=${language}&page=${page}`,
  );
}

export async function getTvSeriesById(
  language: string = "en-US",
  id: string,
  append: string = "aggregate_credits,reviews",
): Promise<TvSeries> {
  const query = append ? `&append_to_response=${append}` : "";
  return fetchTmdb<TvSeries>(`/tv/${id}?language=${language}${query}`);
}
