import MediaListPage from "@/components/media-list-page";
import { getUpcomingMovies } from "@/lib/tmdb/movies";

export default async function MoviesPopular() {
  const { results: movies, page, total_pages } = await getUpcomingMovies();

  console.log(movies);
  return <MediaListPage title="Upcoming Movies" data={movies} />;
}
