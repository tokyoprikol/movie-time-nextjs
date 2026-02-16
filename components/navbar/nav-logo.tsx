import { Film } from "lucide-react";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-2">
        <Film className="size-6 sm:size-7 md:size-8 lg:size-9" />
        <span className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          MovieTime
        </span>
      </div>
    </Link>
  );
}
