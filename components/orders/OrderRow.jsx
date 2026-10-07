"use client";

import { useRouter } from "next/navigation";
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
 * OrderRow Component
 * - Displays order attributes cleanly with high readability
 * - Pure SVG indicators (Zero emojis)
 * - Clickable or keyboard navigable to view order detail page
 */
export default function OrderRow({ order, style }) {
  const router = useRouter();

  if (!order) return null;

  const handleRowClick = () => {
    router.push(`/orders/${order.orderNumber}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRowClick();
    }
  };

  const statusInfo =
    STATUS_CONFIG[order.status] || {
      pill: "bg-slate-100 text-slate-700 border-slate-200",
      dot: "bg-slate-400"
    };

  return (
    <tr
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      style={style}
      aria-label={`View order ${order.orderNumber}`}
      className="group border-b border-slate-200/80 hover:bg-slate-50 cursor-pointer focus:outline-none focus:bg-indigo-50/60 transition-colors"
    >
      <td className="px-4 py-3.5 text-xs font-mono font-semibold text-indigo-600 group-hover:text-indigo-800 whitespace-nowrap">
        {order.orderNumber}
      </td>
      <td className="px-4 py-3.5 text-xs text-slate-800 whitespace-nowrap">
        <div className="font-semibold text-slate-900">{order.customerName}</div>
        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{order.customerEmail}</div>
      </td>
      <td className="px-4 py-3.5 text-xs text-slate-800 max-w-xs truncate" title={order.productName}>
        {order.productName}
      </td>
      <td className="px-4 py-3.5 text-xs text-slate-600 whitespace-nowrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 border border-slate-200 text-slate-700">
          {order.category}
        </span>
      </td>
      <td className="px-4 py-3.5 text-xs whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusInfo.pill}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} aria-hidden="true" />
          <span>{order.status}</span>
        </span>
      </td>
      <td className="px-4 py-3.5 text-xs font-mono font-bold text-slate-900 text-right whitespace-nowrap">
        {formatCurrency(order.amount)}
      </td>
      <td className="px-4 py-3.5 text-xs text-slate-600 font-mono whitespace-nowrap">
        {formatDate(order.orderDate)}
      </td>
    </tr>
  );
}
