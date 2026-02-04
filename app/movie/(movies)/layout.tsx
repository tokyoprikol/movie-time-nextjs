import Sidebar from "@/components/sidebar";
import { getAllMovieGenres } from "@/lib/tmdb/API/movies";
import React from "react";

export default async function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { genres } = await getAllMovieGenres();
  return (
    <div className="flex flex-1 justify-between space-x-10 bg-neutral-900/98 px-15 py-15 text-white">
      <Sidebar genres={genres} />
      {children}
    </div>
  );
}
