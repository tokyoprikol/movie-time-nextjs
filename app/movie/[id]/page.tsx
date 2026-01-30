import { getPoster } from "@/lib/tmdb/getPoster";
import { getMovieById } from "@/lib/tmdb/movies";
import { convertMinToHours } from "@/lib/utils/convertTime";
import { convertDate } from "@/lib/utils/convertDate";
import { Clock8, Clapperboard, CalendarDays } from "lucide-react";

import Image from "next/image";

export default async function SingleMoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const movie = await getMovieById(id);

  const usCertification = movie.release_dates?.results
    .find((item) => item.iso_3166_1 === "US")
    ?.release_dates.find((item) => item.certification !== "")?.certification;

  console.log(movie);

  return (
    <div className="flex-1 bg-neutral-900/98 text-white">
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
            className="rounded-lg"
          />
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p className="text-4xl font-semibold text-neutral-400">
                  {movie.release_date.slice(0, 4)}
                </p>
              </div>
              <div className="flex gap-4 font-medium">
                <p className="rounded border-2 border-neutral-400 px-1 text-neutral-300">
                  {usCertification}
                </p>
                <p className="flex gap-1">
                  <CalendarDays />
                  {convertDate(movie.release_date)}
                </p>
                <p className="flex gap-1">
                  <Clapperboard />
                  {movie.genres?.map((g) => g.name).join(", ")}
                </p>
                <p className="flex gap-1">
                  <Clock8 />
                  {convertMinToHours(movie.runtime)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p
                  className={`rounded-lg border-4 px-2 text-3xl font-bold text-neutral-200 ${
                    movie.vote_average > 6
                      ? "border-green-500 bg-green-950"
                      : movie.vote_average > 4
                        ? "border-yellow-500 bg-yellow-950"
                        : "border-red-500 bg-red-950"
                  }`}
                >
                  {movie.vote_average.toFixed(1)}
                </p>
                Users Vote
              </div>
            </div>

            <div>
              <p className="text-lg text-neutral-300 italic">{movie.tagline}</p>
            </div>

            <div className="space-y-2">
              <h1 className="text-lg font-bold">Overview</h1>
              <p className="text-neutral-200">{movie.overview}</p>
            </div>

            <div className="space-y-2">
              <h1 className="text-lg font-bold">
                {(movie.production_companies?.length ?? 0) > 1
                  ? "Production Companies"
                  : "Production Companie"}
              </h1>
              <div className="space-x-5">
                {movie.production_companies?.map((c) => (
                  <span className="text-neutral-300 italic">{c.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
