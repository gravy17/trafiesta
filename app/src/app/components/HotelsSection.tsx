"use client";

import Image from "next/image";
import React from "react";
import { useTravel } from "../context/TravelContext";
import { Itinerary } from "./Itinerary";
import { NoItinerary } from "./NoItinerary";

function HotelImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  if (src.startsWith("http")) {
    // External RapidAPI image URLs — avoid next/image remote config friction in demos
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className="object-cover w-full h-full" />;
  }
  return <Image src={src} alt={alt} fill className="object-cover" />;
}

export function HotelsSection() {
  const { hotels, removeHotel } = useTravel();

  return (
    <Itinerary
      title="Hotels"
      iconPath="/Warehouse.svg"
      buttonTextColor="dark"
      buttonBgColor="white"
      backgroundColor="slate"
      primaryColor="white"
      category="hotels"
    >
      {hotels.length === 0 ? (
        <NoItinerary type="hotel" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hotels.map((h) => (
            <div
              key={h.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm"
            >
              <div className="w-full h-36 relative bg-gray-100">
                <HotelImage src={h.img} alt={h.name} />
              </div>
              <div className="p-3 flex items-start justify-between gap-2">
                <div>
                  <div className="font-medium text-gray-900">{h.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {h.price ? (
                      <>
                        From <span className="font-semibold text-gray-900">{h.price}</span>
                      </>
                    ) : null}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeHotel(h.id)}
                  className="text-sm text-white bg-red-500 px-3 py-1 rounded-md shrink-0"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Itinerary>
  );
}
