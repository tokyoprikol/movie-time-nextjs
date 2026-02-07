import Image from "next/image";
import Link from "next/link";

import ReviewContent from "./review-content";

import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { getPoster } from "@/lib/tmdb/getPoster";
import { CircleUserRound, Star } from "lucide-react";

import dayjs from "dayjs";
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
          className="border-b text-lg font-semibold hover:border-b-neutral-300 hover:text-neutral-300"
        >
          Read All Reviews
        </Link>
      </div>
    </div>
  );
}
