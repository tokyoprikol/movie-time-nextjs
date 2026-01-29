import type { TvSeries } from "@/lib/tmdb/types";
import { getAllTvSeriesGenres, getPopularTvSeries } from "@/lib/tmdb/tv-series";
import { getPoster } from "@/lib/tmdb/getPoster";
import { convertDate } from "@/lib/tmdb/convertDate";
import Image from "next/image";
import Sidebar from "@/components/sidebar";

export default async function MoviesPopular() {
  const { results: tvSeries, page, total_pages } = await getPopularTvSeries();
  const { genres } = await getAllTvSeriesGenres();

  console.log(tvSeries);
  console.log(genres);
  return (
    <div className="flex-1 space-y-10 bg-neutral-900/98 px-15 py-15 text-white">
      <h1 className="text-5xl font-bold text-neutral-200">Popular TV Shows</h1>

      <div className="flex justify-between space-x-10">
        <Sidebar genres={genres} />
        <div className="grid grid-cols-5 gap-10">
          {tvSeries.map((tv: TvSeries) => (
            <div
              key={tv.id}
              className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
            >
              <div className="relative aspect-2/3 w-full">
                <Image
                  src={getPoster("w342", tv.poster_path)}
                  fill
                  sizes=""
                  alt="Poster"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 p-3">
                <h1 className="font-semibold">{tv.name}</h1>
                <h3 className="text-neutral-400">
                  {convertDate(tv.first_air_date)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
