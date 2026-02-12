import { Params } from "@/lib/tmdb/tmdbTypes";
import { getMovieById } from "@/lib/tmdb/API/movies";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import ImageList from "@/components/single-media-page/subpage/image-list";

type ImageCategory = (typeof IMAGE_CATEGORIES)[number]["category"];

const IMAGE_CATEGORIES = [
  { category: "No Languages", iso_639_1: null },
  { category: "English", iso_639_1: "en" },
  { category: "Japanese", iso_639_1: "ja" },
  { category: "Russian", iso_639_1: "ru" },
] as const;

export default async function BackdropsPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getMovieById(mediaId);
  const backdrops = data.images.backdrops;
  console.log(backdrops);

  const categoriesCounts = IMAGE_CATEGORIES.reduce(
    (acc, { category }) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<ImageCategory, number>,
  );

  if (backdrops) {
    IMAGE_CATEGORIES.forEach(({ category, iso_639_1 }) => {
      categoriesCounts[category] = backdrops.filter(
        (item) => item.iso_639_1 === iso_639_1,
      ).length;
    });
  }

  const categoriesWithCounts = IMAGE_CATEGORIES.map((item) => ({
    ...item,
    quantity: categoriesCounts[item.category] ?? 0,
  }));

  return (
    <div className="flex-1">
      <SubpageHeader data={data} />
      <ImageList
        backdrops={backdrops}
        categoriesWithCounts={categoriesWithCounts}
      />
    </div>
  );
}
