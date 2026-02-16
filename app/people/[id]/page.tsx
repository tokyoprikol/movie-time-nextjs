import { Params } from "@/lib/tmdb/tmdbTypes";
import { getPersonById } from "@/lib/tmdb/API/people";

import PersonImage from "@/components/person/person-image";
import PersonPersonalInfo from "@/components/person/person-personal-info";
import PersonBiography from "@/components/person/person-biography";
import PersonKnowFor from "@/components/person/person-know-for";
import PersonActing from "@/components/person/person-acting";
import {
  getMediaDate,
  getMediaTitle,
  getMediaType,
} from "@/lib/tmdb/media-details";
import { slugify } from "@/lib/utils/slugify";
import { getPoster } from "@/lib/tmdb/getPoster";
import { Circle, ImageOff, Minus } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { convertDate } from "@/lib/utils/convertDate";
import { calculateAge } from "@/lib/utils/calculateAge";
import DataField from "@/components/single-media-page/data-field";

export default async function PersonPage({ params }: Params) {
  const { id } = await params;
  const person = await getPersonById(id);

  console.log(person);

  return (
    <div className="flex-1 p-7 md:p-10 lg:p-15">
      <div className="flex gap-10">
        <div className="space-y-20">
          <PersonImage person={person} />
          <PersonPersonalInfo person={person} />
        </div>

        <div className="min-w-0 space-y-5 overflow-visible md:space-y-10">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            {person.name}
          </h1>
          <PersonBiography person={person} />
          <PersonKnowFor person={person} />
          <PersonActing person={person} />
        </div>
      </div>
      <div className="mb-5 space-y-2 min-[400px]:hidden">
        <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
          Known For
        </h1>
        <div className="flex w-full min-w-0 gap-10 overflow-x-auto">
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
                <Link
                  className="w-full max-w-24 min-w-24 shrink-0 md:max-w-36 md:min-w-36"
                  key={media.id}
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

                  <div className="p-4 pt-2 text-center text-sm font-semibold">
                    {getMediaTitle(media)}
                  </div>
                </Link>
              ))
          ) : (
            <span className="text-xl text-neutral-400">No Info</span>
          )}
        </div>
      </div>

      <div className="mb-5 space-y-8 min-[400px]:hidden">
        <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
          Personal Info
        </h1>

        <div className="grid grid-cols-3 gap-7">
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
            <h1 className="sm:text-md text-sm font-semibold">Also Known As</h1>
            <span className="text-neutral-400 italic">
              {person.also_known_as.length > 0
                ? person.also_known_as.map((i: string) => <p key={i}>{i}</p>)
                : "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-5 space-y-5 min-[400px]:hidden">
        <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">Acting</h1>
        <div className="flex flex-col overflow-hidden rounded-lg border shadow-lg dark:bg-neutral-900/50">
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
    </div>
  );
}
