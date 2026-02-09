import { Button } from "@/components/ui/button";
import FilterAccordion from "@/components/sidebar/filter-accordion";
import { GenresResponse } from "@/lib/tmdb/tmdbTypes";

export default function Sidebar({ genres }: GenresResponse) {
  return (
    <div className="flex w-full max-w-60 flex-col space-y-5">
      <FilterAccordion genres={genres} />
      <Button>Search</Button>
    </div>
  );
}
