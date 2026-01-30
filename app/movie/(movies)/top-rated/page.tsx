import { getTopRatedMovies } from "@/lib/tmdb/movies";

import MediaListPage from "@/components/media-list-page";

export default async function MoviesPopular() {
  const { results: movies, page, total_pages } = await getTopRatedMovies();

  console.log(movies);
  return <MediaListPage title="Top Rated Movies" data={movies} />;
}
