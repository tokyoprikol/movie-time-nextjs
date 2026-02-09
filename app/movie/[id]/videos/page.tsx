import Image from "next/image";
import { Params } from "@/lib/tmdb/tmdbTypes";
import { getMovieById } from "@/lib/tmdb/API/movies";
import SubpageFilterCard from "@/components/single-media-page/subpage/subpage-filter-card";
import SubpageHeader from "@/components/single-media-page/subpage/subpage-header";
import VideosFilterCard from "@/components/single-media-page/subpage/videos-filter-card";

export default async function VideosPage({ params }: Params) {
  const { id } = await params;
  const mediaId = id.split("-")[0];

  const data = await getMovieById(mediaId);

  console.log(data);
  return (
    <div className="flex-1">
      <SubpageHeader data={data} />
      <div className="flex gap-10 px-15 py-10">
        <VideosFilterCard data={data} />
        <div className="grid grid-cols-4 gap-10">
          {data.videos.results
            .filter((video) => video.official === true)
            .slice(0, 6)
            .map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-lg border shadow-lg"
              >
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
