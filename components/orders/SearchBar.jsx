"use client";

import { useState, useEffect, useRef } from "react";

/**
 * SearchBar Component
 * - Controlled input with local immediate state for fast typing feedback
 * - Debounces changes by 400ms before notifying parent / URL
 * - Escape key clears search
 * - Pure SVG icons (Zero emojis)
 */
export default function SearchBar({ value = "", onChange, placeholder = "Search orders..." }) {
  const [query, setQuery] = useState(value);
  const isFirstMount = useRef(true);

  // Synchronize internal query state if prop changes externally (e.g. browser back/forward)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Debounced propagation to parent
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (query !== value) {
        onChange(query);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, value, onChange]);

  const handleClear = () => {
    setQuery("");
    onChange("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className="w-full relative">
      <label htmlFor="orders-search-input" className="sr-only">
        Search orders by order number, customer, email, or product
      </label>
      <div className="relative rounded-xl shadow-2xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="orders-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="block w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-16 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans"
        />
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search query"
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
              ESC
            </kbd>
          )}
        </div>
      </div>
    </div>
  );
}
