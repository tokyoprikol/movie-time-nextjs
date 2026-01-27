import { fetchTmdb } from "./client";
import type { People, MediaResponse } from "./types";

export async function getPopularPeople(
  language: string = "en-US",
  page: number = 1,
): Promise<MediaResponse<People>> {
  return fetchTmdb<MediaResponse<People>>(
    `/person/popular?language=${language}&page=${page}`,
  );
}

export async function getPersonById(
  language: string = "en-US",
  id: string,
): Promise<People> {
  return fetchTmdb<People>(`/person/${id}?language=${language}`);
}
