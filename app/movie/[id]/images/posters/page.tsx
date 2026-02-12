import { Params } from "@/lib/tmdb/tmdbTypes";
import { getMovieById } from "@/lib/tmdb/API/movies";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import ImageList from "@/components/single-media-page/subpage/image-list";
import {
  IMAGE_CATEGORIES,
  ImageCategory,
} from "@/lib/config/filter-categories";

export default async function PostersPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getMovieById(mediaId);
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
    quantity: categoriesCounts[item.category] ?? 0,
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
