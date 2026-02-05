import InfiniteScroll from "@/components/infinite-scroll";
import InfiniteScrollTv from "@/components/infinite-scroll-tv";
import { getPopularTvSeries } from "@/lib/tmdb/API/tv-series";

export default async function MoviesPopular() {
  const initialData = await getPopularTvSeries();

  console.log(initialData.results);
  return (
    // <InfiniteScrollTv
    //   title="Popular TV Shows"
    //   initialData={initialData}
    //   category="popular"
    // />

    <InfiniteScroll
      title="Popular TV Shows"
      initialData={initialData}
      mediaType="tv"
      category="popular"
    />
  );
}
