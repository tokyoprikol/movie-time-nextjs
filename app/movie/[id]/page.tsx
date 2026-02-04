import { getMovieById } from "@/lib/tmdb/API/movies";
import { Params } from "@/lib/tmdb/tmdbTypes";

import SingleMediaPage from "@/components/single-media-page/single-media-page";

export default async function SingleMoviePage({ params }: Params) {
  const { id } = await params;
  const movie = await getMovieById(id);

  console.log(movie);

  return <SingleMediaPage data={movie} />;
}
