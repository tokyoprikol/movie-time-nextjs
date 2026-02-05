import { getPopularPeople } from "@/lib/tmdb/API/people";

import InfiniteScroll from "@/components/infinite-scroll";

export default async function Page() {
  const initialData = await getPopularPeople();
  console.log(initialData.results);

  return (
    <InfiniteScroll
      title="Popular People"
      initialData={initialData}
      mediaType="people"
      category="popular"
    />
  );
}
