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
      <h1 className="text-5xl font-bold text-neutral-200">{title}</h1>

      <div className="grid grid-cols-5 gap-10">
        {data.map((dataItem: MovieListItem | TvListItem) => (
          <div
            key={dataItem.id + crypto.randomUUID()}
            className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
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
    </>
  );
}
