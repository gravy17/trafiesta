"use client";

import Image from "next/image";
import React from "react";
import { useTravel } from "../context/TravelContext";
import { Itinerary } from "./Itinerary";
import { NoItinerary } from "./NoItinerary";

export function FlightsSection() {
  const { flights, removeFlight } = useTravel();

  return (
    <Itinerary
      title="Flights"
      iconPath="/AirplaneInFlight.svg"
      buttonTextColor="blue"
      buttonBgColor="white"
      backgroundColor="lightgray"
      primaryColor="dark"
      category="flights"
    >
      {flights.length === 0 ? (
        <NoItinerary type="flight" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {flights.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
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
              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => removeFlight(f.id)}
                  className="text-sm text-white bg-red-500 px-4 py-1 rounded-md"
                >
                  Remove
                </button>
                <div className="w-9 h-9 flex items-center justify-center bg-[#F5F7FA] rounded-md">
                  {f.carrier ? (
                    <Image src={f.carrier} alt="carrier" width={24} height={24} />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Itinerary>
  );
}
