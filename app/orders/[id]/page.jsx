import Link from "next/link";
import { notFound } from "next/navigation";
import { orders } from "@/data/orders";
import OrderDetail from "@/components/orders/OrderDetail";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order ${id} - Data Explorer`,
    description: `Detailed order breakdown for ${id}`
  };
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;

  // Find order by ID or orderNumber
  const order = orders.find(
    (o) =>
      String(o.id) === String(id) ||
      o.orderNumber.toLowerCase() === String(id).toLowerCase()
  );

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 border border-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Order Not Found</h1>
        <p className="text-xs text-slate-600 mb-6 font-mono">
          Could not locate any record matching identifier &quot;{id}&quot;.
        </p>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Orders Explorer
        </Link>
      </div>
    );
  }

  return <OrderDetail order={order} />;
}
