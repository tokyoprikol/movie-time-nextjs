"use client";

import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { MediaResponse, MovieListItem } from "@/lib/tmdb/tmdbTypes";
type Category = "popular" | "top-rated" | "upcoming";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/tmdb/API/movies";

import MediaList from "./media-list";

import { LoaderCircle } from "lucide-react";

interface InfiniteScrollProps {
  title: string;
  initialData: MediaResponse<MovieListItem[]>;
  category: Category;
}

const categoryToFetch = {
  popular: getPopularMovies,
  "top-rated": getTopRatedMovies,
  upcoming: getUpcomingMovies,
} as const;

export default function InfiniteScrollMovie({
  title,
  initialData,
  category,
}: InfiniteScrollProps) {
  const fetcher = categoryToFetch[category] as (
    page: number,
  ) => Promise<MediaResponse<MovieListItem[]>>;

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "300px",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["movies", category],
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

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="space-y-10">
      <MediaList title={title} data={movies} />

      <div ref={ref} className="py-10 text-center">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <LoaderCircle size={50} className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
