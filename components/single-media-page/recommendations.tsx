import { getPoster } from "@/lib/tmdb/getPoster";
import { getMediaTitle } from "@/lib/tmdb/media-details";
import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function Recommendations({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Recommendations</h1>
      <ScrollArea>
        <div className="mb-8 flex flex-nowrap gap-9">
          {data.recommendations.results.length > 0 ? (
            data.recommendations.results.slice(0, 10).map((item) => (
              <div className="space-y-3">
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
                <h1 className="text-center">{getMediaTitle(item)}</h1>
              </div>
            ))
          ) : (
            <h1>
              We don't have enough data to suggest any movies based on{" "}
              <span className="font-semibold">{getMediaTitle(data)}</span>. You
              can help by rating movies you've seen.
            </h1>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
