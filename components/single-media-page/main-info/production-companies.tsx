import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

export default function ProductionCompanies({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="space-y-1 lg:space-y-2">
      <h1 className="text-md font-bold lg:text-lg">
        {data.production_companies.length > 1
          ? "Production Companies"
          : "Production Companie"}
      </h1>
      <div className="space-x-5 text-sm lg:text-base">
        {data.production_companies.map((c) => (
          <span key={c.id} className="text-neutral-200 italic">
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}
