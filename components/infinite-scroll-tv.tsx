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

import { getPoster } from "@/lib/tmdb/getPoster";
import { convertDate } from "@/lib/utils/convertDate";
import { slugify } from "@/lib/utils/slugify";

import Image from "next/image";
import Link from "next/link";

import { ImageOff, LoaderCircle } from "lucide-react";

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
    useInfiniteQuery<
      MediaResponse<TvListItem[]>,
      Error,
      InfiniteData<MediaResponse<TvListItem[]>, number>,
      ["tv", Category],
      number
    >({
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
      <h1 className="text-5xl font-bold text-neutral-200">{title}</h1>

      <div className="grid grid-cols-5 gap-10">
        {tv.map((dataItem: TvListItem) => (
          <div
            key={dataItem.id + crypto.randomUUID()}
            className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
          >
            <Link href={`/tv/${dataItem.id}-${slugify(dataItem.name)}`}>
              {dataItem.poster_path ? (
                <div className="relative aspect-2/3 w-full">
                  <Image
                    src={getPoster("w342", dataItem.poster_path)}
                    fill
                    sizes=""
                    alt="Poster"
                    className="object-cover"
                  />
                </div>
              ) : (
                <ImageOff />
              )}

              <div className="space-y-2 p-3">
                <h1 className="font-semibold">{dataItem.name}</h1>
                <h3 className="text-neutral-400">
                  {convertDate(dataItem.first_air_date)}
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
