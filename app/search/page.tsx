import { Button } from "@/components/ui/button";
import { getMultiSearchResponse } from "@/lib/tmdb/API/search";
import { getPoster } from "@/lib/tmdb/getPoster";
import {
  getSearchItemDate,
  getSearchItemPoster,
  getSearchItemTitle,
} from "@/lib/tmdb/media-details";
import { convertDate } from "@/lib/utils/convertDate";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SEARCH_CATEGORIES = [
  {
    category: "movie",
    category_name: "Movies",
  },
  {
    category: "tv",
    category_name: "TV Shows",
  },
  {
    category: "person",
    category_name: "People",
  },
  {
    category: "collection",
    category_name: "Collection",
  },
  {
    category: "company",
    category_name: "Companies",
  },
  {
    category: "keyword",
    category_name: "Keywords",
  },
  {
    category: "network",
    category_name: "Networks",
  },
  {
    category: "award",
    category_name: "Awards",
  },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const categoryCounts = {
    movie: 0,
    tv: 0,
    person: 0,
    collection: 0,
    companies: 0,
    keywords: 0,
    networks: 0,
    awards: 0,
  };

  const { query } = await searchParams;

  if (!query) return "No search query";

  const data = await getMultiSearchResponse(query);
  console.log(data);

  data.results.forEach((item) => {
    const type = item.media_type as keyof typeof categoryCounts;
    if (type in categoryCounts) categoryCounts[type]++;
  });

  const categoriesWithCounts = SEARCH_CATEGORIES.map((c) => ({
    ...c,
    quantity: categoryCounts[c.category as keyof typeof categoryCounts] ?? 0,
  }));

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
                  variant={"outline"}
                  size={"sm"}
                  className="w-full max-w-30"
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
            data.results.map((item) => {
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
