import { fetchTmdb } from "./client";
import type { People, MediaResponse } from "./types";

export async function getPopularPeople(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<People>> {
  return fetchTmdb<MediaResponse<People>>(
    `/person/popular?language=${language}&page=${page}`,
  );
}

export async function getPersonById(
  id: string,
  language: string = "en-US",
): Promise<People> {
  return fetchTmdb<People>(
    `/person/${id}?language=${language}&append_to_response=combined_credits`,
  );
}
