import { MovieDetails, TvDetails } from "@/lib/tmdb/tmdbTypes";
import Cast from "@/components/single-media-page/subpage/cast-list";
import Crew from "@/components/single-media-page/subpage/crew-list";
import SubpageHeader from "./subpage-header";

export default async function FullCastCrew({
  data,
}: {
  data: MovieDetails | TvDetails;
}) {
  return (
    <div className="flex-1 bg-neutral-900/98 text-neutral-50">
      <SubpageHeader data={data} />
      <div className="flex space-x-50 px-15 py-5">
        <Cast data={data} />
        <Crew data={data} />
      </div>
    </div>
  );
}
