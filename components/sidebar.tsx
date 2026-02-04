import { Button } from "@/components/ui/button";
import FilterAccordion from "@/components/filter-accordion";
import { GenresResponse } from "@/lib/tmdb/tmdbTypes";

export default function Sidebar({ genres }: GenresResponse) {
  return (
    <div className="flex w-full max-w-60 flex-col space-y-5">
      <FilterAccordion genres={genres} />
      <Button className="border border-neutral-800 bg-neutral-100 py-5 text-neutral-950 hover:bg-neutral-300">
        Search
      </Button>
    </div>
  );
}
