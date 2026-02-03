import InfiniteScrollMovie from "@/components/infinite-scroll";
import MediaListPage from "@/components/media-list-page";
import { getUpcomingMovies } from "@/lib/tmdb/movies";

export default async function MoviesPopular() {
  const initialData = await getUpcomingMovies();

  console.log(initialData.results);

  return (
    <InfiniteScrollMovie
      title="Upcoming Movies"
      initialData={initialData}
      category="upcoming"
    />
  );
  // return <MediaListPage title="Upcoming Movies" data={movies} />;
}
