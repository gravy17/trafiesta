import { useEffect, useRef, useState } from "react";
import { useSearch } from "../hooks/UseSearch";

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchType: "hotels" | "flights" | "attraction";
  onSelectLocation: (location: any) => void;
}

export default function ItineraryModal({
  isOpen,
  onClose,
  searchType,
  onSelectLocation,
}: ItineraryModalProps) {
  const [query, setQuery] = useState("");
  const { results, loading } = useSearch({ searchType, query });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div ref={modalRef} className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Search {searchType}</h2>
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder={`Search ${searchType}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <p>Loading...</p>}
        <ul className="max-h-64 overflow-y-auto">
          {results?.map((item: any, i: number) => (
            <li
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelectLocation(item);
                onClose();
              }}
            >
              {item.title ?? item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
