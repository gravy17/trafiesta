"use client";
import Image from "next/image";
import React, { useState } from "react";
import ItineraryModal from "./ItineraryModal";
import ListingsModal from "./ListingsModal";

type AllowedColors = 'white' | 'blue' | 'slate' | 'skyblue';

const bgClasses: Record<AllowedColors, string> = {
  white: 'bg-white',
  blue: 'bg-blue-500',
  slate: 'bg-slate-950',
  skyblue: 'bg-indigo-50'
};

const textClasses: Record<AllowedColors, string> = {
  white: 'text-white',
  blue: 'text-blue-500',
  slate: 'text-slate-950',
  skyblue: 'text-indigo-50'
};

type AddToItineraryProps = {
  title: string;
  description: string;
  backgroundColor: AllowedColors; 
  primaryColor: AllowedColors; 
  buttonTextColor: AllowedColors; 
  buttonBgColor: AllowedColors;
};

export function AddToItinerary({
  title,
  description,
  backgroundColor = "slate",
  primaryColor = "white",
  buttonTextColor = "white",
  buttonBgColor = "blue"
}: AddToItineraryProps
) {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "hotels" | "flights" | "attraction" | null
  >(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  return (
    <section className={`max-w-72 h-fit rounded-xs p-4 text-sm ${bgClasses[backgroundColor]}`}>
      <div className="mb-6">
        <h2 className={`font-semibold text-base mb-2 ${textClasses[primaryColor]}`}>{title}</h2>
        <p className={`text-sm ${textClasses[primaryColor]} h-14`}>{description}</p>
      </div>
      <button onClick={() => {
          switch (title){
            case "Hotels":
              setSelectedType("hotels")
              break;
            case "Flights":
              setSelectedType("flights")
              break;
            case "Activities":
              setSelectedType("attraction")
              break;
            default:
              setSelectedType(null)
          }
          setFirstOpen(true);
        }} className={`w-full p-2 rounded-sm font-medium mt-4 ${textClasses[buttonTextColor]} ${bgClasses[buttonBgColor]}`}>
        Add {title}
      </button>

      <ItineraryModal
        isOpen={firstOpen}
        onClose={() => setFirstOpen(false)}
        searchType={selectedType!}
        onSelectLocation={(loc) => {
          setSelectedLocation(loc);
          setSecondOpen(true);
        }}
      />

      <ListingsModal
        isOpen={secondOpen}
        onClose={() => setSecondOpen(false)}
        searchType={selectedType!}
        location={selectedLocation}
      />
    </section>
  );
}
