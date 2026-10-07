export default function LoadingState({ message = "Loading orders..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center p-16 text-center"
    >
      <div className="relative w-10 h-10 mb-4">
        <div className="w-10 h-10 rounded-full border-3 border-indigo-100 border-t-indigo-600 animate-spin" />
      </div>
      <p className="text-sm font-semibold text-slate-700">{message}</p>
      <span className="sr-only">Please wait while order data is being loaded</span>
    </div>
  );
}
