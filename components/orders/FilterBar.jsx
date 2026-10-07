"use client";

import { ORDER_STATUSES, ORDER_CATEGORIES } from "@/lib/constants";

/**
 * FilterBar Component
 * - Filters by Status and Category
 * - Clear filters action
 * - Pure SVG icons (Zero emojis)
 */
export default function FilterBar({
  status = "",
  category = "",
  onStatusChange,
  onCategoryChange,
  onClearFilters
}) {
  const hasActiveFilters = Boolean(status || category);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="status-filter-select" className="text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
          Status:
        </label>
        <div className="relative">
          <select
            id="status-filter-select"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none rounded-lg border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-800 shadow-2xs focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 cursor-pointer transition-colors"
          >
            <option value="">All Statuses</option>
            {ORDER_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="category-filter-select" className="text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
          Category:
        </label>
        <div className="relative">
          <select
            id="category-filter-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="appearance-none rounded-lg border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-800 shadow-2xs focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 cursor-pointer transition-colors"
          >
            <option value="">All Categories</option>
            {ORDER_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer"
          aria-label="Clear all active filters"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reset Filters
        </button>
      )}
    </div>
  );
}
