export default function EmptyState({
  title = "No orders found.",
  message = "Try changing your search or filters.",
  onReset
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center p-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 my-4"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 mb-4 border border-slate-200">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-5">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
        >
          Clear filters and search
        </button>
      )}
    </div>
  );
}
