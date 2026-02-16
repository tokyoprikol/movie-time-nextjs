import { convertDate } from "@/lib/utils/convertDate";
import DataField from "../single-media-page/data-field";
import { calculateAge } from "@/lib/utils/calculateAge";
import { PersonDetails } from "@/lib/tmdb/tmdbTypes";

export default function PersonPersonalInfo({
  person,
}: {
  person: PersonDetails;
}) {
  return (
    <div className="space-y-8 max-[400px]:hidden">
      <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
        Personal Info
      </h1>
      <DataField title="Known For" data={person.known_for_department} />
      <DataField
        title="Known Credits"
        data={person.combined_credits.cast.length ?? "-"}
      />
      <DataField
        title="Gender"
        data={person.gender ? (person.gender === 1 ? "Female" : "Male") : "-"}
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
  );
}
