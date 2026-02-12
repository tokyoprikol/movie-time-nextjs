"use client";

import { Button } from "@/components/ui/button";
import { Videos } from "@/lib/tmdb/tmdbTypes";
import { useState } from "react";

export default function VideosList({
  categoriesWithCounts,
  data,
}: {
  categoriesWithCounts: any[];
  data: { videos: Videos };
}) {
  const [selectedType, setSelectedType] = useState<string>("Trailer");

  return (
    <div className="flex items-start gap-10 px-15 py-10">
      <div className="w-full max-w-xs rounded-lg border shadow-lg">
        <div className="border-b px-6 py-3">
          <h1 className="text-xl font-semibold">Videos</h1>
        </div>
        <div className="space-y-3 py-5">
          {categoriesWithCounts.map((category) => (
            <div
              key={category.category}
              className="flex items-center justify-between px-6"
            >
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-full max-w-50"
                onClick={() => setSelectedType(category.category_name)}
              >
                {category.category_name}
              </Button>
              <span className="rounded-lg border px-3 py-1 dark:bg-neutral-900">
                {category.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {data.videos.results
          .filter((video) => video.type === selectedType)
          .map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-lg shadow-lg dark:bg-neutral-900/50"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </div>
    </div>
  );
}
