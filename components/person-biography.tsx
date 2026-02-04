"use client";

import { PersonDetails } from "@/lib/tmdb/tmdbTypes";
import { Button } from "./ui/button";
import { useState } from "react";

export default function PersonBiography({ person }: { person: PersonDetails }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Biography</h1>
      <p className={`${isOpen ? "line-clamp-none" : "line-clamp-5"}`}>
        {person.biography}
      </p>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="xs"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "close" : "read more"}
        </Button>
      </div>
    </div>
  );
}
