import { getPopularMovies } from "@/lib/tmdb/movies";
import type { Movie } from "@/lib/tmdb/types";
import { getPoster } from "@/lib/tmdb/getPoster";
import Image from "next/image";
import dayjs from "dayjs";

export default async function MoviesPopular() {
  const { results: movies, page, total_pages } = await getPopularMovies();
  console.log(movies);
  return (
    <div className="grid flex-1 grid-cols-5 gap-10 bg-neutral-900/98 px-15 py-15 text-white">
      {movies.map((movie: Movie) => (
        <div
          key={movie.id}
          className="overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
        >
          <div className="relative aspect-2/3 w-full">
            <Image
              src={getPoster("w342", movie.poster_path)}
              fill
              alt="Poster"
              className="object-cover"
            />
          </div>

          <div className="space-y-2 p-3">
            <h1 className="font-semibold">{movie.title}</h1>
            <h3 className="text-neutral-400">
              {dayjs(movie.release_date).format("MMM D, YYYY")}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
