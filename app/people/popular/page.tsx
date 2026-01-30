import { getPoster } from "@/lib/tmdb/getPoster";
import { getPopularPeople } from "@/lib/tmdb/people";
import { People } from "@/lib/tmdb/types";

import Image from "next/image";

export default async function Page() {
  const { results: people } = await getPopularPeople();
  console.log(people);

  return (
    <div className="flex-1 space-y-10 bg-neutral-900/98 px-15 py-15 text-white">
      <h1 className="text-5xl font-bold text-neutral-200">Popular people</h1>
      <div className="grid grid-cols-5 gap-10">
        {people.map((person: People) => (
          <div
            key={person.id}
            className="cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl"
          >
            <div className="relative aspect-2/3 w-full">
              <Image
                src={getPoster("w342", person.profile_path)}
                fill
                sizes=""
                alt="Image"
                className="object-cover"
              />
            </div>

            <div className="space-y-2 p-3">
              <p className="font-semibold">{person.name}</p>
              <div className="text-xs text-neutral-300">
                {person.known_for
                  .map((item) => item.title || item.name)
                  .join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
