"use client";

import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { MediaResponse, TvListItem } from "@/lib/tmdb/tmdbTypes";
type Category = "popular" | "top-rated" | "on-the-air";

import {
  getPopularTvSeries,
  getTopRatedTvSeries,
  getOnTheAirTvSeries,
} from "@/lib/tmdb/API/tv-series";

import MediaList from "./media-list";

import { LoaderCircle } from "lucide-react";

interface InfiniteScrollProps {
  title: string;
  initialData: MediaResponse<TvListItem[]>;
  category: Category;
}

const categoryToFetch = {
  popular: getPopularTvSeries,
  "top-rated": getTopRatedTvSeries,
  "on-the-air": getOnTheAirTvSeries,
} as const;

export default function InfiniteScrollTv({
  title,
  initialData,
  category,
}: InfiniteScrollProps) {
  const fetcher = categoryToFetch[category] as (
    page: number,
  ) => Promise<MediaResponse<TvListItem[]>>;

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "300px",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["tv", category],
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

  const tv = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="space-y-10">
      <MediaList title={title} data={tv} />

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
