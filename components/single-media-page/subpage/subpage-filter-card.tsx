import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import SubpageFilterListItem from "./subpage-filter-list-item";

export default function SubpageFilterCard({
  title,
  data,
}: {
  title: string;
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="w-full max-w-xs rounded-lg border shadow-lg">
      <div className="border-b px-6 py-3">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="space-y-3 py-5">
        <SubpageFilterListItem title="No Languages" data={data} />
        <SubpageFilterListItem title="English" data={data} />
        <SubpageFilterListItem title="Japanese" data={data} />
      </div>
    </div>
  );
}
