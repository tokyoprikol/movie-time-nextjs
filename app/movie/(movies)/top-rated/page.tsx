import { getTopRatedMovies } from "@/lib/tmdb/API/movies";

import InfiniteScrollMovie from "@/components/infinite-scroll-movie";

export default async function MoviesPopular() {
  const initialData = await getTopRatedMovies();

  console.log(initialData.results);

  return (
    <InfiniteScrollMovie
      title="Top Rated Movies"
      initialData={initialData}
      category="top-rated"
    />
  );
}
