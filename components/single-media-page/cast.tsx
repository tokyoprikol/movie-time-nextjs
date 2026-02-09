import Image from "next/image";
import Link from "next/link";

import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { getPoster } from "@/lib/tmdb/getPoster";

import { ImageOff } from "lucide-react";
import { slugify } from "@/lib/utils/slugify";
import { getMediaTitle, getMediaType } from "@/lib/tmdb/media-details";

export default function Cast({ data }: { data: MovieDetails | TvDetails }) {
  const cast =
    "credits" in data ? data.credits?.cast : data.aggregate_credits?.cast;

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Cast</h1>
      <div className="flex flex-nowrap justify-center gap-5">
        {cast?.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="w-full max-w-43 rounded-lg border shadow-lg dark:bg-neutral-900/50"
          >
            <Link href={`/people/${item.id}`}>
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
                <div className="text-xs text-neutral-400">
                  {"character" in item
                    ? item.character
                    : item.roles[0].character}
                </div>
                {"roles" in item && (
                  <div className="text-xs text-neutral-400">
                    {item.roles[0].episode_count} Episodes
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Link
          href={`${data.id}-${slugify(getMediaTitle(data))}/cast`}
          className="border-b text-lg font-semibold hover:text-neutral-400"
        >
          Full Cast & Crew
        </Link>
      </div>
    </div>
  );
}
