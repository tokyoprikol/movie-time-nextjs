import Image from "next/image";

import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import { getPoster } from "@/lib/tmdb/getPoster";

import MainInfoHeader from "./main-info-header";
import ProductionCompanies from "./production-companies";

import { ImageOff } from "lucide-react";

export default function MainInfo({ data }: { data: MovieDetails | TvDetails }) {
  return (
    <div className="relative aspect-16/6 w-full">
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

      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/80 to-black/70"></div>
      <div className="relative z-20 flex h-full items-center space-x-15 px-15">
        {data.poster_path ? (
          <div className="relative aspect-2/3 min-w-90">
            <Image
              src={getPoster("w500", data.poster_path)}
              fill
              alt="Poster"
              className="rounded-lg object-cover object-center shadow-2xl"
            />
          </div>
        ) : (
          <ImageOff />
        )}

        <div className="space-y-10">
          <MainInfoHeader data={data} />
          <div>
            <p className="text-lg text-neutral-300 italic">{data.tagline}</p>
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-bold">Overview</h1>
            <p className="text-neutral-200">{data.overview}</p>
          </div>
          <ProductionCompanies data={data} />
        </div>
      </div>
    </div>
  );
}
