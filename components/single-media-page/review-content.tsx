"use client";

import { useState } from "react";
import { Review } from "@/lib/tmdb/tmdbTypes";
import { Button } from "@/components/ui/button";

export default function ReviewContent({ review }: { review: Review }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div
        className={`line-clamp-3 overflow-hidden text-sm sm:text-base ${isOpen ? "line-clamp-none" : "line-clamp-3"}`}
      >
        {review.content}
      </div>
      <div className="flex justify-end">
        <Button
          size={"xs"}
          variant={"secondary"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "close" : "read more"}
        </Button>
      </div>
    </div>
  );
}
