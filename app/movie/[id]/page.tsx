import { getMovieById } from "@/lib/tmdb/movies";

import SingleMediaPage from "@/components/single-media-page/single-media-page";

export default async function SingleMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);

  console.log(movie);

  return <SingleMediaPage data={movie} />;
}
