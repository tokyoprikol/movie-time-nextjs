import { fetchTmdb } from "./client";
import type { People } from "./types";

export async function getPopularPeople(language = "en-US", page = 1) {
  return fetchTmdb<{ results: People[] }>(
    `/person/popular?language=${language}&page=${page}`,
  );
}

export async function getPersonById(language = "en-US", id: string) {
  return fetchTmdb<{ results: People[] }>(`/person/${id}?language=${language}`);
}
