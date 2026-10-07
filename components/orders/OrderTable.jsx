"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import OrderRow from "./OrderRow";
import SortButton from "./SortButton";

/**
 * OrderTable Component
 * - Semantic <table> with accessible headers
 * - Column sorting with SortButton
 * - Virtualized rendering using @tanstack/react-virtual with spacer rows
 * - High readability theme with clean borders and contrast
 */
export default function OrderTable({
  orders = [],
  sortField,
  sortOrder,
  onSort
}) {
  const tableContainerRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: orders.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 54, // row height in pixels
    overscan: 6
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualItems.length > 0 ? virtualItems[0]?.start || 0 : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end || 0)
      : 0;

  return (
    <div
      ref={tableContainerRef}
      className="w-full overflow-x-auto overflow-y-auto max-h-[620px] rounded-xl border border-slate-200 bg-white shadow-xs"
      tabIndex={0}
      aria-label="Orders data table with scrollable results"
    >
      <table className="min-w-full divide-y divide-slate-200 text-left border-collapse">
        <caption className="sr-only">
          List of orders with customer name, product, status, amount, and order date
        </caption>
        <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200 shadow-2xs">
          <tr>
            <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-600 whitespace-nowrap">
              Order ID
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              <SortButton
                field="customerName"
                label="Customer"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={onSort}
              />
            </th>
            <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-600 whitespace-nowrap">
              Product
            </th>
            <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-600 whitespace-nowrap">
              Category
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              <SortButton
                field="status"
                label="Status"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={onSort}
              />
            </th>
            <th scope="col" className="px-4 py-3 text-right whitespace-nowrap">
              <SortButton
                field="amount"
                label="Amount"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={onSort}
                className="justify-end w-full"
              />
            </th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">
              <SortButton
                field="orderDate"
                label="Date"
                currentField={sortField}
                currentOrder={sortOrder}
                onSort={onSort}
              />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {paddingTop > 0 && (
            <tr aria-hidden="true">
              <td colSpan={7} style={{ height: `${paddingTop}px`, padding: 0 }} />
            </tr>
          )}

          {virtualItems.map((virtualRow) => {
            const order = orders[virtualRow.index];
            return <OrderRow key={order.id} order={order} />;
          })}

          {paddingBottom > 0 && (
            <tr aria-hidden="true">
              <td colSpan={7} style={{ height: `${paddingBottom}px`, padding: 0 }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
