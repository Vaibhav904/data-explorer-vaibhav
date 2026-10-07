import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[82vh] relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center bg-radial from-indigo-50/60 via-slate-50 to-slate-100/80">
      <div className="relative max-w-3xl mx-auto space-y-8 z-10">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-indigo-700 border border-indigo-100 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span>Production Developer Benchmark</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-mono text-[11px]">15,000+ Records</span>
        </div>

        {/* Hero title & Description */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Orders <span className="text-indigo-600">Data Explorer</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Fast, responsive order management built for clarity and speed. Filter by status, search across records, sort columns, and paginate through 15,000+ orders effortlessly.
          </p>
        </div>

        {/* Feature Grid - Crisp, Readable Cards with Pure SVG Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xs font-semibold text-slate-900">Race Protection</h2>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Cancels stale out-of-order calls</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-cyan-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-2.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 className="text-xs font-semibold text-slate-900">URL Sync</h2>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Shareable & bookmarkable state</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-violet-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center mb-2.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h2 className="text-xs font-semibold text-slate-900">Virtualization</h2>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Smooth TanStack Virtual table</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-xs font-semibold text-slate-900">Full A11y</h2>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Keyboard & screen reader ready</p>
          </div>
        </div>

        {/* CTA Launch Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/orders"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>Open Data Explorer</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
