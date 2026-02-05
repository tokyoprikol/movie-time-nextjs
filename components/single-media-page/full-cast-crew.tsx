import { getPoster } from "@/lib/tmdb/getPoster";
import { getMediaDate, getMediaTitle } from "@/lib/tmdb/media-details";
import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Cast from "@/components/single-media-page/cast-list";
import Crew from "@/components/single-media-page/crew-list";

export default async function FullCastCrew({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="flex-1 bg-neutral-900/98 text-neutral-50">
      <div className="flex items-center gap-5 bg-neutral-950 px-15 py-5">
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
            <Link href="./" className="hover:underline">
              {getMediaTitle(data)}{" "}
            </Link>
            <span className="font-semibold text-neutral-300">
              ({getMediaDate(data).slice(0, 4)})
            </span>{" "}
          </h1>
          <Link
            href="./"
            className="flex items-center gap-1 text-lg hover:underline"
          >
            <ArrowLeft size={15} /> Back to main
          </Link>
        </div>
      </div>
      <div className="flex space-x-50 px-15 py-5">
        <Cast data={data} />
        <Crew data={data} />
      </div>
    </div>
  );
}
