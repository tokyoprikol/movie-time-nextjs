import FullCastCrew from "@/components/single-media-page/subpage/full-cast-crew";
import { getMovieById } from "@/lib/tmdb/API/movies";
import { Params } from "@/lib/tmdb/tmdbTypes";

export default async function FullCastAndCrew({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getMovieById(mediaId);
  console.log(data);

  return <FullCastCrew data={data} />;
}
