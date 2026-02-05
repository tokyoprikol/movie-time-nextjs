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
      <h1 className="text-5xl font-bold text-neutral-200">{title}</h1>
      <div className="grid grid-cols-5 gap-10">
        {data.map((person: PersonListItem) => (
          <div
            key={person.id + crypto.randomUUID()}
            className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
          >
            <Link href={`/people/${person.id}-${slugify(person.name)}`}>
              {person.profile_path ? (
                <div className="relative aspect-2/3 w-full">
                  <Image
                    src={getPoster("w342", person.profile_path)}
                    fill
                    sizes=""
                    alt="Image"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex justify-center py-23">
                  <ImageOff size={200} />
                </div>
              )}

              <div className="space-y-2 p-3">
                <p className="font-semibold">{person.name}</p>
                <div className="text-xs text-neutral-300">
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
