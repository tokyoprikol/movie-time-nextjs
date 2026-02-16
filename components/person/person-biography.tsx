"use client";

import { PersonDetails } from "@/lib/tmdb/tmdbTypes";
import { Button } from "../ui/button";
import { useState } from "react";

export default function PersonBiography({ person }: { person: PersonDetails }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
        Biography
      </h1>
      <p
        className={`text-sm md:text-base ${isOpen ? "line-clamp-none" : "line-clamp-5"}`}
      >
        {person.biography ? (
          person.biography
        ) : (
          <span className="text-xl text-neutral-400">No Info</span>
        )}
      </p>
      <div className="flex justify-end">
        {person.biography && (
          <Button
            variant="secondary"
            size="xs"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "close" : "read more"}
          </Button>
        )}
      </div>
    </div>
  );
}
