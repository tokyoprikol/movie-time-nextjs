import { Button } from "@/components/ui/button";
import FilterAccordion from "@/components/filter-accordion";
import { Genre } from "@/lib/tmdb/types";

export default function Sidebar({ genres }: { genres: Genre[] }) {
  return (
    <div className="flex w-full max-w-60 flex-col space-y-5">
      <FilterAccordion genres={genres} />
      <Button className="border border-neutral-800 bg-neutral-900 py-5">
        Search
      </Button>
    </div>
  );
}
