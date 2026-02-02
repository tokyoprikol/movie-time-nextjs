import { getPopularMovies } from "@/lib/tmdb/movies";

import MediaListPage from "@/components/media-list-page";
import InfiniteScroll from "@/components/infinite-scroll";

export default async function MoviesPopular() {
  const initialData = await getPopularMovies();

  console.log(initialData.results);

  return <InfiniteScroll title="Popular Movies" initialData={initialData} />;
  // return <MediaListPage title="Popular Movies" data={initialData} />;
}
