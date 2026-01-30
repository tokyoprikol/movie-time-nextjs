import { Movie, TvSeries } from "@/lib/tmdb/types";
import { getPoster } from "@/lib/tmdb/getPoster";
import { convertDate } from "@/lib/utils/convertDate";

import Image from "next/image";
import Link from "next/link";

export default function MediaListPage({
  title,
  data,
}: {
  title: string;
  data: Movie[] | TvSeries[];
}) {
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
        {data.map((dataItem: Movie | TvSeries) => (
          <div
            key={dataItem.id}
            className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
          >
            <Link href={`/${checkMediaType(dataItem)}/${dataItem.id}`}>
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
    </div>
  );
}
