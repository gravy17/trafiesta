"use client";

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
  const { addFlight, addHotel, addActivity } = useTravel();

  let searchParams = "";
  switch (searchType) {
    case "hotels":
      searchParams = `dest_id=${location?.dest_id}`;
      break;
    case "flights":
      searchParams = `toId=${location?.id}`;
      break;
    case "attraction":
      searchParams = `id=${location?.id}`;
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
        .then((data) => setListings(data || []));
    }
  }, [isOpen, location, searchType, searchParams]);

  if (!isOpen || !location) return null;

  const addToStore = (item: any) => {
    switch (searchType) {
      case "hotels":
        addHotel({
          id: String(item.id ?? item.hotel_id ?? Date.now()),
          name: item.name ?? "Hotel",
          price: item.price ? `${item.price} ${item.currency ?? ""}`.trim() : undefined,
          img: item.img ?? item.photo ?? item.main_photo_url,
        });
        break;
      case "flights": {
        const leg = item?.segments?.[0]?.legs?.[0];
        const carrier = leg?.carriersData?.[0]?.name;
        const from = leg?.departureAirport?.code;
        const to = leg?.arrivalAirport?.code;
        addFlight({
          id: String(item.token ?? item.id ?? Date.now()),
          route:
            from && to
              ? `${from} → ${to}`
              : carrier
                ? `${carrier} flight`
                : "Flight",
          time:
            leg?.departureTime && leg?.arrivalTime
              ? `${leg.departureTime} – ${leg.arrivalTime}`
              : undefined,
          price: item?.priceBreakdown?.total
            ? `${item.priceBreakdown.total.units} ${item.priceBreakdown.total.currencyCode}`
            : undefined,
          carrier: undefined,
        });
        break;
      }
      case "attraction":
        addActivity({
          id: String(item.id ?? Date.now()),
          label: item.title ?? item.name ?? "Activity",
          icon: "/RoadHorizon.svg",
        });
        break;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div ref={modalRef} className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">
          {searchType}: {location.title || location.label || location.name}
        </h2>
        <ul className="max-h-64 overflow-y-auto">
          {listings.map((item, i) => (
            <li
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addToStore(item)}
            >
              {searchType === "flights" ? (
                <>
                  {item.segments?.[0]?.legs?.[0]?.carriersData?.[0]?.name}{" "}
                  {item.segments?.[0]?.legs?.[0]?.flightInfo?.flightNumber} -{" "}
                  {item.segments?.[0]?.legs?.[0]?.departureAirport?.code} to{" "}
                  {item.segments?.[0]?.legs?.[0]?.arrivalAirport?.code} (
                  {item.segments?.[0]?.legs?.[0]?.departureTime} -{" "}
                  {item.segments?.[0]?.legs?.[0]?.arrivalTime}) -{" "}
                  {item.priceBreakdown?.total?.units}{" "}
                  {item.priceBreakdown?.total?.currencyCode}
                </>
              ) : searchType === "hotels" ? (
                <>
                  {item.name} - {item.address} - {item.price} {item.currency}
                </>
              ) : searchType === "attraction" ? (
                <>
                  {item.title} - {item.address} -{" "}
                  {item.price ? `${item.price} ${item.currency}` : "Free"}
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
