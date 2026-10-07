export const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled"
];

export const ORDER_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home",
  "Books",
  "Beauty",
  "Sports"
];

export const SORT_FIELDS = [
  { value: "orderDate", label: "Date" },
  { value: "amount", label: "Amount" },
  { value: "customerName", label: "Customer" },
  { value: "status", label: "Status" }
];

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc"
};

export const DEFAULT_PAGE_SIZE = 50;

export const DEFAULT_SORT_FIELD = "orderDate";
export const DEFAULT_SORT_ORDER = "desc";
