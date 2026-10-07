import { buildQueryString } from "./utils";

/**
 * Custom API Error class with status code and error details.
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Centralized API client for fetching orders with signal support.
 * @param {Object} params - Query params (search, status, category, sort, order, page, limit)
 * @param {Object} [options] - Options including AbortSignal
 * @returns {Promise<{ data: Array, pagination: Object }>}
 */
export async function fetchOrders(params = {}, options = {}) {
  const queryString = buildQueryString(params);
  const endpoint = `/api/orders${queryString}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    signal: options.signal
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: Failed to fetch orders`;
    let errorData = null;
    try {
      errorData = await response.json();
      if (errorData?.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // Body wasn't JSON
    }
    throw new ApiError(errorMessage, response.status, errorData);
  }

  return response.json();
}

/**
 * Fetch a single order by ID or orderNumber.
 * @param {string|number} id
 * @param {Object} [options]
 * @returns {Promise<{ data: Object }>}
 */
export async function fetchOrderById(id, options = {}) {
  const endpoint = `/api/orders?id=${encodeURIComponent(id)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    signal: options.signal
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: Order not found`;
    let errorData = null;
    try {
      errorData = await response.json();
      if (errorData?.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // Body wasn't JSON
    }
    throw new ApiError(errorMessage, response.status, errorData);
  }

  return response.json();
}
