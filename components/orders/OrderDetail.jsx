"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

const STATUS_CONFIG = {
  Pending: {
    pill: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500"
  },
  Processing: {
    pill: "bg-blue-50 text-blue-800 border-blue-200",
    dot: "bg-blue-500"
  },
  Shipped: {
    pill: "bg-indigo-50 text-indigo-800 border-indigo-200",
    dot: "bg-indigo-500"
  },
  Delivered: {
    pill: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500"
  },
  Cancelled: {
    pill: "bg-rose-50 text-rose-800 border-rose-200",
    dot: "bg-rose-500"
  }
};

/**
 * OrderDetail Component
 * - Pure SVG icons (Zero emojis)
 * - User-friendly dark header + readable light card design
 */
export default function OrderDetail({ order }) {
  const router = useRouter();

  if (!order) return null;

  const statusInfo =
    STATUS_CONFIG[order.status] || {
      pill: "bg-slate-100 text-slate-700 border-slate-200",
      dot: "bg-slate-400"
    };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Explorer
        </button>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Dark Header Banner for premium contrast */}
        <div className="px-6 py-6 border-b border-slate-800 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold font-mono tracking-tight text-white">{order.orderNumber}</h1>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.pill}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} aria-hidden="true" />
                <span>{order.status}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Recorded on {formatDate(order.orderDate)}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Total Amount</span>
            <span className="text-2xl font-bold font-mono text-white tracking-tight">{formatCurrency(order.amount)}</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer info */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Customer Information
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-[11px] font-medium text-slate-500">Full Name</dt>
                <dd className="text-sm font-semibold text-slate-900 mt-0.5">{order.customerName}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium text-slate-500">Email Address</dt>
                <dd className="text-xs font-mono text-slate-700 mt-0.5">{order.customerEmail}</dd>
              </div>
            </dl>
          </div>

          {/* Product info */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Product Details
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-[11px] font-medium text-slate-500">Item</dt>
                <dd className="text-sm font-semibold text-slate-900 mt-0.5">{order.productName}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium text-slate-500">Category</dt>
                <dd className="text-xs text-slate-800 mt-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-white border border-slate-200 text-slate-700">
                    {order.category}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Payment & Status info */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Details
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-[11px] font-medium text-slate-500">Payment Method</dt>
                <dd className="text-sm font-semibold text-slate-900 mt-0.5">{order.paymentMethod}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium text-slate-500">Settlement Status</dt>
                <dd className="text-xs text-slate-700 mt-0.5">
                  {order.status === "Cancelled" ? "Cancelled & Voided" : "Settled"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Logistics & Record info */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              System Metadata
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-[11px] font-medium text-slate-500">System Record ID</dt>
                <dd className="text-xs font-mono font-medium text-slate-800 mt-0.5">#{order.id}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium text-slate-500">Unique Reference</dt>
                <dd className="text-xs font-mono font-semibold text-indigo-600 mt-0.5">{order.orderNumber}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <Link
            href="/orders"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to All Orders
          </Link>
          <span className="text-[11px] font-mono text-slate-400">Record #{order.id} verified</span>
        </div>
      </div>
    </div>
  );
}
