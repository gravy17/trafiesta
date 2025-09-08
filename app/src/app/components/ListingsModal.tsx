import { useEffect, useRef, useState } from "react";
import { useTravel } from "../context/TravelContext";

interface ListingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchType: "hotels" | "flights" | "attraction";
  location: any;
}

export default function ListingsModal({
  isOpen,
  onClose,
  searchType,
  location,
}: ListingsModalProps) {
    const [listings, setListings] = useState<any[]>([]);
    const { dispatch } = useTravel();

    if (!location || (!location.id && !location.dest_id)){
        return null;
    }
    
    let searchParams = "";
    switch (searchType) {
        case "hotels":
            searchParams = `dest_id=${location.dest_id}`;
        break;
        case "flights":
            searchParams = `toId=${location.id}`;
        break;
        case "attraction":
            searchParams = `id=${location.id}`;
        break;
    }

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

  useEffect(() => {
    if (isOpen && location) {
      fetch(`/api/search/${searchType}/listings?${searchParams}`)
        .then((res) => res.json())
        .then((data) => setListings(data.listings || []));
    }
  }, [isOpen, location, searchType]);

  if (!isOpen || !location) return null;

  const addToStore = (item: any) => {
    switch (searchType) {
      case "hotels":
        dispatch({ type: "ADD_HOTEL", payload: item });
        break;
      case "flights":
        dispatch({ type: "ADD_FLIGHT", payload: item });
        break;
      case "attraction":
        dispatch({ type: "ADD_ACTIVITY", payload: item });
        break;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div ref={modalRef} className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">
          {searchType}: {location.title || location.label}
        </h2>
        <ul className="max-h-64 overflow-y-auto">
          {listings.map((item, i) => (
            <li
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addToStore(item)}
            >
              {item.name || item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}