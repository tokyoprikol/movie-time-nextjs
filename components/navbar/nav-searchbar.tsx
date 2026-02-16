"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { getMultiSearchResponse } from "@/lib/tmdb/API/search";
import {
  getSearchItemIcon,
  getSearchItemTitle,
} from "@/lib/tmdb/media-details";
import Link from "next/link";

async function fetchSearchResults(query: string) {
  if (query.length < 2) return [];
  const searchResults = await getMultiSearchResponse(
    1,
    encodeURIComponent(query),
  );
  return searchResults.results;
}

export default function NavSearchBar() {
  const [query, setQuery] = useState("");

  const [debouncedQuery] = useDebounce(query, 400);
  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 60_000,
    placeholderData: (prev) => prev ?? [],
  });

  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const showDropdownSearch =
    query.length >= 2 && (isLoading || results.length > 0);

  return (
    <form
      className="relative hidden w-full max-w-60 items-center gap-1 sm:flex sm:max-w-70 lg:max-w-70 xl:max-w-100"
      onSubmit={handleSearch}
    >
      <InputGroup className="h-8 lg:h-9">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          className="text-sm"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
      <Button variant={"outline"} type="submit" className="h-8 lg:h-9">
        <SearchIcon />
      </Button>

      {showDropdownSearch && (
        <div className="absolute top-full left-0 z-100 mt-3 w-full rounded-md border bg-neutral-50 p-4 shadow-lg lg:max-w-lg dark:bg-neutral-900">
          <div className="text-sm">
            {isLoading ? (
              "Loading..."
            ) : results.length === 0 ? (
              "No search results"
            ) : (
              <div className="space-y-3">
                <h1 className="text-lg font-semibold">Results</h1>
                <div className="flex flex-col gap-2">
                  {results.slice(0, 10).map((item) => (
                    <Link
                      key={item.id}
                      href={`/${item.media_type === "person" ? "people" : item.media_type}/${item.id}`}
                      onClick={() => setQuery("")}
                    >
                      <div className="flex items-center justify-between rounded-md border pr-2">
                        <Button
                          size={"sm"}
                          variant={"ghost"}
                          className="flex w-full max-w-xs justify-start overflow-hidden"
                        >
                          {getSearchItemTitle(item)}
                        </Button>
                        <span>{getSearchItemIcon(item)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
