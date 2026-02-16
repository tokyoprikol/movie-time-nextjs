import Link from "next/link";

import {
  getMediaDate,
  getMediaType,
  getMediaTitle,
} from "@/lib/tmdb/media-details";
import { PersonDetails } from "@/lib/tmdb/tmdbTypes";
import { slugify } from "@/lib/utils/slugify";
import { Minus, Circle } from "lucide-react";

export default function PersonActing({ person }: { person: PersonDetails }) {
  return (
    <div className="space-y-5 max-[400px]:hidden">
      <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">Acting</h1>
      <div className="flex flex-col overflow-hidden rounded-lg border shadow-lg dark:bg-neutral-900/50">
        {person.combined_credits.cast
          .filter((media, index, self) => {
            const isUnique = index === self.findIndex((t) => t.id === media.id);
            const hasDate = getMediaDate(media);
            return isUnique && hasDate && media.vote_count > 10;
          })
          .sort((a, b) => {
            const dateA = new Date(getMediaDate(a)).getTime();
            const dateB = new Date(getMediaDate(b)).getTime();

            return dateB - dateA || b.popularity - a.popularity;
          })
          .map((media) => (
            <div
              key={media.id}
              className="flex items-center gap-10 border-b-2 px-3 py-2 last:border-none md:gap-6 md:px-5"
            >
              <div className="flex justify-center text-sm font-bold md:text-lg">
                {getMediaDate(media) ? (
                  getMediaDate(media).slice(0, 4)
                ) : (
                  <Minus />
                )}
              </div>
              <Circle size={15} />
              <div className="text-sm md:text-base">
                <Link
                  href={`/${getMediaType(
                    media,
                  )}/${media.id}-${slugify(getMediaTitle(media))}`}
                >
                  <h1 className="font-bold hover:underline">
                    {getMediaTitle(media)}
                  </h1>
                </Link>

                <p className="text-neutral-400">
                  as <span className="font-semibold">{media.character}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
