import { Button } from "@/components/ui/button";
import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

export default function SubpageFilterListItem({
  title,
  data,
}: {
  title: string;
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="flex items-center justify-between px-6">
      <Button variant={"outline"} size={"sm"} className="w-full max-w-50">
        {title}
      </Button>
      <span className="rounded-lg border px-3 py-1 dark:bg-neutral-900">
        32
      </span>
    </div>
  );
}
