import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import SubpageFilterListItem from "./subpage-filter-list-item";

export default function VideosFilterCard({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="w-full max-w-xs rounded-lg border shadow-lg">
      <div className="border-b px-6 py-3">
        <h1 className="text-xl font-semibold">Videos</h1>
      </div>
      <div className="space-y-3 py-5">
        {VIDEO_CATEGORIES.map((category) => (
          <SubpageFilterListItem key={category} title={category} data={data} />
        ))}
      </div>
    </div>
  );
}
