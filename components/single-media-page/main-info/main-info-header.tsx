import { Movie, TvSeries } from "@/lib/tmdb/types";
import { convertDate } from "@/lib/utils/convertDate";
import { convertMinToHours } from "@/lib/utils/convertTime";
import { CalendarDays, Clapperboard, Clock8 } from "lucide-react";
import UserVote from "./user-vote";

export default function MainInfoHeader({ data }: { data: Movie | TvSeries }) {
  function getMediaTitle(item: Movie | TvSeries) {
    return "title" in item ? item.title : item.name;
  }

  function getMediaDate(item: Movie | TvSeries) {
    return "release_date" in item ? item.release_date : item.first_air_date;
  }

  function checkMediaType(item: Movie | TvSeries) {
    if ("title" in item) return "movie";
    if ("name" in item) return "tv";
  }

  const mediaType = checkMediaType(data);

  let usCertification;
  if (mediaType === "movie") {
    const mediaData = data as Movie;
    usCertification = mediaData.release_dates?.results
      .find((item) => item.iso_3166_1 === "US")
      ?.release_dates.find((item) => item.certification !== "")?.certification;
  }
  if (mediaType === "tv") {
    const mediaData = data as TvSeries;
    usCertification = mediaData.content_ratings?.results.find(
      (item) => item.iso_3166_1 === "US",
    )?.rating;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{getMediaTitle(data)}</h1>
        <p className="text-4xl font-bold text-neutral-400">
          {getMediaDate(data).slice(0, 4)}
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
          {data.genres?.map((g) => g.name).join(", ")}
        </p>
        {"runtime" in data && (
          <p className="flex items-center gap-1">
            <Clock8 size={20} />
            {convertMinToHours(data.runtime)}
          </p>
        )}
      </div>
      <UserVote data={data} />
    </div>
  );
}
