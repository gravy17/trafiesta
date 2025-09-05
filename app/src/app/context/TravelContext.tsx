"use client";

import React, { createContext, useContext, useState } from "react";

export type Flight = {
  id: string;
  route: string;
  time?: string;
  price?: string;
  carrier?: string;
};

export type Hotel = {
  id: string;
  name: string;
  price?: string;
  img?: string;
};

export type Activity = {
  id: string;
  label: string;
  icon?: string;
};

type TravelContextType = {
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  addFlight: (f: Omit<Flight, "id">) => void;
  removeFlight: (id: string) => void;
  addHotel: (h: Omit<Hotel, "id">) => void;
  removeHotel: (id: string) => void;
  addActivity: (a: Omit<Activity, "id">) => void;
  removeActivity: (id: string) => void;
};

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export function TravelProvider({ children }: { children: React.ReactNode }) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  function addFlight(f: Omit<Flight, "id">) {
    setFlights((s) => [...s, { ...f, id: Date.now().toString() }]);
  }

  function removeFlight(id: string) {
    setFlights((s) => s.filter((x) => x.id !== id));
  }

  function addHotel(h: Omit<Hotel, "id">) {
    setHotels((s) => [...s, { ...h, id: Date.now().toString() }]);
  }

  function removeHotel(id: string) {
    setHotels((s) => s.filter((x) => x.id !== id));
  }

  function addActivity(a: Omit<Activity, "id">) {
    setActivities((s) => [...s, { ...a, id: Date.now().toString() }]);
  }

  function removeActivity(id: string) {
    setActivities((s) => s.filter((x) => x.id !== id));
  }

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
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const ctx = useContext(TravelContext);
  if (!ctx) throw new Error("useTravel must be used within TravelProvider");
  return ctx;
}

export default TravelContext;
