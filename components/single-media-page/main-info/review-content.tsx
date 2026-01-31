"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Review {
  author: string;
  author_details: {
    avatar_path: string;
    name: string;
    rating: number;
    username: string;
  };
  content: string;
  created_at: string;
  id: number;
}

export default function ReviewContent({ review }: { review: Review }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div
        className={`line-clamp-3 overflow-hidden ${isOpen ? "line-clamp-none" : "line-clamp-3"}`}
      >
        {review.content}
      </div>
      <div className="flex justify-end">
        <Button
          size={"xs"}
          className="bg-neutral-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "close" : "read more"}
        </Button>
      </div>
    </div>
  );
}
