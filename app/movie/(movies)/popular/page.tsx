import { getPopularMovies } from "@/lib/tmdb/API/movies";

import InfiniteScrollMovie from "@/components/infinite-scroll-movie";

export default async function MoviesPopular() {
  const initialData = await getPopularMovies();

  console.log(initialData.results);

  return (
    <InfiniteScrollMovie
      title="Popular Movies"
      initialData={initialData}
      category="popular"
    />
  );
}
