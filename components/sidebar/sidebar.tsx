"use client";

import { Button } from "@/components/ui/button";
import FilterAccordion from "@/components/sidebar/filter-accordion";
import { GenresResponse } from "@/lib/tmdb/tmdbTypes";
import { useGenresStore } from "@/lib/selectedGenresStore";
import { useQueryClient } from "@tanstack/react-query";

export default function Sidebar({ genres }: GenresResponse) {
  const { setFilterActive } = useGenresStore();
  const queryClient = useQueryClient();

  const handleSearch = () => {
    // Reset React Query cache before activating filter
    queryClient.resetQueries({ queryKey: ["movie"] });
    queryClient.resetQueries({ queryKey: ["tv"] });
    setFilterActive(true);
  };

  return (
    <div className="hidden w-full max-w-40 flex-col space-y-5 md:max-w-40 lg:flex lg:max-w-50">
      <FilterAccordion genres={genres} />
      <Button variant={"secondary"} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
