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
    <div className="w-full max-w-xs">
      <div className="rounded-t-lg bg-neutral-900 px-7 py-4">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex flex-col overflow-hidden rounded-b-lg bg-neutral-800">
        <SubpageFilterListItem title="No Languages" data={data} />
        <SubpageFilterListItem title="English" data={data} />
        <SubpageFilterListItem title="Japanese" data={data} />
      </div>
    </div>
  );
}
