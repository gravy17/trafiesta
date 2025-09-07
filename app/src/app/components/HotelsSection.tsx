"use client";

import Image from "next/image";
import React from "react";
import { useTravel } from "../context/TravelContext";
import { Itinerary } from "./Itinerary";
import { NoItinerary } from "./NoItinerary";

export function HotelsSection() {
  const { hotels } = useTravel();

  return (
    <Itinerary title="Hotels" iconPath="/Warehouse.svg" buttonTextColor="dark" buttonBgColor="white" backgroundColor="slate" primaryColor="white">
      {hotels.length === 0 ? (
        <NoItinerary type="hotel" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hotels.map((h) => (
            <div key={h.id} className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <div className="w-full h-36 relative">
                {h.img ? <Image src={h.img} alt={h.name} fill className="object-cover" /> : null}
              </div>
              <div className="p-3">
                <div className="font-medium text-gray-900">{h.name}</div>
                <div className="text-sm text-gray-600 mt-1">From <span className="font-semibold text-gray-900">{h.price}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Itinerary>
  );
}
