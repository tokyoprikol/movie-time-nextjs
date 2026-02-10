import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";

import MainInfo from "./main-info/main-info";
import Cast from "./cast";
import Reviews from "./reviews";
import Medias from "./medias";
import AdditionalInfo from "./additional-info";

import { Separator } from "../ui/separator";
import Recommendations from "./recommendations";

export default function SingleMediaPage({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="flex-1 space-y-10 pb-20">
      <MainInfo data={data} />
      <div className="flex justify-between px-15">
        <div className="w-full max-w-6xl">
          <Cast data={data} />

          <Separator className="my-10 px-10" />

          <Reviews data={data} />

          <Separator className="my-10 px-10" />

          <Medias data={data} />

          <Separator className="my-10 px-10" />

          <Recommendations data={data} />
        </div>

        <div className="w-xs pl-10">
          <AdditionalInfo data={data} />
          <Separator className="my-10" />
        </div>
      </div>
    </div>
  );
}
