"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SelectSort from "@/components/sidebar/select-sort";
import { Button } from "../ui/button";
import { Genre } from "@/lib/tmdb/types";
import { useState } from "react";

export default function FilterAccordion({ genres }: { genres: Genre[] }) {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.some((g) => g.id === genre.id)
        ? prev.filter((g) => g.id != genre.id)
        : [...prev, genre],
    );
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["item-2"]}
      className="space-y-3 rounded-lg border-b"
    >
      <AccordionItem value="item-1" className="rounded-lg border px-4">
        <AccordionTrigger>Sort</AccordionTrigger>
        <AccordionContent>
          <SelectSort />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="rounded-lg border px-4">
        <AccordionTrigger>Filters</AccordionTrigger>
        <AccordionContent>
          <h1 className="mb-3 text-neutral-400">Genres</h1>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre: Genre) => (
              <Button
                key={genre.id}
                size={"sm"}
                variant={
                  selectedGenres.some((g) => g.id === genre.id)
                    ? "default"
                    : "secondary"
                }
                onClick={() => handleSelectGenre(genre)}
              >
                {genre.name}
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
