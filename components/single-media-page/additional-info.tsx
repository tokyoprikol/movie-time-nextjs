import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import { currencyFormatter } from "@/lib/utils/currency-formatter";
import { LANGUAGES } from "@/lib/config/language-dict";

import { Button } from "../ui/button";
import DataField from "./data-field";

export default function AdditionalInfo({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  const isMovie = data.media_type === "movie";
  const keywords = isMovie ? data.keywords.keywords : data.keywords.results;

  return (
    <div className="space-y-10">
      <DataField title="Status" data={data.status} />
      <DataField
        title="Original Language"
        data={LANGUAGES[data.original_language as keyof typeof LANGUAGES]}
      />

      {isMovie && data.budget && (
        <DataField
          title="Budget"
          data={currencyFormatter.format(data.budget)}
        />
      )}

      {isMovie && data.revenue && (
        <DataField
          title="Revenue"
          data={currencyFormatter.format(data.revenue)}
        />
      )}

      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Keywords</h1>
        <div className="flex flex-wrap gap-2">
          {keywords?.map((word) => (
            <Button
              key={word.id}
              className="border border-neutral-700 bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-950"
            >
              {word.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
