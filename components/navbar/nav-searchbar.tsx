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
import Link from "next/link";

export default function NavSearchBar() {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      className="flex w-full max-w-100 items-center gap-1"
      onSubmit={handleSearch}
    >
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
      <Button variant={"outline"} type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
}
