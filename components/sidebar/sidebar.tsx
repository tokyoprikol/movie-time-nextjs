import { Button } from "@/components/ui/button";
import FilterAccordion from "@/components/sidebar/filter-accordion";
import { GenresResponse } from "@/lib/tmdb/tmdbTypes";

export default function Sidebar({ genres }: GenresResponse) {
  return (
    <div className="hidden w-full max-w-40 flex-col space-y-5 md:max-w-40 lg:flex lg:max-w-50">
      <FilterAccordion genres={genres} />
      <Button variant={"secondary"}>Search</Button>
    </div>
  );
}
