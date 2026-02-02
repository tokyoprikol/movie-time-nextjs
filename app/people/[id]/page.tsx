import PersonBiography from "@/components/person-biography";
import DataField from "@/components/single-media-page/data-field";
import { getPoster } from "@/lib/tmdb/getPoster";
import { getPersonById } from "@/lib/tmdb/people";
import { calculateAge } from "@/lib/utils/calculateAge";
import { convertDate } from "@/lib/utils/convertDate";
import Image from "next/image";

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = await getPersonById(id);

  console.log(person);

  return (
    <div className="flex-1 bg-neutral-900/98 p-20 text-neutral-100">
      <div className="flex gap-10">
        <div className="space-y-20">
          <div className="relative w-full min-w-2xs">
            <Image
              src={getPoster("w780", person.profile_path)}
              alt="Person"
              width={400}
              height={200}
              className="rounded-xl object-top"
            />
          </div>
          <div className="space-y-8">
            <h1 className="text-2xl font-semibold">Personal Info</h1>
            <DataField title="Known For" data={person.known_for_department} />
            <DataField
              title="Known Credits"
              data={person.combined_credits.cast.length}
            />
            <DataField
              title="Gender"
              data={person.gender === 1 ? "Female" : "Male"}
            />
            <DataField
              title="Birthday"
              data={
                convertDate(person.birthday ?? "") +
                ` (${calculateAge(person.birthday ?? "")} years)`
              }
            />
            <DataField title="Place of Birth" data={person.place_of_birth} />

            <div>
              <h1 className="text-lg font-semibold">Also Known As</h1>
              <span className="text-neutral-300 italic">
                {person.also_known_as.length !== 0
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
              {person.combined_credits.cast
                .filter(
                  (m, index, self) =>
                    m.vote_count > 3000 &&
                    index === self.findIndex((t) => t.id === m.id),
                )
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 5)
                .map((m) => (
                  <div key={m.id} className="w-40">
                    <div className="relative aspect-2/3">
                      <Image
                        src={getPoster("w500", m.poster_path)}
                        alt="Poster"
                        fill
                        className="rounded-lg object-top"
                      />
                    </div>
                    <div className="p-4 pt-2 text-center font-semibold">
                      {m.title || m.name}
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
