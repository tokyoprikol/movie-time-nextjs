"use client";

import { getPoster } from "@/lib/tmdb/getPoster";
import {
  getSearchItemDate,
  getSearchItemPoster,
  getSearchItemTitle,
} from "@/lib/tmdb/media-details";
import { ImageOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { convertDate } from "@/lib/utils/convertDate";
import { useState } from "react";

export default function SearchedMediaList({
  categoriesWithCounts,
  data,
}: {
  categoriesWithCounts: {
    category: string;
    category_name: string;
    quantity: number;
  }[];
  data: {
    results: any[];
  };
}) {
  const [selectedType, setSelectedType] = useState("movie");

  return (
    <div className="flex-1 space-y-5 px-15 py-10">
      <div className="flex items-start gap-15">
        <div className="w-full max-w-xs rounded-lg border shadow-lg">
          <div className="border-b px-6 py-3">
            <h1 className="text-xl font-semibold">Search results</h1>
          </div>
          <div className="space-y-3 py-5">
            {categoriesWithCounts.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between px-6"
              >
                <Button
                  variant={
                    item.category === selectedType ? "default" : "outline"
                  }
                  size={"sm"}
                  className="w-full max-w-30"
                  onClick={() => setSelectedType(item.category)}
                >
                  {item.category_name}
                </Button>
                <span className="rounded-lg border px-3 py-1 dark:bg-neutral-900">
                  {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {data.results.length !== 0 ? (
            data.results
              .filter((item) => item.media_type === selectedType)
              .map((item) => {
                const poster = getSearchItemPoster(item);
                const itemDate = getSearchItemDate(item);

                return (
                  <Link
                    key={item.id}
                    href={`/${item.media_type}/${item.id}`}
                    className="flex items-center overflow-hidden rounded-lg border shadow-lg"
                  >
                    <div className="relative aspect-2/3 h-40 border-r-2">
                      {poster ? (
                        <Image
                          src={getPoster("w500", poster)}
                          alt="poster"
                          fill
                        />
                      ) : (
                        <div className="flex justify-center pt-10">
                          <ImageOff size={80} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-5">
                      <h1>{getSearchItemTitle(item)}</h1>
                      {itemDate && (
                        <span className="text-neutral-400">
                          {convertDate(itemDate)}
                        </span>
                      )}

                      {"overview" in item && (
                        <div className="mt-4 line-clamp-2">{item.overview}</div>
                      )}
                    </div>
                  </Link>
                );
              })
          ) : (
            <h1>No Search results</h1>
          )}
        </div>
      </div>
    </div>
  );
}
