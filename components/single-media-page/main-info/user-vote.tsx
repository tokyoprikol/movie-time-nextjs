import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

export default function UserVote({ data }: { data: MovieDetails | TvDetails }) {
  return (
    <div className="flex items-center gap-3 max-[375px]:hidden">
      <p
        className={`rounded-lg border-4 px-2 text-lg font-bold text-neutral-200 md:text-xl lg:text-2xl xl:text-3xl ${
          data.vote_average > 6
            ? "border-green-500 bg-green-950"
            : data.vote_average > 4
              ? "border-yellow-500 bg-yellow-950"
              : "border-red-500 bg-red-950"
        }`}
      >
        {data.vote_average.toFixed(1)}
      </p>
    </div>
  );
}
