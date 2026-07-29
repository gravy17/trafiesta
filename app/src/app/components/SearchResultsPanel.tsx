"use client";

import Image from "next/image";
import React from "react";
import { useTravel } from "../context/TravelContext";
import type { Activity, Flight, Hotel, SearchCategory } from "@/lib/types";

function categoryLabel(category: SearchCategory) {
  switch (category) {
    case "flights":
      return "Flights";
    case "hotels":
      return "Hotels";
    case "activities":
      return "Activities";
  }
}

export function SearchResultsPanel() {
  const {
    search,
    addFlight,
    addHotel,
    addActivity,
    clearSearch,
    runSearch,
    flights,
    hotels,
    activities,
  } = useTravel();

  if (!search.category) return null;

  const title = categoryLabel(search.category);

  return (
    <section
      className="w-full max-w-[1156px] mx-auto mb-6 rounded-xs border border-blue-100 bg-white p-4 shadow-sm"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Search results · {title}
        </h3>
        {search.source ? (
          <span className="text-xs uppercase tracking-wide px-2 py-1 rounded bg-gray-100 text-gray-600">
            {search.source}
          </span>
        ) : null}
        <button
          type="button"
          onClick={clearSearch}
          className="ml-auto text-sm text-gray-500 hover:text-gray-800"
        >
          Close
        </button>
      </div>

      <form
        className="flex flex-col sm:flex-row gap-2 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const q = String(form.get("q") || "");
          void runSearch(search.category!, q);
        }}
      >
        <input
          name="q"
          defaultValue={search.query}
          aria-label={`Search ${title}`}
          className="flex-1 rounded-xs border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          placeholder={`Search ${title.toLowerCase()}…`}
        />
        <button
          type="submit"
          disabled={search.loading}
          className="px-4 py-2 rounded-xs bg-blue-600 text-white text-sm font-medium disabled:opacity-60"
        >
          {search.loading ? "Searching…" : "Search"}
        </button>
      </form>

      {search.warning ? (
        <p className="mb-3 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded px-3 py-2">
          {search.warning}
        </p>
      ) : null}

      {search.error ? (
        <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-100 rounded px-3 py-2 flex flex-wrap items-center gap-3">
          <span>{search.error}</span>
          <button
            type="button"
            className="underline font-medium"
            onClick={() => void runSearch(search.category!, search.query)}
          >
            Retry
          </button>
        </div>
      ) : null}

      {search.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3" aria-busy="true">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-lg bg-gray-100 animate-pulse border border-gray-100"
            />
          ))}
        </div>
      ) : null}

      {!search.loading && !search.error && search.category === "flights" ? (
        <FlightResults
          items={search.flights}
          selectedIds={new Set(flights.map((f) => f.id))}
          onAdd={addFlight}
        />
      ) : null}

      {!search.loading && !search.error && search.category === "hotels" ? (
        <HotelResults
          items={search.hotels}
          selectedIds={new Set(hotels.map((h) => h.id))}
          onAdd={addHotel}
        />
      ) : null}

      {!search.loading && !search.error && search.category === "activities" ? (
        <ActivityResults
          items={search.activities}
          selectedIds={new Set(activities.map((a) => a.id))}
          onAdd={addActivity}
        />
      ) : null}
    </section>
  );
}

function FlightResults({
  items,
  selectedIds,
  onAdd,
}: {
  items: Flight[];
  selectedIds: Set<string>;
  onAdd: (f: Flight) => void;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">No flights found.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {items.map((f) => {
        const added = selectedIds.has(f.id);
        return (
          <div
            key={f.id}
            className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 truncate">{f.route}</div>
              <div className="text-lg font-bold text-gray-900">
                {f.time}{" "}
                {f.price ? (
                  <span className="text-blue-600">• {f.price}</span>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              disabled={added}
              onClick={() => onAdd(f)}
              className="text-sm text-white bg-blue-600 px-4 py-1 rounded-md disabled:bg-gray-300"
            >
              {added ? "Added" : "Add"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function HotelResults({
  items,
  selectedIds,
  onAdd,
}: {
  items: Hotel[];
  selectedIds: Set<string>;
  onAdd: (h: Hotel) => void;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">No hotels found.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((h) => {
        const added = selectedIds.has(h.id);
        return (
          <div
            key={h.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-100"
          >
            <div className="w-full h-28 relative bg-gray-100">
              {h.img ? (
                <Image src={h.img} alt={h.name} fill className="object-cover" />
              ) : null}
            </div>
            <div className="p-3 flex items-start justify-between gap-2">
              <div>
                <div className="font-medium text-gray-900">{h.name}</div>
                {h.price ? (
                  <div className="text-sm text-gray-600 mt-1">{h.price}</div>
                ) : null}
              </div>
              <button
                type="button"
                disabled={added}
                onClick={() => onAdd(h)}
                className="text-sm text-white bg-blue-600 px-3 py-1 rounded-md disabled:bg-gray-300 shrink-0"
              >
                {added ? "Added" : "Add"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActivityResults({
  items,
  selectedIds,
  onAdd,
}: {
  items: Activity[];
  selectedIds: Set<string>;
  onAdd: (a: Activity) => void;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">No activities found.</p>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((a) => {
        const added = selectedIds.has(a.id);
        return (
          <div
            key={a.id}
            className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg border border-gray-100"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[#F5F7FA] rounded-md">
              {a.icon ? (
                <Image src={a.icon} alt={a.label} width={20} height={20} />
              ) : null}
            </div>
            <div className="text-xs text-gray-700 text-center">{a.label}</div>
            <button
              type="button"
              disabled={added}
              onClick={() => onAdd(a)}
              className="text-xs text-white bg-blue-600 px-3 py-1 rounded-md disabled:bg-gray-300"
            >
              {added ? "Added" : "Add"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
