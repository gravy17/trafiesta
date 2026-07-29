"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useTravel, type SearchCategory } from "../context/TravelContext";

export function NavBarSearch() {
  const { runSearch, search } = useTravel();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("flights");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    void runSearch(category, query || "Bahamas");
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="hidden sm:flex w-full max-w-[520px] h-[58px] items-center gap-2"
      >
        <div className="relative flex-1 h-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70">
            <Image src="/MagnifyingGlass.svg" alt="" width={20} height={20} />
          </span>
          <input
            aria-label="Search flights, hotels, activities"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 h-full rounded-xs border border-gray-200 bg-gray-100 focus:border-gray-300 focus:outline-none text-sm bg-[var(--background)]"
            placeholder="Search flights, hotels, activities"
          />
        </div>
        <select
          aria-label="Search category"
          value={category}
          onChange={(e) => setCategory(e.target.value as SearchCategory)}
          className="h-full rounded-xs border border-gray-200 bg-white px-2 text-sm"
        >
          <option value="flights">Flights</option>
          <option value="hotels">Hotels</option>
          <option value="activities">Activities</option>
        </select>
        <button
          type="submit"
          disabled={search.loading}
          className="h-full px-4 rounded-xs bg-blue-600 text-white text-sm font-medium disabled:opacity-60"
        >
          {search.loading ? "…" : "Go"}
        </button>
      </form>
      <button
        type="button"
        className="sm:hidden p-2 rounded-md border border-gray-200"
        title="Search"
        aria-label="Search"
        onClick={() => submit()}
      >
        <Image src="/MagnifyingGlass.svg" alt="Search" width={18} height={18} />
      </button>
    </div>
  );
}
