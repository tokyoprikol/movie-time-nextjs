import { Movie } from "@/lib/tmdb/types";
import DataField from "./data-field";
import { currencyFormatter } from "@/lib/utils/currency-formatter";
import { Button } from "../ui/button";
import { LANGUAGES } from "@/lib/config/language-dict";

export default function AdditionalInfo({ movie }: { movie: Movie }) {
  return (
    <div className="space-y-10">
      <DataField title="Status" data={movie.status} />
      <DataField
        title="Original Language"
        data={LANGUAGES[movie.original_language as keyof typeof LANGUAGES]}
      />

      {movie.budget !== 0 && (
        <DataField
          title="Budget"
          data={currencyFormatter.format(movie.budget ?? 0)}
        />
      )}

      {movie.revenue !== 0 && (
        <DataField
          title="Revenue"
          data={currencyFormatter.format(movie.revenue ?? 0)}
        />
      )}

      {movie.keywords.keywords.length !== 0 && (
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Keywords</h1>
          <div className="flex flex-wrap gap-2">
            {movie.keywords.keywords.map((k) => (
              <Button
                key={k.id}
                className="border border-neutral-700 bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-950"
              >
                {k.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
