"use client";

import { useEffect, useMemo, useState} from "react";
import { useSearch } from "../hooks/UseSearch";

interface SearchProps {
  placeholder?: string;
  searchType: "attraction" | "hotels" | "flights" | "any";
  className?: string;
  onResults: (groupedResults: GroupedResults) => void;
}

export interface GroupedResults {
  flights: any[];
  hotels: any[];
  attraction: any[];
}

export default function Search({
  placeholder = "Search...",
  searchType,
  className = "w-full pl-12 pr-4 h-full rounded-xs border border-gray-200 bg-gray-100 focus:border-gray-300 focus:outline-none text-sm bg-[var(--background)]",
  onResults,
}: SearchProps) {
    const [query, setQuery] = useState("");

    const flights = useSearch({ searchType: "flights", query });
    const hotels = useSearch({ searchType: "hotels", query });
    const attraction = useSearch({ searchType: "attraction", query });

    const groupedResults: GroupedResults = useMemo(
      () => ({
        flights: flights.results, 
        hotels: hotels.results,
        attraction: attraction.results,
      }),
      [attraction.results, hotels.results, flights.results]
    );

    const loading = attraction.loading || hotels.loading || flights.loading;

    useEffect(() => {
      if (!loading) {
        onResults(groupedResults);
      }
    }, [groupedResults, loading]);

    return (
      <>
        <input
            type="text"
            className={className}
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        {query.length > 0 ? 
          <button className="border-none bg-none absolute h-full pr-4 top-0 right-0 text-xl" onClick={() => setQuery("")}
          >
            x
          </button>
          : null
        }
      </>
    );
}