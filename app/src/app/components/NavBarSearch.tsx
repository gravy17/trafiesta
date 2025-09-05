import Image from "next/image";
import React from "react";

export function NavBarSearch() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="hidden sm:flex w-full max-w-[400px] h-[58px]">
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70">
        <Image src="/MagnifyingGlass.svg" alt="Search" width={20} height={20} />
          </span>
          <input
        aria-label="Search"
        className="w-full pl-12 pr-4 h-full rounded-xs border border-gray-200 bg-gray-100 focus:border-gray-300 focus:outline-none text-sm bg-[var(--background)]"
        placeholder="Search flights, hotels, activities"
          />
        </div>
      </div>
      <button className="sm:hidden p-2 rounded-md border border-gray-200" title="Search" aria-label="Search">
        <Image src="/MagnifyingGlass.svg" alt="Search" width={18} height={18} />
      </button>
    </div>
  );
}
