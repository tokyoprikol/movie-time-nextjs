import { ImageFile } from "@/lib/tmdb/tmdbTypes";
export default function ImageDetails({ image }: { image: ImageFile }) {
  return (
    <div className="space-y-3 p-5">
      <div>
        <h5 className="text-sm text-neutral-400">Size</h5>
        <span className="font-semibold">
          {image.width}x{image.height}
        </span>
      </div>
      <div>
        <h5 className="text-sm text-neutral-400">Language</h5>
        <span className="font-semibold">
          {image.iso_639_1 || image.iso_3166_1
            ? `${image.iso_639_1}-${image.iso_3166_1}`
            : "No specified"}
        </span>
      </div>
    </div>
  );
}
