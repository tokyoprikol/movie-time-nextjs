import { getPoster } from "@/lib/tmdb/getPoster";
import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import { ImageOff } from "lucide-react";
import Image from "next/image";

export default function CrewList({ data }: { data: MovieDetails | TvDetails }) {
  const crew =
    "credits" in data ? data.credits.crew : data.aggregate_credits.crew;
  return (
    <div className="space-y-5">
      <h1 className="flex items-center gap-2 text-3xl font-semibold">
        Crew
        <span className="text-xl text-neutral-400">({crew.length})</span>
      </h1>
      <div className="space-y-8">
        {crew.map((item) => (
          <div key={item.credit_id} className="flex items-center gap-8">
            {item.profile_path ? (
              <Image
                src={getPoster("w500", item.profile_path)}
                alt="poster"
                width={80}
                height={80}
                className="rounded-lg border-3 border-neutral-700 shadow-2xl"
              />
            ) : (
              <div className="flex h-30 w-20 items-center justify-center rounded-lg border-3 border-neutral-700 py-3 shadow-2xl">
                <ImageOff size={50} />
              </div>
            )}
            <div className="space-y-3">
              <h1 className="text-lg font-semibold">{item.name}</h1>
              <span className="text-neutral-200">
                {"job" in item ? item.job : item.jobs[0].job}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
