import Link from "next/link";

import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { getMediaTitle } from "@/lib/tmdb/media-details";
import { slugify } from "@/lib/utils/slugify";
import ReviewItem from "./review-item";

export default function Reviews({ data }: { data: MovieDetails | TvDetails }) {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Reviews</h1>
      <div className="space-y-12">
        {data.reviews.results.slice(0, 3).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
      <div>
        <Link
          href={`${data.id}-${slugify(getMediaTitle(data))}/reviews`}
          className="border-b text-lg font-semibold hover:text-neutral-400"
        >
          Read All Reviews
        </Link>
      </div>
    </div>
  );
}
