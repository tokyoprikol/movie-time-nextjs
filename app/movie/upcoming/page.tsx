import type { Movie } from "@/lib/tmdb/types";
import { getAllMovieGenres, getUpcomingMovies } from "@/lib/tmdb/movies";
import { getPoster } from "@/lib/tmdb/getPoster";
import { convertDate } from "@/lib/tmdb/convertDate";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import FilterAccordion from "@/components/filter-accordion";
import Sidebar from "@/components/sidebar";

export default async function MoviesPopular() {
  const { results: movies, page, total_pages } = await getUpcomingMovies();
  const { genres } = await getAllMovieGenres();

  console.log(movies);
  console.log(genres);
  return (
    <div className="flex-1 space-y-10 bg-neutral-900/98 px-15 py-15 text-white">
      <h1 className="text-5xl font-bold text-neutral-200">Upcoming Movies</h1>

      <div className="flex justify-between space-x-10">
        <Sidebar genres={genres} />
        <div className="grid grid-cols-5 gap-10">
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
            >
              <div className="relative aspect-2/3 w-full">
                <Image
                  src={getPoster("w342", movie.poster_path)}
                  fill
                  sizes=""
                  alt="Poster"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 p-3">
                <h1 className="font-semibold">{movie.title}</h1>
                <h3 className="text-neutral-400">
                  {convertDate(movie.release_date)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
