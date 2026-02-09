"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import {
  MediaResponse,
  MovieListItem,
  PersonListItem,
  TvListItem,
} from "@/lib/tmdb/tmdbTypes";

type MediaType = "movie" | "tv" | "people";

type MovieCategory = "popular" | "now-playing" | "upcoming" | "top-rated";
type TvCategory = "popular" | "airing-today" | "on-the-air" | "top-rated";
type PeopleCategory = "popular";

import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
} from "@/lib/tmdb/API/movies";

import {
  getPopularTvSeries,
  getAiringTodayTvSeries,
  getOnTheAirTvSeries,
  getTopRatedTvSeries,
} from "@/lib/tmdb/API/tv-series";

import { getPopularPeople } from "@/lib/tmdb/API/people";

import MediaList from "./media-list";

import { LoaderCircle } from "lucide-react";
import PeopleList from "./people-list";

interface InfiniteScrollProps {
  title: string;
  initialData: MediaResponse<TvListItem[] | MovieListItem[] | PersonListItem[]>;
  mediaType: MediaType;
  category: MovieCategory | TvCategory | PeopleCategory;
}

const MovieCategoryToFetch = {
  popular: getPopularMovies,
  "now-playing": getNowPlayingMovies,
  upcoming: getUpcomingMovies,
  "top-rated": getTopRatedMovies,
} as const;

const TvCategoryToFetch = {
  popular: getPopularTvSeries,
  "airing-today": getAiringTodayTvSeries,
  "on-the-air": getOnTheAirTvSeries,
  "top-rated": getTopRatedTvSeries,
} as const;

const PeopleCategoryToFetch = {
  popular: getPopularPeople,
} as const;

const fetchMap = {
  movie: MovieCategoryToFetch,
  tv: TvCategoryToFetch,
  people: PeopleCategoryToFetch,
};

export default function InfiniteScroll({
  title,
  initialData,
  mediaType,
  category,
}: InfiniteScrollProps) {
  const fetcher = (pageParam: number) => {
    const categoryGroup = fetchMap[mediaType] as any;
    const fetchFn = categoryGroup[category];

    return fetchFn(pageParam);
  };

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "300px",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [mediaType, category],
      queryFn: ({ pageParam = 1 }) => fetcher(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const next = lastPage.page + 1;
        return lastPage.page < lastPage.total_pages && next <= 500
          ? next
          : undefined;
      },
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const media = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div
      className={`${
        mediaType === "movie" || mediaType === "tv"
          ? "space-y-10"
          : "flex-1 space-y-10 px-15 py-15"
      }`}
    >
      {mediaType === "movie" || mediaType === "tv" ? (
        <MediaList title={title} data={media} />
      ) : (
        <PeopleList title={title} data={media} />
      )}

      <div ref={ref} className="text-center">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <LoaderCircle size={50} className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
