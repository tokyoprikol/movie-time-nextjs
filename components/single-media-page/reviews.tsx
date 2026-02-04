import Image from "next/image";
import Link from "next/link";

import ReviewContent from "./review-content";

import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { getPoster } from "@/lib/tmdb/getPoster";
import { CircleUserRound, Star } from "lucide-react";

import dayjs from "dayjs";

export default function Reviews({ data }: { data: MovieDetails | TvDetails }) {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Reviews</h1>
      <div className="space-y-12">
        {data.reviews.results.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="space-y-5 rounded-2xl bg-neutral-900 p-6 shadow-xl"
          >
            <div className="flex items-center gap-5">
              {review.author_details.avatar_path ? (
                <div className="relative aspect-2/2 w-full max-w-15">
                  <Image
                    src={getPoster("w185", review.author_details.avatar_path)}
                    alt="profile"
                    fill
                    sizes="60px"
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
                  {review.author_details.rating && (
                    <div className="flex items-center gap-1 rounded-lg border-2 px-2">
                      <Star fill="white" size={15} />
                      <span className="text-md font-bold">
                        {review.author_details.rating}
                      </span>
                    </div>
                  )}

                  <div className="text-sm text-neutral-400">
                    Written by{" "}
                    <span className="text-neutral-50">{review.author}</span> on{" "}
                    {dayjs(review.created_at).format("MMMM D, YYYY")}
                  </div>
                </div>
              </div>
            </div>

            <ReviewContent review={review} />
          </div>
        ))}
      </div>
      <div>
        <Link
          href=""
          className="border-b text-lg font-semibold hover:border-b-neutral-300 hover:text-neutral-300"
        >
          Read All Reviews
        </Link>
      </div>
    </div>
  );
}
