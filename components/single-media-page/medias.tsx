"use client";

import Image from "next/image";
import { useState } from "react";

import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { getPoster } from "@/lib/tmdb/getPoster";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";

export default function Medias({ data }: { data: MovieDetails | TvDetails }) {
  const [selectedTab, setSelectedTab] = useState("videos");

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-30">
          <h1 className="text-3xl font-bold">Media</h1>
          <div className="flex items-center gap-7">
            <Button
              variant={"secondary"}
              onClick={() => setSelectedTab("videos")}
              className={`hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100 ${
                selectedTab === "videos"
                  ? "border border-neutral-700 bg-neutral-800 text-neutral-100"
                  : "border hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100"
              }`}
            >
              Videos
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => setSelectedTab("backdrops")}
              className={`hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100 ${
                selectedTab === "backdrops"
                  ? "border border-neutral-700 bg-neutral-800 text-neutral-100"
                  : "border hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100"
              }`}
            >
              Backdrops
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => setSelectedTab("posters")}
              className={`hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100 ${
                selectedTab === "posters"
                  ? "border border-neutral-700 bg-neutral-800 text-neutral-100"
                  : "border hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100"
              }`}
            >
              Posters
            </Button>
          </div>
        </div>

        <Button variant={"secondary"}>
          View All {selectedTab === "videos" && "Videos"}
          {selectedTab === "backdrops" && "Backdrops"}
          {selectedTab === "posters" && "Posters"}
        </Button>
      </div>
      <ScrollArea>
        <div className="mb-3 flex flex-nowrap justify-center gap-2">
          {selectedTab === "videos" &&
            data.videos.results
              ?.filter(
                (item) =>
                  item.site === "YouTube" && ["Trailer"].includes(item.type),
              )
              .slice(0, 10)
              .map((item) => (
                <div
                  key={item.id}
                  className="aspect-video min-h-70 min-w-100 overflow-hidden rounded-lg"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title={item.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
          {selectedTab === "backdrops" &&
            data.images.backdrops.slice(0, 8).map((i) => (
              <div key={i.file_path} className="relative aspect-video min-h-70">
                <Image
                  src={getPoster("w500", i.file_path)}
                  alt="image"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 50vw"
                  className="rounded-lg"
                />
              </div>
            ))}

          {selectedTab === "posters" &&
            data.images.posters.slice(0, 8).map((i) => (
              <div key={i.file_path} className="relative aspect-2/3 min-h-70">
                <Image
                  src={getPoster("w500", i.file_path)}
                  alt="image"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  className="rounded-lg"
                />
              </div>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
