import "server-only";

import {
  ActivitySchema,
  FlightSchema,
  HotelSchema,
  type Activity,
  type DataSource,
  type Flight,
  type Hotel,
} from "./types";
import { mockActivities, mockFlights, mockHotels } from "./mocks";

const DEFAULT_HOST = "booking-com15.p.rapidapi.com";
const REQUEST_TIMEOUT_MS = 8_000;

export class RapidApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 502, code = "upstream_error") {
    super(message);
    this.name = "RapidApiError";
    this.status = status;
    this.code = code;
  }
}

function getConfig() {
  const key = process.env.RAPIDAPI_KEY?.trim() ?? "";
  const host = process.env.RAPIDAPI_HOST?.trim() || DEFAULT_HOST;
  return { key, host, hasKey: Boolean(key) };
}

type RapidFetchOptions = {
  path: string;
  searchParams?: Record<string, string>;
};

/**
 * Server-only RapidAPI fetch with API-key headers, timeout, and normalized errors.
 */
export async function fetchRapidApi<T = unknown>({
  path,
  searchParams,
}: RapidFetchOptions): Promise<T> {
  const { key, host, hasKey } = getConfig();
  if (!hasKey) {
    throw new RapidApiError(
      "RAPIDAPI_KEY is not configured",
      401,
      "missing_api_key"
    );
  }

  const url = new URL(path.startsWith("http") ? path : `https://${host}${path}`);
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (v) url.searchParams.set(k, v);
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": host,
        Accept: "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (res.status === 401 || res.status === 403) {
      throw new RapidApiError("RapidAPI rejected the API key", res.status, "unauthorized");
    }
    if (res.status === 429) {
      throw new RapidApiError("RapidAPI rate limit exceeded", 429, "rate_limited");
    }
    if (!res.ok) {
      throw new RapidApiError(
        `RapidAPI request failed (${res.status})`,
        res.status,
        "upstream_error"
      );
    }

    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof RapidApiError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new RapidApiError("RapidAPI request timed out", 504, "timeout");
    }
    throw new RapidApiError(
      err instanceof Error ? err.message : "RapidAPI request failed",
      502,
      "upstream_error"
    );
  } finally {
    clearTimeout(timer);
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const val = obj[key];
    if (typeof val === "string" && val.trim()) return val.trim();
    if (typeof val === "number") return String(val);
  }
  return undefined;
}

function extractList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const root = asRecord(payload);
  if (!root) return [];

  for (const key of ["data", "result", "results", "flights", "hotels", "activities", "attractions"]) {
    const candidate = root[key];
    if (Array.isArray(candidate)) return candidate;
    const nested = asRecord(candidate);
    if (nested) {
      for (const inner of ["flights", "hotels", "attractions", "results", "data"]) {
        if (Array.isArray(nested[inner])) return nested[inner] as unknown[];
      }
    }
  }
  return [];
}

function mapFlight(item: unknown, index: number, query: string): Flight | null {
  const obj = asRecord(item);
  if (!obj) return null;

  const origin = pickString(obj, ["origin", "departureAirport", "from", "source"]);
  const dest =
    pickString(obj, ["destination", "arrivalAirport", "to", "destinationAirport"]) || query;
  const route =
    pickString(obj, ["route", "title", "name", "flightName"]) ||
    (origin ? `${origin} → ${dest}` : `${query} flight ${index + 1}`);

  const parsed = FlightSchema.safeParse({
    id: pickString(obj, ["id", "flight_id", "flightId"]) || `rapid-flight-${index}`,
    route,
    time: pickString(obj, ["time", "departure_time", "departureTime", "duration"]),
    price: pickString(obj, ["price", "totalPrice", "fare", "amount"]),
    carrier: pickString(obj, ["carrier", "airline", "airlineLogo", "logo"]),
  });
  return parsed.success ? parsed.data : null;
}

