import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { getPoster } from "@/lib/tmdb/getPoster";
import { getMediaType, getMediaTitle } from "@/lib/tmdb/media-details";
import { slugify } from "@/lib/utils/slugify";
import { PersonDetails } from "@/lib/tmdb/tmdbTypes";

export default function PersonKnowFor({ person }: { person: PersonDetails }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Known For</h1>
      <div className="flex gap-10">
        {person.combined_credits.cast.length > 0 ? (
          person.combined_credits.cast
            .filter(
              (media, index, self) =>
                index === self.findIndex((t) => t.id === media.id),
            )
            .sort(
              (a, b) =>
                b.popularity - a.popularity && b.vote_count - a.vote_count,
            )
            .slice(0, 5)
            .map((media) => (
              <div key={media.id} className="w-40">
                <Link
                  href={`/${getMediaType(
                    media,
                  )}/${media.id}-${slugify(getMediaTitle(media))}`}
                >
                  {media.poster_path ? (
                    <div className="relative aspect-2/3">
                      <Image
                        src={getPoster("w500", media.poster_path)}
                        alt="Poster"
                        fill
                        className="rounded-lg border object-top shadow-xl"
                      />
                    </div>
                  ) : (
                    <ImageOff />
                  )}

                  <div className="p-4 pt-2 text-center font-semibold">
                    {getMediaTitle(media)}
                  </div>
                </Link>
              </div>
            ))
        ) : (
          <span className="text-xl text-neutral-400">No Info</span>
        )}
      </div>
    </div>
  );
}
