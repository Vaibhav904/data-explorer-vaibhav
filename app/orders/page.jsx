"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { fetchOrders } from "@/lib/api";
import SearchBar from "@/components/orders/SearchBar";
import FilterBar from "@/components/orders/FilterBar";
import OrderTable from "@/components/orders/OrderTable";
import Pagination from "@/components/orders/Pagination";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";

function OrdersExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Read State from URL Parameters
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "orderDate";
  const order = searchParams.get("order") || "desc";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  // 2. Local State for Data & API Status
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // 3. Race Condition & AbortController tracking
  const activeRequestIdRef = useRef(0);
  const abortControllerRef = useRef(null);

  // Helper to push URL state updates
  const updateUrlParams = useCallback(
    (updates, resetPage = true) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          params.set(key, String(val));
        } else {
          params.delete(key);
        }
      });

      if (resetPage) {
        params.delete("page");
      }

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [router, pathname, searchParams]
  );

  // 4. Fetch orders with race condition protection & request cancellation
  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const currentRequestId = ++activeRequestIdRef.current;

    setIsLoading(true);
    setError(null);

    fetchOrders(
      {
        search,
        status,
        category,
        sort,
        order,
        page,
        limit: 50
      },
      { signal: controller.signal }
    )
      .then((res) => {
        if (currentRequestId === activeRequestIdRef.current) {
          setOrders(res.data || []);
          setPagination(
            res.pagination || {
              page,
              limit: 50,
              total: 0,
              totalPages: 1
            }
          );
          setIsLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }

        if (currentRequestId === activeRequestIdRef.current) {
          setError(err);
          setOrders([]);
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [search, status, category, sort, order, page, retryCount]);

  // Handlers
  const handleSearchChange = (newSearch) => {
    updateUrlParams({ search: newSearch }, true);
  };

  const handleStatusChange = (newStatus) => {
    updateUrlParams({ status: newStatus }, true);
  };

  const handleCategoryChange = (newCategory) => {
    updateUrlParams({ category: newCategory }, true);
  };

  const handleClearFilters = () => {
    updateUrlParams({ status: "", category: "" }, true);
  };

  const handleResetAll = () => {
    router.push(pathname);
  };

  const handleSort = (field, direction) => {
    updateUrlParams({ sort: field, order: direction }, true);
  };

  const handlePageChange = (newPage) => {
    updateUrlParams({ page: newPage > 1 ? newPage : "" }, false);
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Orders Explorer
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Querying 15,000+ orders across server-side search, categories, statuses, and TanStack virtualization.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Home
          </Link>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/90 mb-6 space-y-4">
        {/* Search */}
        <div className="max-w-2xl">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by order ID, customer name, email, or product..."
          />
        </div>

        {/* Filter & Results count Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <FilterBar
            status={status}
            category={category}
            onStatusChange={handleStatusChange}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
          />

          {/* Results count indicator with ARIA live announcement */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-xs text-slate-600"
          >
            {isLoading ? (
              <span className="flex items-center gap-2 text-indigo-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                Synchronizing results...
              </span>
            ) : error ? (
              <span className="text-rose-600 font-semibold">Failed to load count</span>
            ) : (
              <span>
                <strong className="text-slate-900 font-bold font-mono">
                  {pagination.total.toLocaleString()}
                </strong>{" "}
                orders found
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Data Presentation Area */}
      <main aria-label="Orders Data Table Area" className="space-y-4">
        {isLoading && orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs">
            <LoadingState message="Fetching orders from server..." />
          </div>
        ) : error ? (
          <ErrorState
            title="Unable to load orders."
            message={error.message || "Something went wrong while fetching data from the server."}
            onRetry={handleRetry}
          />
        ) : orders.length === 0 ? (
          <EmptyState
            title="No orders found."
            message="No orders matched your active search query or filter criteria."
            onReset={handleResetAll}
          />
        ) : (
          <div className="relative">
            {/* Background update indicator */}
            {isLoading && (
              <div
                className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex items-center justify-center rounded-2xl transition-all"
                aria-hidden="true"
              >
                <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-slate-200 text-xs font-semibold text-indigo-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  Updating data...
                </div>
              </div>
            )}

            <OrderTable
              orders={orders}
              sortField={sort}
              sortOrder={order}
              onSort={handleSort}
            />

            {/* Pagination Controls */}
            <div className="mt-4">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto py-16 px-4">
          <LoadingState message="Initializing Orders Explorer..." />
        </div>
      }
    >
      <OrdersExplorer />
    </Suspense>
  );
}