function mapHotel(item: unknown, index: number, query: string): Hotel | null {
  const obj = asRecord(item);
  if (!obj) return null;

  const parsed = HotelSchema.safeParse({
    id: pickString(obj, ["id", "hotel_id", "hotelId"]) || `rapid-hotel-${index}`,
    name:
      pickString(obj, ["name", "hotel_name", "hotelName", "title"]) ||
      `${query} hotel ${index + 1}`,
    price: pickString(obj, ["price", "minPrice", "priceFrom", "amount", "rate"]),
    img: pickString(obj, ["img", "image", "photo", "thumbnail", "main_photo_url"]),
  });
  return parsed.success ? parsed.data : null;
}

function mapActivity(item: unknown, index: number, query: string): Activity | null {
  const obj = asRecord(item);
  if (!obj) return null;

  const parsed = ActivitySchema.safeParse({
    id: pickString(obj, ["id", "attraction_id", "activityId"]) || `rapid-activity-${index}`,
    label:
      pickString(obj, ["label", "name", "title", "attraction_name"]) ||
      `${query} activity ${index + 1}`,
    icon: pickString(obj, ["icon", "image", "photo", "thumbnail"]) || "/RoadHorizon.svg",
  });
  return parsed.success ? parsed.data : null;
}

export type SearchResult<T> = {
  source: DataSource;
  query: string;
  results: T[];
  warning?: string;
};

async function withMockFallback<T>(
  query: string,
  live: () => Promise<T[]>,
  mock: (q: string) => T[]
): Promise<SearchResult<T>> {
  const { hasKey } = getConfig();
  if (!hasKey) {
    return {
      source: "mock",
      query,
      results: mock(query),
      warning: "RAPIDAPI_KEY not set — serving demo fixtures",
    };
  }

  try {
    const results = await live();
    if (results.length === 0) {
      return {
        source: "mock",
        query,
        results: mock(query),
        warning: "Upstream returned no results — serving demo fixtures",
      };
    }
    return { source: "rapidapi", query, results };
  } catch (err) {
    const message =
      err instanceof RapidApiError ? err.message : "Upstream request failed";
    return {
      source: "mock",
      query,
      results: mock(query),
      warning: `${message} — serving demo fixtures`,
    };
  }
}

export async function searchFlights(query: string): Promise<SearchResult<Flight>> {
  const path =
    process.env.RAPIDAPI_FLIGHTS_PATH?.trim() ||
    "/api/v1/flights/searchFlights";

  return withMockFallback(
    query,
    async () => {
      const payload = await fetchRapidApi({
        path,
        searchParams: {
          query,
          fromId: "JFK.AIRPORT",
          toId: "NAS.AIRPORT",
          departDate: "2025-12-01",
        },
      });
      return extractList(payload)
        .map((item, i) => mapFlight(item, i, query))
        .filter((x): x is Flight => x !== null);
    },
    mockFlights
  );
}

export async function searchHotels(query: string): Promise<SearchResult<Hotel>> {
  const path =
    process.env.RAPIDAPI_HOTELS_PATH?.trim() || "/api/v1/hotels/searchHotels";

  return withMockFallback(
    query,
    async () => {
      const payload = await fetchRapidApi({
        path,
        searchParams: {
          dest_id: "-553173",
          search_type: "city",
          arrival_date: "2025-12-01",
          departure_date: "2025-12-07",
          query,
        },
      });
      return extractList(payload)
        .map((item, i) => mapHotel(item, i, query))
        .filter((x): x is Hotel => x !== null);
    },
    mockHotels
  );
}

export async function searchActivities(
  query: string
): Promise<SearchResult<Activity>> {
  const path =
    process.env.RAPIDAPI_ACTIVITIES_PATH?.trim() ||
    "/api/v1/attraction/searchAttractions";

  return withMockFallback(
    query,
    async () => {
      const payload = await fetchRapidApi({
        path,
        searchParams: {
          query,
          id: "eyJ1ZmkiOi05MDAwNDQ4NjN9",
        },
      });
      return extractList(payload)
        .map((item, i) => mapActivity(item, i, query))
        .filter((x): x is Activity => x !== null);
    },
    mockActivities
  );
}
