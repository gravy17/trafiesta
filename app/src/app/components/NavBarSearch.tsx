import Image from "next/image";
import React, { useCallback, useState } from "react";
import Search, { GroupedResults } from "./Search";
import ListingsModal from "./ListingsModal";

export function NavBarSearch() {
  const [groupedResults, setGroupedResults] = useState<GroupedResults>({
    flights: [],
    hotels: [],
    attraction: [],
  });

  type ResultKey = keyof typeof groupedResults;

  const handleResults = useCallback((grouped: React.SetStateAction<GroupedResults>) => {
    setGroupedResults(grouped);
  }, []);

  const [secondOpen, setSecondOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
      "hotels" | "flights" | "attraction" | null
  >(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="hidden sm:flex w-full max-w-[400px] h-[58px]">
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70">
            <Image src="/MagnifyingGlass.svg" alt="Search" width={20} height={20} />
          </span>
          <Search searchType="any" placeholder="Search flights, hotels, activities" aria-label="Search"
            className="w-full pl-12 pr-4 h-full rounded-xs border border-gray-200 bg-gray-100 focus:border-gray-300 focus:outline-none text-sm bg-[var(--background)]"
            onResults={handleResults}
          />
          <div className="absolute top-full left-0 z-50 space-y-2">
            {Object.entries(groupedResults).map(([type, list]) =>
              list.length > 0 ? (
                <div key={type} className="border rounded-lg p-4 bg-white opacity-100">
                  <h2 className="font-bold text-lg capitalize mb-2">{type}</h2>
                  <ul className="space-y-1">
                    {list.map((item: { name?: any; title?: any; }, i: React.Key | null | undefined) => (
                      <li key={i} className="text-sm" onClick={() => {
                        const typedKey = type as ResultKey;
                        setSelectedType(typedKey);
                        setSelectedLocation(item);
                        setSecondOpen(true);
                      }}>
                        {item.name ?? item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      <button className="sm:hidden p-2 rounded-md border border-gray-200" title="Search" aria-label="Search">
        <Image src="/MagnifyingGlass.svg" alt="Search" width={18} height={18} />
      </button>
      <ListingsModal
        isOpen={secondOpen}
        onClose={() => setSecondOpen(false)}
        searchType={selectedType!}
        location={selectedLocation}
      />
    </div>
  );
}
