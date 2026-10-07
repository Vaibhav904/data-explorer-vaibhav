export default function ErrorState({
  title = "Unable to load orders.",
  message = "Something went wrong while fetching the data.",
  onRetry
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-12 text-center bg-rose-50/70 rounded-2xl border border-rose-200 my-4"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-100 text-rose-600 mb-4 border border-rose-200">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-base font-bold text-rose-900 mb-1">{title}</h3>
      <p className="text-xs text-rose-700 max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Retry Request
        </button>
      )}
    </div>
  );
}
