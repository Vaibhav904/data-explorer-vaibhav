import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Orders Data Explorer | Frontend Developer Assignment",
  description: "Enterprise-grade Data Explorer application built with Next.js App Router, virtualization, race condition protection, and server-side processing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
        {/* Navigation Bar - Elegant Dark Header for striking visual hierarchy */}
        <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-white hover:text-indigo-200 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-xs tracking-tight text-white shadow-sm group-hover:bg-indigo-500 transition-colors">
                DE
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-tight text-white">Data Explorer</span>
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Order Management</span>
              </div>
            </Link>

            <nav aria-label="Main Navigation" className="flex items-center gap-3">
              <Link
                href="/orders"
                className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Orders Explorer</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area - Crisp, easy-on-the-eyes light background */}
        <div className="flex-1">{children}</div>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 font-medium">Orders Data Explorer — High Readability & Performance</p>
            <p className="text-slate-500 text-[11px] font-mono">
              Next.js App Router • Inter Font • TanStack Virtual • Tailwind CSS
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
