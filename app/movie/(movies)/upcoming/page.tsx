import InfiniteScroll from "@/components/infinite-scroll";
import { getUpcomingMovies } from "@/lib/tmdb/API/movies";

export default async function MoviesPopular() {
  const initialData = await getUpcomingMovies();

  console.log(initialData.results);

  return (
    <InfiniteScroll
      title="Upcoming Movies"
      initialData={initialData}
      mediaType="movie"
      category="upcoming"
    />
  );
}
