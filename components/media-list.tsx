import { getPoster } from "@/lib/tmdb/getPoster";
import {
  getMediaDate,
  getMediaTitle,
  getMediaType,
} from "@/lib/tmdb/media-details";
import { MovieListItem, TvListItem } from "@/lib/tmdb/tmdbTypes";
import { convertDate } from "@/lib/utils/convertDate";
import { slugify } from "@/lib/utils/slugify";
import { ImageOff } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

interface MediaListPageProps {
  title: string;
  data: MovieListItem[] | TvListItem[];
}

export default function MediaList({ title, data }: MediaListPageProps) {
  return (
    <>
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((dataItem: MovieListItem | TvListItem) => (
          <div
            key={dataItem.id}
            className="cursor-pointer overflow-hidden rounded-lg border shadow-xl dark:bg-neutral-900/50"
          >
            <Link
              href={`/${getMediaType(dataItem)}/${dataItem.id}-${slugify(getMediaTitle(dataItem))}`}
            >
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

              <div className="space-y-1 p-3 sm:space-y-2">
                <h1 className="text-sm font-semibold sm:text-base">
                  {getMediaTitle(dataItem)}
                </h1>
                <h3 className="text-sm text-neutral-400 sm:text-base">
                  {convertDate(getMediaDate(dataItem))}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
