import Image from "next/image";
import React from "react";

export function TripSummary() {
  return (
    <section className="w-full max-w-[1412px] max-h-[200px] ml-auto mr-4 mb-2 pt-4">
      <div className="flex justify-between text-orange-300">
        <Image src="CalendarBlank.svg" alt="Calendar"/>
        <span>21 March 2024</span>
        <Image src="ArrowRight.svg" alt="to" className="mx-2"/>
        <span>21 April 2024</span>
      </div>
      <h1>Bahamas Family Trip</h1>
      <div className="flex justify-between gap-2 text-sm text-gray-500">
          <span>New York, United States of America</span>
          <span>|</span>
          <span>Solo Trip</span>
      </div>
    </section>
  );
}
