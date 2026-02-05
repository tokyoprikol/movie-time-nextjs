import { getTopRatedMovies } from "@/lib/tmdb/API/movies";

import InfiniteScroll from "@/components/infinite-scroll";

export default async function MoviesPopular() {
  const initialData = await getTopRatedMovies();

  console.log(initialData.results);

  return (
    <InfiniteScroll
      title="Top Rated Movies"
      initialData={initialData}
      mediaType="movie"
      category="top-rated"
    />
  );
}
