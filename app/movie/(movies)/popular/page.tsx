import { getPopularMovies } from "@/lib/tmdb/API/movies";

import InfiniteScroll from "@/components/infinite-scroll";

export default async function MoviesPopular() {
  const initialData = await getPopularMovies();

  console.log(initialData.results);

  return (
    <InfiniteScroll
      title="Popular Movies"
      initialData={initialData}
      mediaType="movie"
      category="popular"
    />
  );
}
