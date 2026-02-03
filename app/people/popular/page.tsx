import { getPopularPeople } from "@/lib/tmdb/people";

import InfiniteScrollPeople from "@/components/infinite-scroll-people";

export default async function Page() {
  const initialData = await getPopularPeople();
  console.log(initialData.results);

  return (
    <InfiniteScrollPeople
      title="Popular People"
      initialData={initialData}
      category="popular"
    />
  );
}
