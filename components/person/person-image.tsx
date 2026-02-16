import Image from "next/image";
import { getPoster } from "@/lib/tmdb/getPoster";
import { PersonDetails } from "@/lib/tmdb/tmdbTypes";

import { ImageOff } from "lucide-react";

export default function PersonImage({ person }: { person: PersonDetails }) {
  return person.profile_path ? (
    <div className="relative aspect-2/3 w-full min-w-30 overflow-hidden rounded-lg border shadow-lg md:min-w-40 lg:min-w-50 xl:min-w-60">
      <Image
        src={getPoster("w780", person.profile_path)}
        alt="Person"
        fill
        className="object-cover"
      />
    </div>
  ) : (
    <div className="relative flex aspect-2/3 w-full min-w-30 items-center justify-center overflow-hidden rounded-lg border shadow-lg md:min-w-40 lg:min-w-50 xl:min-w-60">
      <ImageOff size={200} />
    </div>
  );
}
