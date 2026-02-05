import { getNowPlayingMovies } from "@/lib/tmdb/API/movies";

import InfiniteScroll from "@/components/infinite-scroll";

export default async function MoviesPopular() {
  const initialData = await getNowPlayingMovies();

  console.log(initialData.results);

  return (
    <InfiniteScroll
      title="Now Playing Movies"
      initialData={initialData}
      mediaType="movie"
      category="now-playing"
    />
  );
}
