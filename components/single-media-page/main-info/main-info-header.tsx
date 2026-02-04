import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { convertDate } from "@/lib/utils/convertDate";
import { convertMinToHours } from "@/lib/utils/convertTime";

import { CalendarDays, Clapperboard, Clock8 } from "lucide-react";

import UserVote from "./user-vote";
import { getMediaDate, getMediaTitle } from "@/lib/tmdb/media-details";

export default function MainInfoHeader({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  const isMovie = data.media_type === "movie";

  let usCertification;
  if (isMovie) {
    usCertification = data.release_dates?.results
      .find((item) => item.iso_3166_1 === "US")
      ?.release_dates.find((item) => item.certification !== "")?.certification;
  }
  if (!isMovie) {
    usCertification = data.content_ratings?.results.find(
      (item) => item.iso_3166_1 === "US",
    )?.rating;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{getMediaTitle(data)}</h1>
        <p className="text-4xl font-bold text-neutral-400">
          {getMediaDate(data)?.slice(0, 4) || "-"}
        </p>
      </div>
      <div className="flex gap-4 font-medium">
        {usCertification && (
          <p className="rounded border-2 border-neutral-400 px-1 text-neutral-300">
            {usCertification}
          </p>
        )}

        <p className="flex items-center gap-1">
          <CalendarDays size={20} />
          {convertDate(getMediaDate(data))}
        </p>
        <p className="flex items-center gap-1">
          <Clapperboard size={20} />
          {data.genres.map((g) => g.name).join(", ")}
        </p>
        {isMovie && (
          <p className="flex items-center gap-1">
            <Clock8 size={20} />
            {convertMinToHours(data.runtime ?? 0)}
          </p>
        )}
      </div>
      <UserVote data={data} />
    </div>
  );
}
