"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { MediaResponse, Movie, TvSeries } from "@/lib/tmdb/types";
import { getPoster } from "@/lib/tmdb/getPoster";
import { convertDate } from "@/lib/utils/convertDate";
import { slugify } from "@/lib/utils/slugify";

import Image from "next/image";
import Link from "next/link";
import { getPopularMovies } from "@/lib/tmdb/movies";

import { LoaderCircle } from "lucide-react";

async function fetchPopularMovies({ pageParam = 1 }) {
  const data = getPopularMovies(pageParam);
  return data;
}

export default function InfiniteScrollTvSeries({
  title,
  initialData,
}: {
  title: string;
  initialData: MediaResponse<TvSeries>;
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "300px",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["popular-movies"],
      queryFn: fetchPopularMovies,
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

  function getMediaTitle(item: Movie | TvSeries) {
    return "title" in item ? item.title : item.name;
  }

  function getMediaDate(item: Movie | TvSeries) {
    return "release_date" in item ? item.release_date : item.first_air_date;
  }

  function checkMediaType(item: Movie | TvSeries) {
    if ("title" in item) return "movie";
    if ("name" in item) return "tv";
  }

  return (
    <div className="space-y-10">
      <h1 className="text-5xl font-bold text-neutral-200">{title}</h1>

      <div className="grid grid-cols-5 gap-10">
        {tv.map((dataItem: TvSeries) => (
          <div
            key={dataItem.id + crypto.randomUUID()}
            className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
          >
            <Link
              href={`/${checkMediaType(dataItem)}/${dataItem.id}-${slugify(dataItem.name)}`}
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
                <h1 className="font-semibold">{dataItem.name}</h1>
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
