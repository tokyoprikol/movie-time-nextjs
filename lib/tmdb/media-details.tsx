import {
  MovieDetails,
  MovieListItem,
  PersonListItem,
  TvDetails,
  TvListItem,
} from "./tmdbTypes";
type AnyMedia = MovieDetails | MovieListItem | TvDetails | TvListItem;

export const getMediaType = (item: AnyMedia) =>
  "title" in item ? "movie" : "tv";

export const getMediaTitle = (item: AnyMedia) =>
  "title" in item ? item.title : item.name;

export const getMediaDate = (item: AnyMedia) =>
  "release_date" in item ? item.release_date : item.first_air_date;

import { Film, Tv, CircleUserRound } from "lucide-react";

// --------------------------------------------------------
export type SearchItem =
  | (MovieListItem & { media_type: "movie" })
  | (TvListItem & { media_type: "tv" })
  | (PersonListItem & { media_type: "person" });

export const getSearchItemTitle = (item: SearchItem) => {
  if (item.media_type === "movie") return item.title;
  else if (item.media_type === "tv") return item.name;
  else if (item.media_type === "person") return item.name;
  else return null;
};

export const getSearchItemPoster = (item: SearchItem) => {
  if (item.media_type === "movie") return item.poster_path;
  else if (item.media_type === "tv") return item.poster_path;
  else if (item.media_type === "person") return item.profile_path;
  return null;
};

export const getSearchItemDate = (item: SearchItem) => {
  if (item.media_type === "movie") return item.release_date;
  else if (item.media_type === "tv") return item.first_air_date;
  else return null;
};

export const getSearchItemIcon = (item: SearchItem) => {
  if (item.media_type === "movie") return <Film size={20} />;
  else if (item.media_type === "tv") return <Tv size={20} />;
  else if (item.media_type === "person") return <CircleUserRound size={20} />;
  else return null;
};
