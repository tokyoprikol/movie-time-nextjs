import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function Page() {
  return (
    <div className="flex-1 bg-neutral-900/98 text-white">
      <div className="mt-20 space-y-10 text-center">
        <h1 className="text-6xl font-bold">Welcome to MovieTime</h1>
        <p className="text-2xl text-neutral-300">
          Discover millions of movies, TV shows, and people. Explore what's
          popular, trending, and highly rated.
        </p>
        <Button className="border border-neutral-800 bg-neutral-900 px-10 py-8 text-xl">
          <Link href={"/sign-up"}>Get Started</Link>
        </Button>
      </div>
      <div>
        {/* <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>
              <div>
                <TrendingUp size={60} />
              </div>
            </CardTitle>
            <CardDescription className="text-xl">
              Trending Content
            </CardDescription>
          </CardHeader>
          <CardContent>
            Stay up to date with the latest trending movies and TV shows.
            Discover what everyone is watching right now.
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
