import Image from "next/image";

import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import { getPoster } from "@/lib/tmdb/getPoster";

import MainInfoHeader from "./main-info-header";
import ProductionCompanies from "./production-companies";

import { CalendarDays, Clapperboard, Clock8, ImageOff } from "lucide-react";
import {
  getMediaDate,
  getMediaTitle,
  getMediaType,
} from "@/lib/tmdb/media-details";
import { convertMinToHours } from "@/lib/utils/convertTime";
import { convertDate } from "@/lib/utils/convertDate";

export default function MainInfo({ data }: { data: MovieDetails | TvDetails }) {
  const isMovie = getMediaType(data);

  return (
    <div className="relative aspect-16/6 w-full border-b-2">
      {data.backdrop_path ? (
        <Image
          src={getPoster("original", data.backdrop_path)}
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          alt="Backdrop"
          loading="eager"
          className="object-cover"
        />
      ) : (
        <ImageOff />
      )}

      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/20 to-black/40 dark:from-black/80 dark:to-black/70"></div>
      <div className="flex flex-col">
        <div className="relative z-20 flex flex-col justify-center gap-2 bg-black/60 p-4 text-white min-[375px]:hidden">
          <div className="flex items-center justify-center gap-1 border-b">
            <h1 className="text-lg font-bold sm:text-xl lg:text-2xl xl:text-3xl">
              {getMediaTitle(data)}
            </h1>
            <p className="text-lg font-bold text-neutral-300 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              {getMediaDate(data)?.slice(0, 4) || "-"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <div className="flex flex-col items-start gap-2 text-xs font-medium">
              <p className="flex items-center gap-1">
                <CalendarDays size={20} />
                {convertDate(getMediaDate(data))}
              </p>
              <p className="flex items-center gap-1">
                <Clapperboard size={20} />
                {data.genres.map((g) => g.name).join(", ")}
              </p>
              {"runtime" in data && (
                <p className="flex items-center gap-1">
                  <Clock8 size={20} />
                  {"runtime" in data && convertMinToHours(data.runtime ?? 0)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <p
                className={`rounded-lg border-4 px-2 text-lg font-bold text-neutral-200 md:text-xl lg:text-2xl xl:text-3xl ${
                  data.vote_average > 6
                    ? "border-green-500 bg-green-950"
                    : data.vote_average > 4
                      ? "border-yellow-500 bg-yellow-950"
                      : "border-red-500 bg-red-950"
                }`}
              >
                {data.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-center text-sm text-neutral-200 italic lg:text-lg">
              {data.tagline}
            </p>
          </div>
        </div>

        <div className="relative z-20 flex items-center space-x-6 px-6 py-6 max-[375px]:justify-center sm:items-start sm:justify-between md:space-x-10 md:px-10 md:py-10 lg:space-x-15 lg:px-15 lg:py-15">
          {data.poster_path ? (
            <div className="relative aspect-2/3 w-full max-w-32 min-w-40 overflow-hidden rounded-lg shadow-2xl sm:max-w-xs">
              <Image
                src={getPoster("w500", data.poster_path)}
                fill
                alt="Poster"
                className="object-cover"
              />
            </div>
          ) : (
            <ImageOff />
          )}

          <div className="space-y-4 text-white lg:space-y-10">
            <MainInfoHeader data={data} />
            <div className="max-[375px]:hidden">
              <p className="text-sm text-neutral-200 italic lg:text-lg">
                {data.tagline}
              </p>
            </div>
            <div className="hidden space-y-4 sm:block lg:space-y-10">
              <div className="space-y-1 lg:space-y-2">
                <h1 className="text-md font-bold lg:text-lg">Overview</h1>
                <p className="text-sm text-neutral-200 lg:text-base">
                  {data.overview}
                </p>
              </div>
              <ProductionCompanies data={data} />
            </div>
          </div>
        </div>
        <div className="relative z-20 block space-y-4 bg-black/60 p-4 text-white sm:hidden lg:space-y-10">
          <div className="space-y-1 lg:space-y-2">
            <h1 className="text-md font-bold lg:text-lg">Overview</h1>
            <p className="text-sm text-neutral-200 lg:text-base">
              {data.overview}
            </p>
          </div>
          <ProductionCompanies data={data} />
        </div>
      </div>
    </div>
  );
}
