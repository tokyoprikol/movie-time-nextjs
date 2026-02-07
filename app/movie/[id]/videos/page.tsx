import Image from "next/image";
import { Params } from "@/lib/tmdb/tmdbTypes";
import { getMovieById } from "@/lib/tmdb/API/movies";
import SubpageFilterCard from "@/components/single-media-page/subpage/subpage-filter-card";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import { getPoster } from "@/lib/tmdb/getPoster";
import ImageDetails from "@/components/single-media-page/subpage/image-details";

export default async function VideosPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getMovieById(mediaId);

  console.log(data);
  return (
    <div className="flex-1 bg-neutral-900/98 text-neutral-50">
      <SubpageHeader data={data} />
      <div className="flex gap-10 px-15 py-10">
        <SubpageFilterCard title="Posters" data={data} />
        <div className="grid grid-cols-4 gap-10">
          {data.videos.results.slice(0, 3).map((video) => (
            <div key={video.id} className="rounded-lg bg-neutral-900 shadow-xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
