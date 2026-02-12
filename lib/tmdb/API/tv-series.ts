import { fetchTmdb } from "./client";
import type {
  MediaResponse,
  TvListItem,
  TvDetails,
  GenresResponse,
} from "../tmdbTypes";

export async function getPopularTvSeries(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<TvListItem[]>> {
  return fetchTmdb<MediaResponse<TvListItem[]>>(
    `/tv/popular?language=${language}&page=${page}`,
  );
}

export async function getAiringTodayTvSeries(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<TvListItem[]>> {
  return fetchTmdb<MediaResponse<TvListItem[]>>(
    `/tv/airing_today?language=${language}&page=${page}`,
  );
}

export async function getOnTheAirTvSeries(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<TvListItem[]>> {
  return fetchTmdb<MediaResponse<TvListItem[]>>(
    `/tv/on_the_air?language=${language}&page=${page}`,
  );
}

export async function getTopRatedTvSeries(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<TvListItem[]>> {
  return fetchTmdb<MediaResponse<TvListItem[]>>(
    `/tv/top_rated?language=${language}&page=${page}`,
  );
}

export async function getTvSeriesById(
  id: string,
  language: string = "en-US",
  append: string = "aggregate_credits,reviews,content_ratings,keywords,images,videos,recommendations",
): Promise<TvDetails> {
  const query = append ? `&append_to_response=${append}` : "";
  return fetchTmdb<TvDetails>(
    `/tv/${id}?language=${language}${query}&include_image_language=en-US,ja-JP,ru-RU,xx-XX&include_video_language=en-US,ja-JP,ru-RU,xx-XX`,
  );
}

export async function getAllTvSeriesGenres(
  language: string = "en-US",
): Promise<GenresResponse> {
  return fetchTmdb<GenresResponse>(`/genre/tv/list?language=${language}`);
}
