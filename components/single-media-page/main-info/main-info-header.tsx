import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { convertDate } from "@/lib/utils/convertDate";
import { convertMinToHours } from "@/lib/utils/convertTime";

import { CalendarDays, Clapperboard, Clock8 } from "lucide-react";

import UserVote from "./user-vote";
import {
  getMediaDate,
  getMediaTitle,
  getMediaType,
} from "@/lib/tmdb/media-details";

export default function MainInfoHeader({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  const isMovie = getMediaType(data);

  let usCertification;
  if (isMovie) {
    const mediaData = data as MovieDetails;
    usCertification = mediaData.release_dates?.results
      .find((item) => item.iso_3166_1 === "US")
      ?.release_dates.find((item) => item.certification !== "")?.certification;
  }
  if (!isMovie) {
    const mediaData = data as TvDetails;
    usCertification = mediaData.content_ratings?.results.find(
      (item) => item.iso_3166_1 === "US",
    )?.rating;
  }

  return (
    <div className="space-y-1 text-xs text-white sm:space-y-3 md:text-sm lg:text-base">
      <div className="flex gap-1 max-[420px]:flex-col max-[375px]:hidden sm:items-center sm:gap-3">
        <h1 className="text-lg font-bold sm:text-xl lg:text-2xl xl:text-3xl">
          {getMediaTitle(data)}
        </h1>
        <p className="text-lg font-bold text-neutral-300 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {getMediaDate(data)?.slice(0, 4) || "-"}
        </p>
      </div>
      <div className="flex flex-col items-start gap-4 font-medium max-[375px]:hidden sm:flex-row">
        {usCertification && (
          <p className="flex items-center rounded border-2 border-neutral-300 px-1 text-neutral-200">
            {usCertification}
          </p>
        )}

        <p className="flex items-center gap-1">
          <CalendarDays className="size-5" />
          {convertDate(getMediaDate(data))}
        </p>
        <p className="flex items-center gap-1">
          <Clapperboard className="size-5" />
          {data.genres.map((g) => g.name).join(", ")}
        </p>
        {"runtime" in data && (
          <p className="flex items-center gap-1">
            <Clock8 className="size-5" />
            {"runtime" in data && convertMinToHours(data.runtime ?? 0)}
          </p>
        )}
      </div>
      <UserVote data={data} />
    </div>
  );
}
