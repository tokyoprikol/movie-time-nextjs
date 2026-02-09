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
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Acting</h1>
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
              className="flex items-center gap-6 border-b-2 p-5 last:border-none"
            >
              <div className="flex w-full max-w-15 justify-center text-lg font-bold">
                {getMediaDate(media) ? (
                  getMediaDate(media).slice(0, 4)
                ) : (
                  <Minus />
                )}
              </div>
              <Circle size={15} className="w-full max-w-15" />
              <div className="w-full">
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
