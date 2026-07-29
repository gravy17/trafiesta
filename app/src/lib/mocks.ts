import type { Activity, Flight, Hotel } from "./types";

/** Demo fixtures used when RAPIDAPI_KEY is missing or upstream fails. */
export function mockFlights(query: string): Flight[] {
  const q = query.trim() || "Bahamas";
  return [
    {
      id: "mock-flight-1",
      route: `JFK → ${q}`,
      time: "08:15 – 12:40",
      price: "$289",
      carrier: "/AirplaneInFlight.svg",
    },
    {
      id: "mock-flight-2",
      route: `MIA → ${q}`,
      time: "14:20 – 16:55",
      price: "$199",
      carrier: "/AirplaneInFlight.svg",
    },
    {
      id: "mock-flight-3",
      route: `ATL → ${q}`,
      time: "06:45 – 10:10",
      price: "$245",
      carrier: "/AirplaneInFlight.svg",
    },
  ];
}

export function mockHotels(query: string): Hotel[] {
  const q = query.trim() || "Bahamas";
  return [
    {
      id: "mock-hotel-1",
      name: `${q} Beach Resort`,
      price: "$180 / night",
      img: "/banner.png",
    },
    {
      id: "mock-hotel-2",
      name: `Harbor Inn ${q}`,
      price: "$120 / night",
      img: "/banner.png",
    },
    {
      id: "mock-hotel-3",
      name: `${q} Boutique Suites`,
      price: "$210 / night",
      img: "/banner.png",
    },
  ];
}

export function mockActivities(query: string): Activity[] {
  const q = query.trim() || "Bahamas";
  return [
    {
      id: "mock-activity-1",
      label: `${q} snorkeling`,
      icon: "/RoadHorizon.svg",
    },
    {
      id: "mock-activity-2",
      label: "Island tour",
      icon: "/RoadHorizon.svg",
    },
    {
      id: "mock-activity-3",
      label: "Sunset cruise",
      icon: "/RoadHorizon.svg",
    },
    {
      id: "mock-activity-4",
      label: "Local market",
      icon: "/RoadHorizon.svg",
    },
  ];
}
