import { Params } from "@/lib/tmdb/tmdbTypes";
import { getTvSeriesById } from "@/lib/tmdb/API/tv-series";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import {
  IMAGE_CATEGORIES,
  ImageCategory,
} from "@/lib/config/filter-categories";
import ImageList from "@/components/single-media-page/subpage/image-list";

export default async function PostersPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getTvSeriesById(mediaId);
  const posters = data.images.posters;

  console.log(posters);

  const categoriesCounts = IMAGE_CATEGORIES.reduce(
    (acc, { category }) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<ImageCategory, number>,
  );

  if (posters) {
    IMAGE_CATEGORIES.forEach(
      ({ category, iso_639_1 }) =>
        (categoriesCounts[category] = posters.filter(
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
        images={posters}
        categoriesWithCounts={categoriesWithCounts}
        type="Posters"
      />
    </div>
  );
}
