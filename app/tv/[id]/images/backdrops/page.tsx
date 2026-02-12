import { Params } from "@/lib/tmdb/tmdbTypes";
import { getTvSeriesById } from "@/lib/tmdb/API/tv-series";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import ImageList from "@/components/single-media-page/subpage/image-list";
import {
  IMAGE_CATEGORIES,
  ImageCategory,
} from "@/lib/config/filter-categories";

export default async function BackdropsPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getTvSeriesById(mediaId);
  const backdrops = data.images.backdrops;
  console.log(data);

  const categoriesCounts = IMAGE_CATEGORIES.reduce(
    (acc, { category }) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<ImageCategory, number>,
  );

  if (backdrops) {
    IMAGE_CATEGORIES.forEach(
      ({ category, iso_639_1 }) =>
        (categoriesCounts[category] = backdrops.filter(
          (item) => item.iso_639_1 === iso_639_1,
        ).length),
    );
  }

  const categoriesWithCounts = IMAGE_CATEGORIES.map((item) => ({
    ...item,
    quantity: categoriesCounts[item.category],
  }));

  return (
    <div className="flex-1">
      <SubpageHeader data={data} />
      <ImageList
        images={backdrops}
        categoriesWithCounts={categoriesWithCounts}
        type="Backdrops"
      />
    </div>
  );
}
