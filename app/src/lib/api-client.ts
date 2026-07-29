import type { Activity, Flight, Hotel, SearchCategory } from "./types";

export type SearchResponse<T> = {
  source: "rapidapi" | "mock";
  query: string;
  results: T[];
  warning?: string;
};

async function searchApi<T>(
  category: SearchCategory,
  query: string
): Promise<SearchResponse<T>> {
  const params = new URLSearchParams({ q: query || "Bahamas" });
  const res = await fetch(`/api/${category}?${params.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      typeof body?.error === "string" ? body.error : `Search failed (${res.status})`;
    throw new Error(message);
  }

  return body as SearchResponse<T>;
}

export function searchFlightsApi(query: string) {
  return searchApi<Flight>("flights", query);
}

export function searchHotelsApi(query: string) {
  return searchApi<Hotel>("hotels", query);
}

export function searchActivitiesApi(query: string) {
  return searchApi<Activity>("activities", query);
}
