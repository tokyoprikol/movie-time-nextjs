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
import Link from "next/link";
import Reviews from "@/components/single-media-page/main-info/reviews";

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
          <Reviews movie={movie} />
          <Separator className="my-10 bg-neutral-600 px-10" />
        </div>

        <div className="w-full max-w-xs pl-10">
          <AdditionalInfo movie={movie} />
          <Separator className="my-10 bg-neutral-600" />
        </div>
      </div>
    </div>
  );
}
