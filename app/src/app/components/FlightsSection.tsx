"use client";

import Image from "next/image";
import React from "react";
import { useTravel } from "../context/TravelContext";

export function FlightsSection() {
  const { flights } = useTravel();

  return (
    <section className="w-full max-w-[1156px] mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold">Flights</h2>
        <a className="text-sm text-blue-600">See all flights</a>
      </div>

      {flights.length === 0 ? (
        <div className="w-full h-44 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-lg font-medium">No flights yet</div>
            <div className="text-sm">Add flights to see them here</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {flights.map((f) => (
            <div key={f.id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-600 truncate">{f.route}</div>
                <div className="text-lg font-bold text-gray-900">{f.time} <span className="text-blue-600">• {f.price}</span></div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button className="text-sm text-white bg-blue-600 px-4 py-1 rounded-md">Select</button>
                <div className="w-9 h-9 flex items-center justify-center bg-[#F5F7FA] rounded-md">
                  {f.carrier ? <Image src={f.carrier} alt="carrier" width={24} height={24} /> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
