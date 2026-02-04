import {
  MovieDetails,
  MovieListItem,
  TvDetails,
  TvListItem,
} from "./tmdbTypes";
type AnyMedia = MovieDetails | MovieListItem | TvDetails | TvListItem;

export const getMediaType = (item: AnyMedia) => item.media_type;

export const getMediaTitle = (item: AnyMedia) =>
  item.media_type === "movie" ? item.title : item.name;

export const getMediaDate = (item: AnyMedia) =>
  item.media_type === "movie" ? item.release_date : item.first_air_date;
