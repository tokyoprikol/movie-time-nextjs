import { getTvSeriesById } from "@/lib/tmdb/tv-series";
import { Params } from "@/lib/tmdb/tmdbTypes";

import SingleMediaPage from "@/components/single-media-page/single-media-page";

export default async function SingleMoviePage({ params }: Params) {
  const { id } = await params;
  const tvseries = await getTvSeriesById(id);

  console.log(tvseries);

  return <SingleMediaPage data={tvseries} />;
}
