import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import MainInfo from "./main-info/main-info";
import Cast from "./cast";
import Reviews from "./reviews";
import Medias from "./medias";
import AdditionalInfo from "./additional-info";

import { Separator } from "../ui/separator";
import Recommendations from "./recommendations";
import DataField from "./data-field";
import { LANGUAGES } from "@/lib/config/language-dict";
import { currencyFormatter } from "@/lib/utils/currency-formatter";
import { Button } from "../ui/button";

export default function SingleMediaPage({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  const isMovie = "budget" in data;
  const keywords = isMovie ? data.keywords.keywords : data.keywords.results;

  return (
    <div className="flex-1 space-y-10">
      <MainInfo data={data} />
      <div className="flex justify-between px-7 md:px-10 lg:px-15">
        <div className="w-full max-w-6xl">
          <Cast data={data} />

          <Separator className="my-10 px-10" />

          <Reviews data={data} />

          <Separator className="my-10 px-10" />

          <Medias data={data} />

          <Separator className="my-10 px-10" />

          <Recommendations data={data} />

          <Separator className="my-5 block px-10 sm:hidden" />

          <div className="mb-10 block space-y-5 sm:hidden">
            <div className="grid grid-cols-2 gap-2">
              <DataField title="Status" data={data.status} />
              {"type" in data && <DataField title="Type" data={data.type} />}

              <DataField
                title="Original Language"
                data={
                  LANGUAGES[data.original_language as keyof typeof LANGUAGES]
                }
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
            </div>
            <Separator className="my-4 px-10" />
            <div className="space-y-2">
              <h1 className="text-sm font-semibold">Keywords</h1>
              <div className="flex flex-wrap gap-2">
                {keywords?.map((word) => (
                  <Button size="xs" variant={"secondary"} key={word.id}>
                    {word.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden w-xs pl-10">
          <AdditionalInfo data={data} />
          <Separator className="my-10" />
        </div>
      </div>
    </div>
  );
}
