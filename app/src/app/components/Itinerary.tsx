"use client";

import Image from "next/image";
import React from "react";

type ItineraryProps = {
  title: string;
  iconPath: string;
  backgroundColor: string; 
  primaryColor: string; 
  buttonTextColor: string; 
  children: React.ReactNode;
};

export function Itinerary({
  title,
  iconPath,
  backgroundColor,
  primaryColor,
  buttonTextColor,
  children,
}: ItineraryProps) {
  return (
    <section
      className={`w-full max-w-[1156px] mx-auto mb-8 rounded-sm overflow-hidden bg-${backgroundColor}`}
    >
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderColor: 'var(--itinerary-primary)' }}
      >
        <Image src={iconPath} alt={title + ' icon'} width={36} height={36} />
        <h2 className={`text-xl font-bold text-${primaryColor}`}>{title}</h2>
        <button
          aria-label={`Add ${title}`}
          className="ml-auto px-4 py-2 rounded font-medium"
          style={{ background: 'var(--itinerary-primary)', color: 'var(--itinerary-btn-text)' }}
        >
          Add {title}
        </button>
      </div>
      <div className="p-6 bg-[var(--itinerary-bg)]">{children}</div>
    </section>
  );
}
