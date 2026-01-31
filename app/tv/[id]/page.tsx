import { getTvSeriesById } from "@/lib/tmdb/tv-series";

import SingleMediaPage from "@/components/single-media-page/single-media-page";

export default async function SingleMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tvseries = await getTvSeriesById(id);

  console.log(tvseries);

  return <SingleMediaPage data={tvseries} />;
}
