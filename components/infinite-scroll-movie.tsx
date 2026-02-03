"use client";

import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { MediaResponse, Movie, TvSeries } from "@/lib/tmdb/types";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/tmdb/movies";

import { getPoster } from "@/lib/tmdb/getPoster";
import { convertDate } from "@/lib/utils/convertDate";
import { slugify } from "@/lib/utils/slugify";

import Image from "next/image";
import Link from "next/link";

import { LoaderCircle } from "lucide-react";
import {
  getMediaDate,
  getMediaTitle,
  getMediaType,
} from "@/lib/tmdb/media-details";

type Category = "popular" | "top-rated" | "upcoming";

interface InfiniteScrollProps {
  title: string;
  initialData: MediaResponse<Movie>;
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
  ) => Promise<MediaResponse<Movie>>;

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "300px",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<
      MediaResponse<Movie>,
      Error,
      InfiniteData<MediaResponse<Movie>, number>,
      ["movies", Category],
      number
    >({
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
      <h1 className="text-5xl font-bold text-neutral-200">{title}</h1>

      <div className="grid grid-cols-5 gap-10">
        {movies.map((dataItem: Movie | TvSeries) => (
          <div
            key={dataItem.id + crypto.randomUUID()}
            className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
          >
            <Link
              href={`/${getMediaType(dataItem)}/${dataItem.id}-${slugify(getMediaTitle(dataItem))}`}
            >
              <div className="relative aspect-2/3 w-full">
                <Image
                  src={getPoster("w342", dataItem.poster_path)}
                  fill
                  sizes=""
                  alt="Poster"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 p-3">
                <h1 className="font-semibold">{getMediaTitle(dataItem)}</h1>
                <h3 className="text-neutral-400">
                  {convertDate(getMediaDate(dataItem))}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

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
