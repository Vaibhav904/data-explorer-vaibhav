import { NextResponse } from "next/server";
import { orders } from "@/data/orders";

/**
 * Server-side Orders API Route Handler.
 * Supports:
 * - Single order fetch by ID or orderNumber (?id=...)
 * - Server-side search across orderNumber, customerName, customerEmail, productName
 * - Server-side filter by status and category
 * - Server-side sorting with asc/desc
 * - Server-side pagination with metadata
 * - Artificial random latency (200ms - 3000ms)
 * - Random simulated API failures (~10% rate)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Parameter to bypass simulation during automated testing if explicitly requested
  const skipDelay = searchParams.get("_skipDelay") === "true";
  const skipFailure = searchParams.get("_skipFailure") === "true";

  // 1. Simulate artificial random latency (200ms to 3000ms)
  if (!skipDelay) {
    const randomLatency = Math.floor(Math.random() * (3000 - 200 + 1)) + 200;
    await new Promise((resolve) => setTimeout(resolve, randomLatency));
  }

  // 2. Simulate random API failure (~10% failure rate)
  if (!skipFailure && Math.random() < 0.1) {
    return NextResponse.json(
      {
        error: "Simulated internal server error (10% random failure rate). Please retry."
      },
      { status: 500 }
    );
  }

  // 3. Handle single order lookup by ID or orderNumber
  const singleId = searchParams.get("id");
  if (singleId) {
    const order = orders.find(
      (o) =>
        String(o.id) === String(singleId) ||
        o.orderNumber.toLowerCase() === String(singleId).toLowerCase()
    );

    if (!order) {
      return NextResponse.json(
        { error: `Order with ID '${singleId}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: order });
  }

  // 4. Server-side Search
  const search = (searchParams.get("search") || "").trim().toLowerCase();

  // 5. Server-side Filters
  const statusFilter = (searchParams.get("status") || "").trim();
  const categoryFilter = (searchParams.get("category") || "").trim();

  let filtered = orders;

  if (search) {
    filtered = filtered.filter((order) => {
      return (
        order.orderNumber.toLowerCase().includes(search) ||
        order.customerName.toLowerCase().includes(search) ||
        order.customerEmail.toLowerCase().includes(search) ||
        order.productName.toLowerCase().includes(search)
      );
    });
  }

  if (statusFilter && statusFilter !== "All") {
    filtered = filtered.filter(
      (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }

  if (categoryFilter && categoryFilter !== "All") {
    filtered = filtered.filter(
      (order) => order.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  // 6. Server-side Sorting
  const sortField = searchParams.get("sort") || "orderDate";
  const sortOrder = (searchParams.get("order") || "desc").toLowerCase();
  const isAsc = sortOrder === "asc";

  filtered = [...filtered].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;

    if (sortField === "amount" || sortField === "id") {
      return isAsc ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
    }

    if (sortField === "orderDate") {
      const aTime = new Date(aVal).getTime();
      const bTime = new Date(bVal).getTime();
      return isAsc ? aTime - bTime : bTime - aTime;
    }

    // Default string comparison
    const comparison = String(aVal).localeCompare(String(bVal));
    return isAsc ? comparison : -comparison;
  });

  // 7. Server-side Pagination
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "50", 10)));
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;

  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  });
}
