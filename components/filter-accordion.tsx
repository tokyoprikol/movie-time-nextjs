import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SelectSort from "@/components/select-sort";
import { getAllMovieGenres } from "@/lib/tmdb/movies";
import { Button } from "./ui/button";
import { Genre } from "@/lib/tmdb/types";

export default async function FilterAccordion() {
  const { genres } = await getAllMovieGenres();

  return (
    <Accordion
      type="multiple"
      defaultValue={["item-2"]}
      className="space-y-3 rounded-lg border-b border-neutral-800"
    >
      <AccordionItem
        value="item-1"
        className="rounded-lg border border-neutral-800 bg-neutral-900 px-4"
      >
        <AccordionTrigger>Sort</AccordionTrigger>
        <AccordionContent>
          <SelectSort />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className="rounded-lg border border-neutral-800 bg-neutral-900 px-4"
      >
        <AccordionTrigger>Filters</AccordionTrigger>
        <AccordionContent>
          <h1 className="mb-3 text-neutral-400">Genres</h1>
          <div className="flex flex-wrap gap-2">
            {genres.map((g: Genre) => (
              <Button
                key={g.id}
                className="border border-neutral-700 bg-neutral-800"
              >
                {g.name}
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
