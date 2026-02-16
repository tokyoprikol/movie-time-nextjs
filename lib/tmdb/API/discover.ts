import { fetchTmdb } from "./client";
import type {
  MediaResponse,
  MovieListItem,
  MovieDetails,
  GenresResponse,
} from "../tmdbTypes";

type SortPreset = "popular" | "top_rated" | "upcoming" | "now_playing";
interface DiscoverParams {
  sort_by: string;
  extra?: string;
}

const SORT_PRESETS: Record<SortPreset, DiscoverParams> = {
  popular: {
    sort_by: "popularity.desc",
  },
  top_rated: {
    sort_by: "vote_average.desc",
    extra: "&vote_count.gte=300&vote_average.gte=6",
  },
  upcoming: {
    sort_by: "primary_release_date.asc",
    extra: `&primary_release_date.gte=${getTodayISO()}`,
  },
  now_playing: {
    sort_by: "primary_release_date.desc",
    extra: "&with_release_type=",
  },
};

function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

export async function getFilteredMovies(
  preset: SortPreset,
  genres: string = "",
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<MovieListItem[]>> {
  const cfg = SORT_PRESETS[preset];

  let query = `/discover/movie
    ?sort_by=${cfg.sort_by}
    &language=${language}
    &page=${page}`;

  if (cfg.extra) query += cfg.extra;

  return fetchTmdb<MediaResponse<MovieListItem[]>>(query);
}
