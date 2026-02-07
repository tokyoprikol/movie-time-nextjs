import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

export default function SubpageFilterListItem({
  title,
  data,
}: {
  title: string;
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="flex cursor-pointer justify-between border-b-2 border-neutral-700 px-5 py-4 hover:bg-neutral-700">
      <h1>{title}</h1>
      <span className="rounded border border-neutral-700 bg-neutral-900/50 px-2">
        32
      </span>
    </div>
  );
}
