import { getPoster } from "@/lib/tmdb/getPoster";
import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CrewList({ data }: { data: MovieDetails | TvDetails }) {
  const isMovieCredits = "credits" in data;
  const crew = isMovieCredits ? data.credits.crew : data.aggregate_credits.crew;
  return (
    <div className="space-y-5">
      <h1 className="flex items-center gap-2 text-3xl font-semibold">
        Crew
        <span className="text-xl text-neutral-400">({crew.length})</span>
      </h1>
      <div className="space-y-8">
        {crew.map((item) => (
          <div
            key={
              isMovieCredits
                ? item.credit_id
                : "jobs" in item
                  ? item.jobs[0].credit_id
                  : item.job
            }
            className="flex items-center gap-8"
          >
            <Link href={`/people/${item.id}`}>
              {item.profile_path ? (
                <Image
                  src={getPoster("w500", item.profile_path)}
                  alt="poster"
                  width={80}
                  height={80}
                  className="rounded-lg border shadow-lg"
                />
              ) : (
                <div className="flex h-30 w-20 items-center justify-center rounded-lg border py-3 shadow-lg">
                  <ImageOff size={50} />
                </div>
              )}
            </Link>

            <div className="space-y-3">
              <Link href={`/people/${item.id}`}>
                <h1 className="text-lg font-semibold hover:underline">
                  {item.name}
                </h1>
              </Link>

              <span className="text-neutral-400">
                {"job" in item ? item.job : item.jobs[0].job}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
