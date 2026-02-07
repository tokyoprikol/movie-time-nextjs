import ReviewItem from "@/components/single-media-page/review-item";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import { getMovieById } from "@/lib/tmdb/API/movies";
import { Params } from "@/lib/tmdb/tmdbTypes";

export default async function FullMovieReviewsList({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getMovieById(mediaId);
  console.log(data);

  return (
    <div className="flex-1 bg-neutral-900/98 text-neutral-50">
      <SubpageHeader data={data} />
      <div className="space-y-10 px-15 py-10">
        {data.reviews.results.map((item) => (
          <ReviewItem key={item.id} review={item} />
        ))}
      </div>
    </div>
  );
}
