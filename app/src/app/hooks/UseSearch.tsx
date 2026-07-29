"use client";

import { useState, useEffect } from "react";
import { useLang } from "../context/LangContext";

interface UseSearchProps {
  searchType: "attraction" | "hotels" | "flights";
  query: string;
}

export function useSearch({ searchType, query }: UseSearchProps) {
  const { lang } = useLang();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const url = `api/search/${searchType}/location?query=${encodeURIComponent(
          query
        )}`;

        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        setResults(data ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query, lang, searchType]);

  return { results, loading };
}