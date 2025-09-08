"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLang } from "../context/LangContext";

export function Sidebar() {
  const {lang, setLang} = useLang();

  return (
    <aside className="w-[220px] h-full mt-4 bg-white border-r border-gray-100 md:text-base">
      <nav className="py-6 px-4 flex flex-col gap-1">
        <Link href="/activities" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/RoadHorizon-1.svg" alt="" width={32} height={32} />
          <span className="text-xs sm:text-sm md:text-base text-gray-700">Activities</span>
        </Link>
        
        <Link href="/hotels" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/Buildings.svg" alt="" width={32} height={32} />
          <span className="text-xs sm:text-sm md:text-base text-gray-700">Hotels</span>
        </Link>
        
        <Link href="/flights" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/AirplaneTilt.svg" alt="" width={32} height={32} />
          <span className="text-xs sm:text-sm md:text-base text-gray-700">Flights</span>
        </Link>
        
        <Link href="/study" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/Student.svg" alt="" width={32} height={32} />
          <span className="text-xs sm:text-sm md:text-base text-gray-700">Study</span>
        </Link>
        
        <Link href="/visa" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/NewspaperClipping.svg" alt="" width={32} height={32} />
          <span className="text-xs sm:text-sm md:text-base text-gray-700">Visa</span>
        </Link>
        
        <Link href="/immigration" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/SuitcaseRolling.svg" alt="" width={32} height={32} />
          <span className="text-xs sm:text-sm md:text-base text-gray-700">Immigration</span>
        </Link>
        
        <Link href="/medical" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/FirstAidKit.svg" alt="" width={32} height={32} />
          <span className="text-xs sm:text-sm md:text-base text-gray-700">Medical</span>
        </Link>
        
        <Link href="/vacation-packages" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/Package.svg" alt="" width={32} height={32} />
          <span className="text-xs sm:text-sm md:text-base text-gray-700">Vacation packages</span>
        </Link>
        
        <div className="mt-[100%] px-3 py-3 bg-gray-100 rounded-lg flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm md:text-base bg-blue-700 text-blue-50 p-2 rounded-sm">Go</span>
            <span className="text-xs sm:text-sm md:text-base text-gray-700">Personal account</span>
            <Image src="/CaretUpDown.svg" alt="" width={24} height={24} />
          </div>
        </div>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="rounded bg-gray-100 px-2 py-1 text-dark"
        >
          <option value="en-us">en</option>
          <option value="fr-fr">fr</option>
          <option value="es-es">es</option>
          <option value="de-de">de</option>
        </select>
      </nav>
    </aside>
  );
}
