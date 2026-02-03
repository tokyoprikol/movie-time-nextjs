import { Movie, TvSeries } from "./types";

export function getMediaType(item: Movie | TvSeries) {
  if ("title" in item) return "movie";
  if ("name" in item) return "tv";
}
export function getMediaTitle(item: Movie | TvSeries) {
  return "title" in item ? item.title : item.name;
}

export function getMediaDate(item: Movie | TvSeries) {
  return "release_date" in item ? item.release_date : item.first_air_date;
}
