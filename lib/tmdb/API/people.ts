import { fetchTmdb } from "./client";
import type {
  MediaResponse,
  PersonListItem,
  PersonDetails,
} from "../tmdbTypes";

export async function getPopularPeople(
  page: number = 1,
  language: string = "en-US",
): Promise<MediaResponse<PersonListItem[]>> {
  return fetchTmdb<MediaResponse<PersonListItem[]>>(
    `/person/popular?language=${language}&page=${page}`,
  );
}

export async function getPersonById(
  id: string,
  language: string = "en-US",
): Promise<PersonDetails> {
  return fetchTmdb<PersonDetails>(
    `/person/${id}?language=${language}&append_to_response=combined_credits`,
  );
}
