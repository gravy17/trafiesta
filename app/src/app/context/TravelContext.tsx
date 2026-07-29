"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  startTransition,
} from "react";
import {
  searchActivitiesApi,
  searchFlightsApi,
  searchHotelsApi,
} from "@/lib/api-client";
import type { Activity, Flight, Hotel, SearchCategory } from "@/lib/types";

export type { Activity, Flight, Hotel, SearchCategory };

type SearchState = {
  category: SearchCategory | null;
  query: string;
  loading: boolean;
  error: string | null;
  warning: string | null;
  source: "rapidapi" | "mock" | null;
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
};

type TravelContextType = {
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  addFlight: (f: Omit<Flight, "id"> & { id?: string }) => void;
  removeFlight: (id: string) => void;
  addHotel: (h: Omit<Hotel, "id"> & { id?: string }) => void;
  removeHotel: (id: string) => void;
  addActivity: (a: Omit<Activity, "id"> & { id?: string }) => void;
  removeActivity: (id: string) => void;
  search: SearchState;
  runSearch: (category: SearchCategory, query?: string) => Promise<void>;
  clearSearch: () => void;
  openSearch: (category: SearchCategory, query?: string) => void;
};

const emptySearch = (): SearchState => ({
  category: null,
  query: "",
  loading: false,
  error: null,
  warning: null,
  source: null,
  flights: [],
  hotels: [],
  activities: [],
});

const TravelContext = createContext<TravelContextType | undefined>(undefined);

function withId<T extends { id?: string }>(
  item: T,
  prefix: string
): T & { id: string } {
  return {
    ...item,
    id: item.id ?? `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  };
}

export function TravelProvider({ children }: { children: React.ReactNode }) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [search, setSearch] = useState<SearchState>(emptySearch);

  const addFlight = useCallback((f: Omit<Flight, "id"> & { id?: string }) => {
    const item = withId(f, "flight");
    setFlights((s) => (s.some((x) => x.id === item.id) ? s : [...s, item]));
  }, []);

  const removeFlight = useCallback((id: string) => {
    setFlights((s) => s.filter((x) => x.id !== id));
  }, []);

  const addHotel = useCallback((h: Omit<Hotel, "id"> & { id?: string }) => {
    const item = withId(h, "hotel");
    setHotels((s) => (s.some((x) => x.id === item.id) ? s : [...s, item]));
  }, []);

  const removeHotel = useCallback((id: string) => {
    setHotels((s) => s.filter((x) => x.id !== id));
  }, []);

  const addActivity = useCallback((a: Omit<Activity, "id"> & { id?: string }) => {
    const item = withId(a, "activity");
    setActivities((s) => (s.some((x) => x.id === item.id) ? s : [...s, item]));
  }, []);

  const removeActivity = useCallback((id: string) => {
    setActivities((s) => s.filter((x) => x.id !== id));
  }, []);

  const clearSearch = useCallback(() => {
    setSearch(emptySearch());
  }, []);

  const openSearch = useCallback((category: SearchCategory, query = "Bahamas") => {
    setSearch((prev) => ({
      ...emptySearch(),
      category,
      query: query || prev.query || "Bahamas",
    }));
  }, []);

  const runSearch = useCallback(async (category: SearchCategory, query = "Bahamas") => {
    const q = query.trim() || "Bahamas";
    setSearch({
      category,
      query: q,
      loading: true,
      error: null,
      warning: null,
      source: null,
      flights: [],
      hotels: [],
      activities: [],
    });

    try {
      if (category === "flights") {
        const data = await searchFlightsApi(q);
        startTransition(() => {
          setSearch({
            category,
            query: q,
            loading: false,
            error: null,
            warning: data.warning ?? null,
            source: data.source,
            flights: data.results,
            hotels: [],
            activities: [],
          });
        });
      } else if (category === "hotels") {
        const data = await searchHotelsApi(q);
        startTransition(() => {
          setSearch({
            category,
            query: q,
            loading: false,
            error: null,
            warning: data.warning ?? null,
            source: data.source,
            flights: [],
            hotels: data.results,
            activities: [],
          });
        });
      } else {
        const data = await searchActivitiesApi(q);
        startTransition(() => {
          setSearch({
            category,
            query: q,
            loading: false,
            error: null,
            warning: data.warning ?? null,
            source: data.source,
            flights: [],
            hotels: [],
            activities: data.results,
          });
        });
      }
    } catch (err) {
      setSearch({
        category,
        query: q,
        loading: false,
        error: err instanceof Error ? err.message : "Search failed",
        warning: null,
        source: null,
        flights: [],
        hotels: [],
        activities: [],
      });
    }
  }, []);

export const TravelProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TravelContext.Provider
      value={{
        flights,
        hotels,
        activities,
        addFlight,
        removeFlight,
        addHotel,
        removeHotel,
        addActivity,
        removeActivity,
        search,
        runSearch,
        clearSearch,
        openSearch,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => useContext(TravelContext);
