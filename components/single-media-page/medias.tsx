"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { getPoster } from "@/lib/tmdb/getPoster";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { slugify } from "@/lib/utils/slugify";
import { getMediaTitle } from "@/lib/tmdb/media-details";

export default function Medias({ data }: { data: MovieDetails | TvDetails }) {
  const [selectedTab, setSelectedTab] = useState("videos");

  const isImages = selectedTab === "backdrops" || selectedTab === "posters";
  const idAndSlugUrl = `${data.id}-${slugify(getMediaTitle(data))}`;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-30">
          <h1 className="text-3xl font-bold">Media</h1>
          <div className="flex items-center gap-7">
            <Button
              variant={selectedTab === "videos" ? "secondary" : "ghost"}
              onClick={() => setSelectedTab("videos")}
            >
              Videos
            </Button>
            <Button
              variant={selectedTab === "backdrops" ? "secondary" : "ghost"}
              onClick={() => setSelectedTab("backdrops")}
            >
              Backdrops
            </Button>
            <Button
              variant={selectedTab === "posters" ? "secondary" : "ghost"}
              onClick={() => setSelectedTab("posters")}
            >
              Posters
            </Button>
          </div>
        </div>

        <Button variant={"outline"}>
          <Link
            href={`${idAndSlugUrl}/${isImages ? `images/${selectedTab}` : "videos/"}`}
          >
            View all {selectedTab}
          </Link>
        </Button>
      </div>
      <ScrollArea>
        <div className="mb-3 flex flex-nowrap justify-center gap-3">
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
                  className="aspect-video min-h-70 overflow-hidden rounded-lg"
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
                  src={getPoster("w780", i.file_path)}
                  alt="image"
                  fill
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
