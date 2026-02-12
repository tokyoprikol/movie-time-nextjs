import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex-1">
      <div className="space-y-10">
        <Skeleton className="mb h-10 w-80 rounded-lg" />

        <div className="grid grid-cols-5 gap-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="cursor-pointer overflow-hidden rounded-lg border shadow-lg dark:bg-neutral-900/50"
            >
              <Skeleton className="aspect-2/3 w-full rounded-b-none" />

              <div className="space-y-2 p-3">
                <Skeleton className="h-5 rounded" />
                <Skeleton className="h-4 w-1/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
