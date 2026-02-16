import Image from "next/image";
import { Review } from "@/lib/tmdb/tmdbTypes";
import { getPoster } from "@/lib/tmdb/getPoster";
import ReviewContent from "./review-content";
import { CircleUserRound, Star } from "lucide-react";
import dayjs from "dayjs";

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="space-y-5 rounded-lg border p-6 shadow-lg dark:bg-neutral-900/50">
      <div className="flex items-center gap-5">
        {review.author_details.avatar_path ? (
          <div className="relative aspect-2/2 w-full max-w-15 min-w-15">
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
          <h1 className="text-sm font-semibold underline">
            A review by {review.author}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-400">
              Written by <span className="font-semibold">{review.author}</span>{" "}
              on{" "}
              <span className="font-semibold">
                {" "}
                {dayjs(review.created_at).format("MMMM D, YYYY")}
              </span>
            </div>
            {review.author_details.rating && (
              <div className="flex items-center gap-1 rounded-lg border-2 px-2">
                <Star size={15} />
                <span className="text-md font-bold">
                  {review.author_details.rating}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ReviewContent review={review} />
    </div>
  );
}
