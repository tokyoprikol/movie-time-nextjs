import { getPoster } from "@/lib/tmdb/getPoster";
import { getMediaTitle, getMediaType } from "@/lib/tmdb/media-details";
import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { slugify } from "@/lib/utils/slugify";

export default function Recommendations({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="space-y-5">
      <h1 className="text-lg font-bold sm:text-xl lg:text-2xl xl:text-3xl">
        Recommendations
      </h1>
      <ScrollArea>
        <div className="mb-4 flex flex-nowrap gap-9">
          {data.recommendations.results.length > 0 ? (
            data.recommendations.results.slice(0, 10).map((item) => (
              <div key={item.id}>
                <Link
                  className="space-y-3"
                  href={`/${getMediaType(
                    item,
                  )}/${item.id}-${slugify(getMediaTitle(item))}`}
                >
                  <div className="relative aspect-2/3 h-60 overflow-hidden rounded-lg shadow-lg">
                    {item.poster_path ? (
                      <Image
                        src={getPoster("w500", item.poster_path)}
                        alt="poster"
                        fill
                        className="border object-top"
                      />
                    ) : (
                      <ImageOff />
                    )}
                  </div>
                  <h1 className="cursor-pointer text-center hover:underline">
                    {getMediaTitle(item)}
                  </h1>
                </Link>
              </div>
            ))
          ) : (
            <h1>
              We don't have enough data to suggest any movies based on{" "}
              <span className="font-semibold">{getMediaTitle(data)}</span>.
            </h1>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
