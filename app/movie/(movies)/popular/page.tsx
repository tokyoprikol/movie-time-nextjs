import { getPopularMovies } from "@/lib/tmdb/movies";

import MediaListPage from "@/components/media-list-page";
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
  // return <MediaListPage title="Popular Movies" data={initialData} />;
}
