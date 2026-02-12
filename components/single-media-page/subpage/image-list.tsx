"use client";

import Image from "next/image";
import ImageDetails from "./image-details";
import { Button } from "@/components/ui/button";
import { getPoster } from "@/lib/tmdb/getPoster";
import { useState } from "react";

export default function ImageList({
  backdrops,
  categoriesWithCounts,
}: {
  backdrops: any[];
  categoriesWithCounts: {
    category: string;
    iso_639_1: string | null;
    quantity: number;
  }[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex items-start gap-10 px-15 py-10">
      <div className="w-full max-w-xs rounded-lg border shadow-lg">
        <div className="border-b px-6 py-3">
          <h1 className="text-xl font-semibold">Backdrops</h1>
        </div>
        <div className="space-y-3 py-5">
          {categoriesWithCounts.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between px-6"
            >
              <Button
                variant={
                  selectedCategory === item.iso_639_1 ? "default" : "outline"
                }
                size={"sm"}
                className="w-full max-w-50"
                onClick={() => setSelectedCategory(item.iso_639_1)}
              >
                {item.category}
              </Button>
              <span className="rounded-lg border px-3 py-1 dark:bg-neutral-900">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {backdrops
          .filter((item) => item.iso_639_1 === selectedCategory)
          .map((image) => (
            <div
              key={image.file_path}
              className="overflow-hidden rounded-lg border shadow-lg dark:bg-neutral-900/50"
            >
              <Image
                src={getPoster("w500", image.file_path)}
                alt="backdrop"
                width={400}
                height={100}
              />
              <ImageDetails image={image} />
            </div>
          ))}
      </div>
    </div>
  );
}
