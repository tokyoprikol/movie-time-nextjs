import {
  MovieDetails,
  MovieListItem,
  TvDetails,
  TvListItem,
} from "./tmdbTypes";
type AnyMedia = MovieDetails | MovieListItem | TvDetails | TvListItem;

// IF OBJECT HAS A 'media_type' VALUE USE THIS FUNCTION:
// export const getMediaType = (item: AnyMedia) => item.media_type;

// export const getMediaTitle = (item: AnyMedia) =>
//   item.media_type === "movie" ? item.title : item.name;

// export const getMediaDate = (item: AnyMedia) =>
//   item.media_type === "movie" ? item.release_date : item.first_air_date;

// IF OBJECT DOES NOT HAVE A 'media_type' VALUE:
export const getMediaType = (item: AnyMedia) =>
  "title" in item ? "movie" : "tv";

export const getMediaTitle = (item: AnyMedia) =>
  "title" in item ? item.title : item.name;

export const getMediaDate = (item: AnyMedia) =>
  "release_date" in item ? item.release_date : item.first_air_date;
