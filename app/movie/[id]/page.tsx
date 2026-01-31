import { getMovieById } from "@/lib/tmdb/movies";

import { Separator } from "@/components/ui/separator";
import Cast from "@/components/single-media-page/cast";
import AdditionalInfo from "@/components/single-media-page/additional-info";
import MainInfo from "@/components/single-media-page/main-info/main-info";
import { getPoster } from "@/lib/tmdb/getPoster";
import Image from "next/image";
import { Star, CircleUserRound } from "lucide-react";

import dayjs from "dayjs";
import ReviewContent from "@/components/single-media-page/main-info/review-content";

export default async function SingleMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);

  console.log(movie);

  return (
    <div className="flex-1 space-y-10 bg-neutral-900/98 text-white">
      <MainInfo movie={movie} />
      <div className="flex justify-between px-15">
        <div className="w-full">
          <Cast movie={movie} />
          <Separator className="my-10 bg-neutral-600 px-10" />
          <div className="space-y-5">
            <h1 className="text-3xl font-bold">Reviews</h1>
            <div className="space-y-12">
              {movie.reviews.results.map((review) => (
                <div
                  key={review.id}
                  className="space-y-5 rounded-2xl bg-neutral-900 p-6 shadow-xl"
                >
                  <div className="flex items-center gap-5">
                    {review.author_details.avatar_path ? (
                      <div className="relative aspect-2/2 w-full max-w-15">
                        <Image
                          src={getPoster(
                            "w185",
                            review.author_details.avatar_path,
                          )}
                          alt="profile"
                          fill
                          className="rounded-full object-top"
                        />
                      </div>
                    ) : (
                      <CircleUserRound size={60} />
                    )}

                    <div className="space-y-2">
                      <h1 className="text-xl font-semibold underline">
                        A review by {review.author}
                      </h1>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 rounded-lg border-2 px-2">
                          <Star fill="white" size={15} />
                          <span className="text-md font-bold">
                            {review.author_details.rating}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-400">
                          Written by{" "}
                          <span className="text-neutral-50">
                            {review.author}
                          </span>{" "}
                          on {dayjs(review.created_at).format("MMMM D, YYYY")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <ReviewContent review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs pl-10">
          <AdditionalInfo movie={movie} />
          <Separator className="my-10 bg-neutral-600" />
        </div>
      </div>
    </div>
  );
}
