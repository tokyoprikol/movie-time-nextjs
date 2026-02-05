import Image from "next/image";
import { getPoster } from "@/lib/tmdb/getPoster";
import { PersonDetails } from "@/lib/tmdb/tmdbTypes";

import { ImageOff } from "lucide-react";

export default function PersonImage({ person }: { person: PersonDetails }) {
  return person.profile_path ? (
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
  );
}
