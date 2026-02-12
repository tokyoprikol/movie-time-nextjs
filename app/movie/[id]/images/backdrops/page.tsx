import Image from "next/image";
import { Params } from "@/lib/tmdb/tmdbTypes";
import { getMovieById } from "@/lib/tmdb/API/movies";
import SubpageFilterCard from "@/components/single-media-page/subpage/subpage-filter-card";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import { getPoster } from "@/lib/tmdb/getPoster";
import ImageDetails from "@/components/single-media-page/subpage/image-details";
import { Button } from "@/components/ui/button";

export default async function BackdropsPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getMovieById(mediaId);

  const IMAGE_CATEGORIES = [
    {
      category: "No Languages",
    },
    {
      category: "English",
    },
    {
      category: "Japanese",
    },
  ];

  const imageCounter = {
    no_language: 0,
    english: 0,
    japanese: 0,
  }

  data.images.backdrops.forEach(item => )

  console.log(data);
  return (
    <div className="flex-1">
      <SubpageHeader data={data} />
      <div className="flex items-start gap-10 px-15 py-10">
        <div className="w-full max-w-xs rounded-lg border shadow-lg">
              <div className="border-b px-6 py-3">
                <h1 className="text-xl font-semibold"></h1>
              </div>
                        <div className="space-y-3 py-5">
                          <div className="flex items-center justify-between px-6">
                <Button variant={"outline"} size={"sm"} className="w-full max-w-50">
                </Button>
                <span className="rounded-lg border px-3 py-1 dark:bg-neutral-900">
                  32
                </span>
              </div>
              </div>
            </div>
        <div className="grid grid-cols-3 gap-10">
          {data.images.backdrops.map((image) => (
            <div
              key={image.file_path}
              className="overflow-hidden rounded-lg border shadow-lg dark:bg-neutral-900/50"
            >
              <Image
                src={getPoster("w500", image.file_path)}
                alt="backdrop"
                width={400}
                height={100}
              />
              <ImageDetails image={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
