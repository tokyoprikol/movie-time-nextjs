import { getTvSeriesById } from "@/lib/tmdb/API/tv-series";
import { Params } from "@/lib/tmdb/tmdbTypes";
import FullCastCrew from "@/components/single-media-page/subpage/full-cast-crew";

export default async function FullCastAndCrew({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getTvSeriesById(mediaId);
  console.log(data);

  return <FullCastCrew data={data} />;
}
