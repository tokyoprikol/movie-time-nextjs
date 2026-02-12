import { SearchItem } from "../media-details";
import {
  MediaResponse,
  MovieListItem,
  PersonListItem,
  TvListItem,
} from "../tmdbTypes";
import { fetchTmdb } from "./client";

export async function getMultiSearchResponse(
  page: number = 1,
  query: string,
  include_adult: boolean = true,
  language: string = "en-US",
): Promise<MediaResponse<SearchItem[]>> {
  return fetchTmdb<MediaResponse<SearchItem[]>>(
    `search/multi?query=${query}&include_adult=${include_adult}&language=${language}&page=${page}`,
  );
}
