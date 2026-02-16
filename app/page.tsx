import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-10 px-7 text-center sm:px-10 md:px-15">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          Welcome to MovieTime
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
          Discover millions of movies, TV shows, and people. Explore what's
          popular, trending, and highly rated.
        </p>
        <Button>
          <Link href={"/sign-up"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
