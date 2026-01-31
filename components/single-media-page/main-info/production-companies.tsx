import { Movie, TvSeries } from "@/lib/tmdb/types";

export default function ProductionCompanies({
  data,
}: {
  data: Movie | TvSeries;
}) {
  return (
    <div className="space-y-2">
      <h1 className="text-lg font-bold">
        {(data.production_companies?.length ?? 0) > 1
          ? "Production Companies"
          : "Production Companie"}
      </h1>
      <div className="space-x-5">
        {data.production_companies?.map((c) => (
          <span key={c.name} className="text-neutral-300 italic">
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}
