import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import SubpageFilterListItem from "./subpage-filter-list-item";

const VIDEO_CATEGORIES = [
  "Trailers",
  "Teaser",
  "Clips",
  "Behind the Scenes",
  "Bloopers",
  "Featurettes",
];

export default function VideosFilterCard({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="w-full max-w-xs">
      <div className="rounded-t-lg bg-neutral-900 px-7 py-4">
        <h1 className="text-xl font-semibold">Videos</h1>
      </div>
      <div className="flex flex-col overflow-hidden rounded-b-lg bg-neutral-800">
        {VIDEO_CATEGORIES.map((category) => (
          <SubpageFilterListItem key={category} title={category} data={data} />
        ))}
      </div>
    </div>
  );
}
