"use client";

import Image from "next/image";
import React from "react";
import { useTravel } from "../context/TravelContext";

export function HotelsSection() {
  const { hotels } = useTravel();

  return (
    <section className="w-full max-w-[1156px] mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold">Hotels</h2>
        <a className="text-sm text-blue-600">View all hotels</a>
      </div>

      {hotels.length === 0 ? (
        <div className="w-full h-44 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-lg font-medium">No hotels yet</div>
            <div className="text-sm">Add hotels to see them here</div>
          </div>
        </div>
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
    </section>
  );
}
