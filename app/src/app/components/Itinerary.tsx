"use client";

import Image from "next/image";
import React from "react";

type AllowedColors = 'white' | 'blue' | 'dark' | 'lightgray' | 'slate';

const bgClasses: Record<AllowedColors, string> = {
  white: 'bg-white',
  blue: 'bg-blue-700',
  dark: 'bg-gray-800',
  lightgray: 'bg-gray-100',
  slate: 'bg-slate-700'
};

const textClasses: Record<AllowedColors, string> = {
  white: 'text-white',
  blue: 'text-blue-700',
  dark: 'text-gray-800',
  lightgray: 'text-gray-100',
  slate: 'text-slate-700'
};

type ItineraryProps = {
  title: string;
  iconPath: string;
  backgroundColor: AllowedColors; 
  primaryColor: AllowedColors; 
  buttonTextColor: AllowedColors; 
  buttonBgColor: AllowedColors;
  children: React.ReactNode;
};

export function Itinerary({
  title,
  iconPath,
  backgroundColor,
  primaryColor,
  buttonTextColor,
  buttonBgColor,
  children,
}: ItineraryProps) {
  return (
    <section
      className={`w-full mx-auto rounded-xs overflow-hidden ${bgClasses[backgroundColor]}`}
    >
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderColor: 'var(--itinerary-primary)' }}
      >
        <Image src={iconPath} alt={title + ' icon'} width={24} height={24} />
        <h2 className={`text-xl font-bold ${textClasses[primaryColor]}`}>{title}</h2>
        <button
          aria-label={`Add ${title}`}
          className={`ml-auto px-4 py-2 rounded-xs font-semibold text-sm ${textClasses[buttonTextColor]} ${bgClasses[buttonBgColor]}`}
        >
          Add {title}
        </button>
      </div>
      <div className="p-6 bg-[var(--itinerary-bg)]">{children}</div>
    </section>
  );
}
