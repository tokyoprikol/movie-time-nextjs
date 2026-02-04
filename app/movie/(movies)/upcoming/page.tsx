import InfiniteScrollMovie from "@/components/infinite-scroll-movie";
import { getUpcomingMovies } from "@/lib/tmdb/API/movies";

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
}
