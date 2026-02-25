"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SelectSort from "@/components/sidebar/select-sort";
import { Button } from "../ui/button";

import { useGenresStore } from "@/lib/selectedGenresStore";
import { Genres } from "@/lib/tmdb/tmdbTypes";

export default function FilterAccordion({ genres }: { genres: Genres[] }) {
  const { selectedGenres, setSelectedGenres } = useGenresStore();

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
            {genres.map((genre: Genres) => (
              <Button
                key={genre.id}
                size={"xs"}
                variant={
                  selectedGenres.some((g) => g.id === genre.id)
                    ? "default"
                    : "secondary"
                }
                onClick={() => setSelectedGenres(genre)}
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
