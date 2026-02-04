"use client";

import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { MediaResponse, PersonListItem } from "@/lib/tmdb/tmdbTypes";
type Category = "popular";

import { getPopularPeople } from "@/lib/tmdb/API/people";

import { getPoster } from "@/lib/tmdb/getPoster";
import { slugify } from "@/lib/utils/slugify";

import Image from "next/image";
import Link from "next/link";

import { ImageOff, LoaderCircle } from "lucide-react";

interface InfiniteScrollProps {
  title: string;
  initialData: MediaResponse<PersonListItem[]>;
  category: Category;
}

const categoryToFetch = {
  popular: getPopularPeople,
} as const;

export default function InfiniteScrollPeople({
  title,
  initialData,
  category,
}: InfiniteScrollProps) {
  const fetcher = categoryToFetch[category] as (
    page: number,
  ) => Promise<MediaResponse<PersonListItem[]>>;

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "300px",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<
      MediaResponse<PersonListItem[]>,
      Error,
      InfiniteData<MediaResponse<PersonListItem[]>, number>,
      ["people", Category],
      number
    >({
      queryKey: ["people", category],
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

  const people = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="flex-1 space-y-10 bg-neutral-900/98 px-15 py-15 text-white">
      <h1 className="text-5xl font-bold text-neutral-200">{title}</h1>
      <div className="grid grid-cols-5 gap-10">
        {people.map((person: PersonListItem) => (
          <div
            key={person.id + crypto.randomUUID()}
            className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
          >
            <Link href={`/people/${person.id}-${slugify(person.name)}`}>
              {person.profile_path ? (
                <div className="relative aspect-2/3 w-full">
                  <Image
                    src={getPoster("w342", person.profile_path)}
                    fill
                    sizes=""
                    alt="Image"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex justify-center py-23">
                  <ImageOff size={200} />
                </div>
              )}

              <div className="space-y-2 p-3">
                <p className="font-semibold">{person.name}</p>
                <div className="text-xs text-neutral-300">
                  {person.known_for
                    .map((item) =>
                      item.media_type === "movie" ? item.title : item.name,
                    )
                    .join(", ")}
                </div>
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
