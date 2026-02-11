import { SearchItem } from "../media-details";
import {
  MediaResponse,
  MovieListItem,
  PersonListItem,
  TvListItem,
} from "../tmdbTypes";
import { fetchTmdb } from "./client";

export async function getMultiSearchResponse(
  query: string,
  include_adult: boolean = true,
  language: string = "en-US",
  page: number = 1,
): Promise<MediaResponse<SearchItem[]>> {
  return fetchTmdb<MediaResponse<SearchItem[]>>(
    `search/multi?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`,
  );
}
