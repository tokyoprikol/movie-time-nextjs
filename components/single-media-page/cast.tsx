import { getPoster } from "@/lib/tmdb/getPoster";
import { CreditsCast, Movie, TvSeries } from "@/lib/tmdb/types";
import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";

export default function Cast({ data }: { data: Movie | TvSeries }) {
  function getMediaCredits(data: Movie | TvSeries) {
    if ("credits" in data) return data.credits;
    if ("aggregate_credits" in data) return data.aggregate_credits;
  }

  const credits = getMediaCredits(data) as { cast: CreditsCast[] };

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Cast</h1>
      <div className="flex flex-nowrap justify-center gap-5 overflow-hidden">
        {credits?.cast.slice(0, 6).map((item) => (
          <div
            key={item.cast_id || item.id}
            className="w-full max-w-43 rounded-lg bg-neutral-900 shadow-2xl"
          >
            <div className="relative aspect-3/4 w-full">
              {item.profile_path ? (
                <Image
                  src={getPoster("w342", item.profile_path)}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  alt="profile"
                  className="rounded-t-lg object-cover object-top"
                />
              ) : (
                <div className="flex justify-center pt-20">
                  <ImageOff size={80} />
                </div>
              )}
            </div>

            <div className="space-y-3 p-3">
              <div className="text-sm font-semibold">{item.name}</div>
              <div className="text-xs text-neutral-300">
                {item.character || item.roles?.[0].character}
              </div>
              {item.roles?.[0].episode_count && (
                <div className="text-xs text-neutral-400">
                  {item.roles?.[0].episode_count} Episodes
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link
          href=""
          className="border-b text-lg font-semibold hover:border-b-neutral-300 hover:text-neutral-300"
        >
          Full Cast & Crew
        </Link>
      </div>
    </div>
  );
}
