import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-1 bg-neutral-100 dark:bg-neutral-900">
      <div className="mt-20 space-y-10 text-center">
        <h1 className="text-6xl font-bold">Welcome to MovieTime</h1>
        <p className="text-2xl">
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
