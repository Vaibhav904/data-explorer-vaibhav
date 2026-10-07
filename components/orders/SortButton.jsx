"use client";

/**
 * SortButton Component
 * Supports sorting by field (amount, orderDate, customerName, status).
 * High-readability styling with SVG chevrons (Zero emojis).
 */
export default function SortButton({
  field,
  label,
  currentField,
  currentOrder = "desc",
  onSort,
  className = ""
}) {
  const isActive = currentField === field;
  const isAsc = isActive && currentOrder === "asc";
  const isDesc = isActive && currentOrder === "desc";

  const handleClick = () => {
    if (isActive) {
      onSort(field, currentOrder === "asc" ? "desc" : "asc");
    } else {
      const defaultDir = field === "customerName" ? "asc" : "desc";
      onSort(field, defaultDir);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Sort by ${label || field} ${
        isActive ? (isAsc ? "descending" : "ascending") : ""
      }`}
      className={`group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1 ${
        isActive
          ? "text-indigo-700 bg-indigo-50 border border-indigo-200 shadow-2xs font-bold"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent"
      } ${className}`}
    >
      <span>{label || field}</span>
      <span className="flex flex-col ml-0.5" aria-hidden="true">
        {/* Up Chevron */}
        <svg
          className={`w-2.5 h-2.5 -mb-0.5 transition-colors ${
            isAsc ? "text-indigo-700 stroke-[2.5]" : "text-slate-300 group-hover:text-slate-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        {/* Down Chevron */}
        <svg
          className={`w-2.5 h-2.5 transition-colors ${
            isDesc ? "text-indigo-700 stroke-[2.5]" : "text-slate-300 group-hover:text-slate-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
  );
}
