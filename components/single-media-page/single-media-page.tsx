import { Movie, TvSeries } from "@/lib/tmdb/types";
import AdditionalInfo from "./additional-info";
import MainInfo from "./main-info/main-info";
import Medias from "./medias";
import Reviews from "./reviews";
import { Separator } from "../ui/separator";
import Cast from "./cast";

export default function SingleMediaPage({ data }: { data: Movie | TvSeries }) {
  return (
    <div className="flex-1 space-y-10 bg-neutral-900/98 pb-20 text-white">
      <MainInfo data={data} />
      <div className="flex justify-between px-15">
        <div className="w-full max-w-6xl">
          <Cast data={data} />

          <Separator className="my-10 bg-neutral-600 px-10" />

          <Reviews data={data} />

          <Separator className="my-10 bg-neutral-600 px-10" />

          <Medias data={data} />
        </div>

        <div className="w-xs pl-10">
          <AdditionalInfo data={data} />
          <Separator className="my-10 bg-neutral-600" />
        </div>
      </div>
    </div>
  );
}
