"use client";

import React from "react";
import { useTravel, type SearchCategory } from "../context/TravelContext";

type AllowedColors = "white" | "blue" | "slate" | "skyblue";

const bgClasses: Record<AllowedColors, string> = {
  white: "bg-white",
  blue: "bg-blue-500",
  slate: "bg-slate-950",
  skyblue: "bg-indigo-50",
};

const textClasses: Record<AllowedColors, string> = {
  white: "text-white",
  blue: "text-blue-500",
  slate: "text-slate-950",
  skyblue: "text-indigo-50",
};

type AddToItineraryProps = {
  title: string;
  description: string;
  backgroundColor: AllowedColors;
  primaryColor: AllowedColors;
  buttonTextColor: AllowedColors;
  buttonBgColor: AllowedColors;
  category: SearchCategory;
};

export function AddToItinerary({
  title,
  description,
  backgroundColor = "slate",
  primaryColor = "white",
  buttonTextColor = "white",
  buttonBgColor = "blue",
  category,
}: AddToItineraryProps) {
  const { runSearch, search } = useTravel();

  return (
    <section
      className={`max-w-72 h-fit rounded-xs p-4 text-sm ${bgClasses[backgroundColor]}`}
    >
      <div className="mb-6">
        <h2 className={`font-semibold text-base mb-2 ${textClasses[primaryColor]}`}>
          {title}
        </h2>
        <p className={`text-sm ${textClasses[primaryColor]} h-14`}>{description}</p>
      </div>
      <button
        type="button"
        disabled={search.loading && search.category === category}
        onClick={() => void runSearch(category, search.query || "Bahamas")}
        className={`w-full p-2 rounded-sm font-medium mt-4 ${textClasses[buttonTextColor]} ${bgClasses[buttonBgColor]} disabled:opacity-60`}
      >
        Add {title}
      </button>
    </section>
  );
}
