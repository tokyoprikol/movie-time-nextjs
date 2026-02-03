import { getTopRatedMovies } from "@/lib/tmdb/movies";

import MediaListPage from "@/components/media-list-page";
import InfiniteScrollMovie from "@/components/infinite-scroll";

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
  // return <MediaListPage title="Top Rated Movies" data={movies} />;
}
