import Image from "next/image";
import Link from "next/link";

import { Params } from "@/lib/tmdb/tmdbTypes";
import { getPersonById } from "@/lib/tmdb/API/people";

import {
  getMediaTitle,
  getMediaDate,
  getMediaType,
} from "@/lib/tmdb/media-details";
import { getPoster } from "@/lib/tmdb/getPoster";
import { calculateAge } from "@/lib/utils/calculateAge";
import { convertDate } from "@/lib/utils/convertDate";
import { slugify } from "@/lib/utils/slugify";

import PersonBiography from "@/components/person-biography";
import DataField from "@/components/single-media-page/data-field";
import { Circle, ImageOff, Minus } from "lucide-react";

export default async function PersonPage({ params }: Params) {
  const { id } = await params;
  const person = await getPersonById(id);

  console.log(person);

  return (
    <div className="flex-1 bg-neutral-900/98 p-20 text-neutral-100">
      <div className="flex gap-10">
        <div className="space-y-20">
          {person.profile_path ? (
            <div className="relative w-full min-w-2xs">
              <Image
                src={getPoster("w780", person.profile_path)}
                alt="Person"
                width={400}
                height={200}
                className="rounded-xl object-top"
              />
            </div>
          ) : (
            <ImageOff />
          )}

          <div className="space-y-8">
            <h1 className="text-2xl font-semibold">Personal Info</h1>
            <DataField title="Known For" data={person.known_for_department} />
            <DataField
              title="Known Credits"
              data={person.combined_credits.cast.length ?? "-"}
            />
            <DataField
              title="Gender"
              data={
                person.gender ? (person.gender === 1 ? "Female" : "Male") : "-"
              }
            />
            <DataField
              title="Birthday"
              data={
                person.birthday
                  ? convertDate(person.birthday ?? "") +
                    ` (${calculateAge(person.birthday ?? "")} years)`
                  : "-"
              }
            />

            <DataField title="Place of Birth" data={person.place_of_birth} />

            <div>
              <h1 className="text-lg font-semibold">Also Known As</h1>
              <span className="text-neutral-300 italic">
                {person.also_known_as
                  ? person.also_known_as.map((i) => <p key={i}>{i}</p>)
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <h1 className="text-5xl font-bold">{person.name}</h1>
          <PersonBiography person={person} />
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
                      b.popularity - a.popularity &&
                      b.vote_count - a.vote_count,
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
                              className="rounded-lg object-top"
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

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Acting</h1>
            <div className="flex flex-col overflow-hidden rounded-4xl shadow-2xl">
              {person.combined_credits.cast
                .filter((media, index, self) => {
                  const isUnique =
                    index === self.findIndex((t) => t.id === media.id);
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
                    className="flex items-center gap-6 border-b-2 border-neutral-800 bg-neutral-900 p-5 last:border-none"
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

                      <p className="text-neutral-200">
                        <span className="text-neutral-400">as </span>
                        {media.character}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
