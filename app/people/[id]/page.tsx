import { Params } from "@/lib/tmdb/tmdbTypes";
import { getPersonById } from "@/lib/tmdb/API/people";

import PersonImage from "@/components/person/person-image";
import PersonPersonalInfo from "@/components/person/person-personal-info";
import PersonBiography from "@/components/person/person-biography";
import PersonKnowFor from "@/components/person/person-know-for";
import PersonActing from "@/components/person/person-acting";

export default async function PersonPage({ params }: Params) {
  const { id } = await params;
  const person = await getPersonById(id);

  console.log(person);

  return (
    <div className="flex-1 bg-neutral-900/98 p-20 text-neutral-100">
      <div className="flex gap-10">
        <div className="space-y-20">
          <PersonImage person={person} />
          <PersonPersonalInfo person={person} />
        </div>

        <div className="space-y-10">
          <h1 className="text-5xl font-bold">{person.name}</h1>
          <PersonBiography person={person} />
          <PersonKnowFor person={person} />
          <PersonActing person={person} />
        </div>
      </div>
    </div>
  );
}
