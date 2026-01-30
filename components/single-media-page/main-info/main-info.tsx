import { getPoster } from "@/lib/tmdb/getPoster";
import { Movie } from "@/lib/tmdb/types";

import Image from "next/image";
import MainInfoHeader from "./main-info-header";
import ProductionCompanies from "./production-companies";

export default function MainInfo({ movie }: { movie: Movie }) {
  return (
    <div className="relative aspect-16/6 w-full">
      <Image
        src={getPoster("original", movie.backdrop_path)}
        fill
        alt="Backdrop"
        loading="eager"
        className="object-cover object-top"
      />

      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/80 to-black/50"></div>
      <div className="relative z-20 flex h-full items-center space-x-15 px-15">
        <Image
          src={getPoster("w500", movie.poster_path)}
          width={300}
          height={150}
          alt="Poster"
          className="rounded-lg shadow-2xl"
        />
        <div className="space-y-10">
          <MainInfoHeader movie={movie} />
          <div>
            <p className="text-lg text-neutral-300 italic">{movie.tagline}</p>
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-bold">Overview</h1>
            <p className="text-neutral-200">{movie.overview}</p>
          </div>
          <ProductionCompanies movie={movie} />
        </div>
      </div>
    </div>
  );
}
