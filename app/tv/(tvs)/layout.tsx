import Sidebar from "@/components/sidebar/sidebar";
import { getAllTvSeriesGenres } from "@/lib/tmdb/API/tv-series";
import React from "react";

export default async function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { genres } = await getAllTvSeriesGenres();
  return (
    <div className="flex flex-1 justify-between space-x-10 px-15 py-15">
      <Sidebar genres={genres} />
      {children}
    </div>
  );
}
