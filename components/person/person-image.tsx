import Image from "next/image";
import { getPoster } from "@/lib/tmdb/getPoster";
import { PersonDetails } from "@/lib/tmdb/tmdbTypes";

import { ImageOff } from "lucide-react";

export default function PersonImage({ person }: { person: PersonDetails }) {
  return person.profile_path ? (
    <div className="relative w-full min-w-2xs overflow-hidden rounded-lg border shadow-lg">
      <Image
        src={getPoster("w780", person.profile_path)}
        alt="Person"
        width={400}
        height={200}
        className="object-cover"
      />
    </div>
  ) : (
    <div className="relative flex aspect-2/3 w-full min-w-2xs items-center justify-center overflow-hidden rounded-lg border shadow-lg">
      <ImageOff size={200} />
    </div>
  );
}
