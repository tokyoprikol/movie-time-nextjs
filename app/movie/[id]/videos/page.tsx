import { Params } from "@/lib/tmdb/tmdbTypes";
import { getMovieById } from "@/lib/tmdb/API/movies";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import VideosList from "@/components/single-media-page/subpage/videos-list";
import {
  VIDEO_CATEGORIES,
  VideosCategory,
} from "@/lib/config/filter-categories";

export default async function VideosPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getMovieById(mediaId);
  const videos = data.videos.results;
  console.log(videos);

  const categoriesCounts = VIDEO_CATEGORIES.reduce(
    (acc, { category }) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<VideosCategory, number>,
  );

  if (videos) {
    VIDEO_CATEGORIES.forEach(
      ({ category, category_name }) =>
        (categoriesCounts[category] = videos.filter(
          (item) => item.type === category_name,
        ).length),
    );
  }

  const categoriesWithCounts = VIDEO_CATEGORIES.map((item) => ({
    ...item,
    quantity: categoriesCounts[item.category],
  }));

  return (
    <div className="flex-1">
      <SubpageHeader data={data} />
      <VideosList categoriesWithCounts={categoriesWithCounts} data={data} />
    </div>
  );
}
