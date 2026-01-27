import { fetchTmdb } from "./client";
import type { TvSeries } from "./types";

export async function getPopularTvSeries(language = "en-US", page = 1) {
  return fetchTmdb<{ results: TvSeries[] }>(
    `/tv/popular?language=${language}&page=${page}`,
  );
}

export async function getTopRatedTvSeries(language = "en-US", page = 1) {
  return fetchTmdb<{ results: TvSeries[] }>(
    `/tv/top-rated?language=${language}&page=${page}`,
  );
}

export async function getOnTheAirTvSeries(language = "en-US", page = 1) {
  return fetchTmdb<{ results: TvSeries[] }>(
    `/tv/on_the_air?language=${language}&page=${page}`,
  );
}

export async function getTvSeriesById(language = "en-US", id: string) {
  return fetchTmdb<{ results: TvSeries[] }>(`/tv/${id}?language=${language}`);
}
