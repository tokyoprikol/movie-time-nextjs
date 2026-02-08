import Image from "next/image";
import { Params } from "@/lib/tmdb/tmdbTypes";
import { getTvSeriesById } from "@/lib/tmdb/API/tv-series";
import SubpageFilterCard from "@/components/single-media-page/subpage/subpage-filter-card";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import { getPoster } from "@/lib/tmdb/getPoster";
import ImageDetails from "@/components/single-media-page/subpage/image-details";

export default async function BackdropsPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getTvSeriesById(mediaId);

  console.log(data);
  return (
    <div className="flex-1 bg-neutral-900/98 text-neutral-50">
      <SubpageHeader data={data} />
      <div className="flex gap-10 px-15 py-10">
        <SubpageFilterCard title="Backdrops" data={data} />
        <div className="grid grid-cols-3 gap-10">
          {data.images.backdrops.map((image) => (
            <div
              key={image.file_path}
              className="overflow-hidden rounded-lg bg-neutral-900 shadow-xl"
            >
              <Image
                src={getPoster("w500", image.file_path)}
                alt="backdrop"
                width={400}
                height={100}
                className=""
              />
              <ImageDetails image={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
