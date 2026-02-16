import { getPoster } from "@/lib/tmdb/getPoster";
import { getMediaTitle } from "@/lib/tmdb/media-details";
import { PersonListItem } from "@/lib/tmdb/tmdbTypes";
import { slugify } from "@/lib/utils/slugify";
import { ImageOff } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

interface PeopleListProps {
  title: string;
  data: PersonListItem[];
}

export default function PeopleList({ title, data }: PeopleListProps) {
  return (
    <>
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
        {data
          .filter((person) => person.profile_path)
          .map((person: PersonListItem) => (
            <div
              key={person.id}
              className="cursor-pointer overflow-hidden rounded-lg border shadow-xl dark:bg-neutral-900/50"
            >
              <Link href={`/people/${person.id}-${slugify(person.name)}`}>
                {person.profile_path ? (
                  <div className="relative aspect-2/3 w-full">
                    <Image
                      src={getPoster("w342", person.profile_path)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      alt="Image"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center py-23">
                    <ImageOff size={200} />
                  </div>
                )}

                <div className="space-y-1 p-3 sm:space-y-2">
                  <p className="text-sm font-semibold sm:text-base">
                    {person.name}
                  </p>
                  <div className="line-clamp-1 text-xs text-neutral-400 sm:text-base">
                    {person.known_for
                      .map((item) => getMediaTitle(item))
                      .join(", ")}
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
