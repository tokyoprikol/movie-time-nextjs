import { Movie } from "@/lib/tmdb/types";
import { convertDate } from "@/lib/utils/convertDate";
import { convertMinToHours } from "@/lib/utils/convertTime";
import { CalendarDays, Clapperboard, Clock8 } from "lucide-react";
import UserVote from "./user-vote";

export default function MainInfoHeader({ movie }: { movie: Movie }) {
  const usCertification = movie.release_dates?.results
    .find((item) => item.iso_3166_1 === "US")
    ?.release_dates.find((item) => item.certification !== "")?.certification;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="text-4xl font-bold text-neutral-400">
          {movie.release_date.slice(0, 4)}
        </p>
      </div>
      <div className="flex gap-4 font-medium">
        <p className="rounded border-2 border-neutral-400 px-1 text-neutral-300">
          {usCertification}
        </p>
        <p className="flex items-center gap-1">
          <CalendarDays size={20} />
          {convertDate(movie.release_date)}
        </p>
        <p className="flex items-center gap-1">
          <Clapperboard size={20} />
          {movie.genres?.map((g) => g.name).join(", ")}
        </p>
        <p className="flex items-center gap-1">
          <Clock8 size={20} />
          {convertMinToHours(movie.runtime)}
        </p>
      </div>
      <UserVote movie={movie} />
    </div>
  );
}
