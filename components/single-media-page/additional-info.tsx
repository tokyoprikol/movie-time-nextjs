import { Movie, TvSeries } from "@/lib/tmdb/types";
import DataField from "./data-field";
import { currencyFormatter } from "@/lib/utils/currency-formatter";
import { Button } from "../ui/button";
import { LANGUAGES } from "@/lib/config/language-dict";

export default function AdditionalInfo({ data }: { data: Movie | TvSeries }) {
  function getDataKeywords(data: Movie | TvSeries) {
    if ("results" in data.keywords) return data.keywords.results;
    if ("keywords" in data.keywords) return data.keywords.keywords;
  }

  const keywords = getDataKeywords(data);

  return (
    <div className="space-y-10">
      <DataField title="Status" data={data.status} />
      <DataField
        title="Original Language"
        data={LANGUAGES[data.original_language as keyof typeof LANGUAGES]}
      />

      {"budget" in data && data.budget && (
        <DataField
          title="Budget"
          data={currencyFormatter.format(data.budget ?? 0)}
        />
      )}

      {"revenue" in data && data.revenue && (
        <DataField
          title="Revenue"
          data={currencyFormatter.format(data.revenue ?? 0)}
        />
      )}

      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Keywords</h1>
        <div className="flex flex-wrap gap-2">
          {keywords?.map((k) => (
            <Button
              key={k.id}
              className="border border-neutral-700 bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-950"
            >
              {k.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
