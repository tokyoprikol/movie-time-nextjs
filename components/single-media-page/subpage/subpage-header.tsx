import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import Link from "next/link";
import Image from "next/image";
import {
  getMediaDate,
  getMediaTitle,
  getMediaType,
} from "@/lib/tmdb/media-details";
import { ArrowLeft, ImageOff } from "lucide-react";
import { getPoster } from "@/lib/tmdb/getPoster";
import { slugify } from "@/lib/utils/slugify";

export default function SubpageHeader({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="flex items-center gap-5 bg-neutral-900 px-15 py-5">
      <div>
        {data.poster_path ? (
          <Image
            src={getPoster("w500", data.poster_path)}
            alt="poster"
            width={80}
            height={80}
            className="rounded"
          />
        ) : (
          <ImageOff />
        )}
      </div>
      <div className="space-y-5">
        <h1 className="text-4xl font-bold">
          <Link
            href={`/${getMediaType(data)}/${data.id}-${slugify(getMediaTitle(data))}`}
            className="hover:underline"
          >
            {getMediaTitle(data)}{" "}
          </Link>
          <span className="font-semibold text-neutral-300">
            ({getMediaDate(data).slice(0, 4)})
          </span>{" "}
        </h1>
        <Link
          href={`/${getMediaType(data)}/${data.id}-${slugify(getMediaTitle(data))}`}
          className="flex items-center gap-1 text-lg hover:underline"
        >
          <ArrowLeft size={15} /> Back to main
        </Link>
      </div>
    </div>
  );
}
