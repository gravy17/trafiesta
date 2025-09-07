"use client";

import Image from "next/image";
import React from "react";

import { Itinerary } from "./Itinerary";
import { useTravel } from "../context/TravelContext";
import { NoItinerary } from "./NoItinerary";

export function ActivitiesSection() {
  const { activities } = useTravel();

  // Figma CSS translated into inline styles for exact placement.
  const blueBoxStyle: React.CSSProperties = {
    position: "absolute",
    width: "1414px",
    height: "412px",
    left: "32px",
    top: "1585px",
    background: "#0054E4",
    borderRadius: "4px",
  };

  const innerWhiteStyle: React.CSSProperties = {
    position: "absolute",
    left: "24px",
    top: "86px",
    width: "1366px",
    height: "286px",
    background: "#FFFFFF",
    borderRadius: "4px",
  };

  return (
      <Itinerary title="Activities" iconPath="/RoadHorizon.svg" buttonTextColor="blue" buttonBgColor="white" backgroundColor="blue" primaryColor="white">
        <div className="h-full">
          {activities.length === 0 ? (
            <NoItinerary type="activity"/>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {activities.map((a) => (
                <div key={a.id} className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg border border-gray-100">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#F5F7FA] rounded-md">
                    {a.icon ? <Image src={a.icon} alt={a.label} width={20} height={20} /> : null}
                  </div>
                  <div className="text-xs text-gray-700">{a.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Itinerary>
  );
}

