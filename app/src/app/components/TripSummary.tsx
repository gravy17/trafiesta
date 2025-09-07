import Image from "next/image";
import React from "react";

export function TripSummary() {
  return (
    <section className="w-fit max-w-[1412px] h-fit mr-auto mb-2 pt-4">
      <div className="w-fit p-0.5 rounded-xs flex justify-between gap-2 text-orange-900 bg-orange-50">
        <Image src="/CalendarBlank.svg" alt="Calendar" width={16} height={16}/>
        <span>21 March 2024</span>
        <Image src="/ArrowRight.png" alt="to" width={14} height={10} className="object-contain"/>
        <span>21 April 2024</span>
      </div>
      <h1 className="w-fit text-2xl text-black font-semibold">Bahamas Family Trip</h1>
      <div className="flex justify-between gap-2 text-base text-gray-500">
          <span>New York, United States of America</span>
          <span>|</span>
          <span>Solo Trip</span>
      </div>
    </section>
  );
}
