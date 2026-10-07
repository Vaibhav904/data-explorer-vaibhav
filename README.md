# Orders Data Explorer — Frontend Developer Assignment

A production-quality **Orders Data Explorer** built using **Next.js (App Router), JavaScript (JSX), and React**. The application allows users to search, filter, sort, and navigate through a dataset of **15,000+ realistic e-commerce order records** with server-side processing, request virtualization, URL synchronization, and robust race condition protection.

---

## 🚀 Live Demo & Deployment

* **Production URL:** [Deployed on Vercel](#) *(Follow the Deployment section below to deploy)*
* **Repository:** [GitHub Repository](#)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Architecture & Folder Structure](#architecture--folder-structure)
5. [Dataset & Data Model](#dataset--data-model)
6. [API Design](#api-design)
7. [Race Condition Protection & Request Cancellation](#race-condition-protection--request-cancellation)
8. [URL State Management](#url-state-management)
9. [Large Dataset Virtualization & Performance](#large-dataset-virtualization--performance)
10. [Accessibility (a11y) & Responsiveness](#accessibility-a11y--responsiveness)
11. [Testing Suite](#testing-suite)
12. [Tradeoffs & Architectural Decisions](#tradeoffs--architectural-decisions)
13. [Local Setup & Getting Started](#local-setup--getting-started)
14. [Sources & References](#sources--references)
15. [AI Usage Disclosure](#ai-usage-disclosure)

---

## 1. Project Overview

The **Orders Data Explorer** solves the real-world engineering challenge of exploring, searching, and filtering massive e-commerce datasets without crashing client browsers or returning stale, inconsistent results under slow, unreliable network conditions.

Key problem domains solved:
* **True Server-Side Execution:** Searching, filtering, sorting, and pagination execute on the server. The client only downloads the requested slice (50 records per page).
* **Network Realism:** Artificial latency (200ms–3000ms) and ~10% simulated server failures simulate unstable real-world networks.
* **Rock-Solid Race Condition Handling:** Rapid keystrokes and out-of-order responses never cause stale data to overwrite fresh results, guaranteed via `AbortController` and monotonic request sequence IDs.
* **100% URL Synchronization:** All search queries, filters, sort orders, and page indices live in the URL search params, ensuring shareable links, refresh resilience, and seamless browser back/forward navigation.

---

## 2. Features

* **Server-Side Full-Text Search:**
  * Searches order numbers, customer names, emails, and product names.
  * Debounced by 400ms to eliminate unnecessary API flooding.
  * Instant keyboard clearing with `Esc` or visual clear button.
* **Server-Side Multi-Faceted Filtering:**
  * Filter by Status (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
  * Filter by Category (`Electronics`, `Clothing`, `Home`, `Books`, `Beauty`, `Sports`).
  * One-click "Reset Filters" action.
* **Server-Side Column Sorting:**
  * Sort by Amount, Date, Customer Name, and Status in ascending or descending orders.
  * Sort buttons integrated directly into the table headers and toolbar.
* **Server-Side Windowed Pagination:**
  * Smart page windowing (e.g. `1 ... 4 5 6 ... 300`) with disabled boundary buttons.
  * Automatically resets to Page 1 whenever search, filter, or sort criteria change.
* **DOM Virtualization (`@tanstack/react-virtual`):**
  * Renders only visible rows inside a high-performance scrollable viewport.
  * Zero memory bloat or DOM sluggishness even with extensive lists.
* **Comprehensive Order Detail View:**
  * Deep-linked `/orders/[id]` page accessible directly by URL or by clicking table rows.
  * Full order breakdown: customer details, items, payment method, date, and status.
  * Preserves previous explorer state upon return.
* **Honest Error Handling & Retry:**
  * Displays transparent error state when the API hits its simulated 10% failure rate.
  * Never masks failure or presents outdated data as fresh.
  * Built-in retry trigger that re-executes the failed query.
* **Screen Reader & Keyboard Accessibility:**
  * Fully accessible with `Tab`, `Enter`, `Space`, and `Esc`.
  * ARIA live announcements for results count and search updates (`aria-live="polite"`).
  * High-contrast visible focus rings on all interactive elements.

---

## 3. Technology Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** JavaScript / JSX (Strictly no TypeScript in source components)
* **Typography:** Inter (`next/font/google`)
* **Design Philosophy:** User-friendly light/dark hybrid contrast — deep slate-900 navigation headers paired with clean, readable slate-50/white cards, high-contrast typography, and precision SVG indicators (Strictly zero emojis)
* **UI Library:** React 19
* **Styling:** Tailwind CSS v4
* **Virtualization:** `@tanstack/react-virtual` (v3)
* **Data Fetching:** Native Fetch API + `AbortController`
* **Test Runner & Utilities:** Vitest, React Testing Library, JSDOM, `@testing-library/jest-dom`

---

## 4. Architecture & Folder Structure

The project conforms strictly to the assignment's specified directory structure:

```text
data-explorer/
│
├── app/
│   ├── api/
│   │   └── orders/
│   │       └── route.js           # Server-side Route Handler (search, filter, sort, paginate, latency, failure)
│   ├── orders/
│   │   ├── page.jsx               # Main Orders Explorer client page (URL sync, table, controls)
│   │   └── [id]/
│   │       └── page.jsx           # Order detail view route (direct URL linking)
│   ├── layout.js                  # Global layout with navigation, footer, and metadata
│   ├── page.jsx                   # Home landing page with call-to-action
│   └── globals.css                # Global styles, Tailwind v4 import, accessibility focus outlines
│
├── components/
│   ├── orders/
│   │   ├── OrderTable.jsx         # Virtualized semantic table with column sorting
│   │   ├── OrderRow.jsx           # Interactive table row with keyboard support & status badges
│   │   ├── SearchBar.jsx          # Debounced search bar with clear button & Esc support
│   │   ├── FilterBar.jsx          # Status & category dropdown filters with reset
│   │   ├── SortButton.jsx         # Accessible ascending/descending toggle button
│   │   ├── Pagination.jsx         # Accessible windowed pagination controls
│   │   └── OrderDetail.jsx        # Order breakdown card with back-navigation
│   └── ui/
│       ├── LoadingState.jsx       # Spinner with ARIA status role
│       ├── ErrorState.jsx         # Error alert with Retry button
│       └── EmptyState.jsx         # Empty query fallback with clear filters button
│
├── data/
│   └── orders.js                  # Deterministic generator creating 15,000 realistic orders
│
├── lib/
│   ├── api.js                     # Centralized API client with custom ApiError and AbortSignal support
│   ├── utils.js                   # Currency (INR), date formatting, and query builder helpers
│   └── constants.js               # Statuses, categories, sort fields, and default constants
│
├── public/                        # Static assets
│
├── tests/
│   ├── search.test.js             # Tests for SearchBar debounce and clear actions
│   ├── pagination.test.js         # Tests for page navigation, boundary disables, and clicks
│   ├── race-condition.test.js     # Tests verifying Request A vs B race-condition & AbortController
│   └── setup.js                   # Vitest environment setup and Next.js navigation mocks
│
├── package.json                   # Dependencies, scripts, and engine configurations
├── vitest.config.mjs              # Vitest configuration with JSX transform
└── README.md                      # Comprehensive project documentation
```

---

## 5. Dataset & Data Model

The application generates **15,000 realistic order records** in `data/orders.js` using a deterministic pseudo-random number generator (Mulberry32 PRNG with seed `42`).

Every record includes:
```javascript
{
  id: 1,
  orderNumber: "ORD-100001",
  customerName: "Rahul Sharma",
  customerEmail: "rahul.sharma84@example.com",
  productName: "MacBook Air M2",
  category: "Electronics",
  status: "Delivered",
  amount: 89450,
  orderDate: "2026-08-14",
  paymentMethod: "UPI"
}
```

* **Categories:** Electronics, Clothing, Home, Books, Beauty, Sports.
* **Statuses:** Pending, Processing, Shipped, Delivered, Cancelled.
* **Payment Methods:** UPI, Credit Card, Debit Card, Net Banking, Cash on Delivery.
* **Determinism:** The generator produces the exact same records across server restarts, ensuring idempotent testing and stable deep links.

---

## 6. API Design

The API route is located at `app/api/orders/route.js`.

### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `search` | String | `""` | Substring match against `orderNumber`, `customerName`, `customerEmail`, `productName` |
| `status` | String | `""` | Filter by status (`Pending`, `Delivered`, etc.) |
| `category` | String | `""` | Filter by category (`Electronics`, `Clothing`, etc.) |
| `sort` | String | `"orderDate"` | Sort field (`amount`, `orderDate`, `customerName`, `status`) |
| `order` | String | `"desc"` | Sort direction (`asc` or `desc`) |
| `page` | Number | `1` | Page index (1-indexed) |
| `limit` | Number | `50` | Page limit (capped at 100) |
| `id` | String | `""` | Look up a single order by ID or orderNumber |

### Response Schema

```json
{
  "data": [
    {
      "id": 1,
      "orderNumber": "ORD-100001",
      "customerName": "Rahul Sharma",
      "customerEmail": "rahul.sharma84@example.com",
      "productName": "MacBook Air M2",
      "category": "Electronics",
      "status": "Delivered",
      "amount": 89450,
      "orderDate": "2026-08-14",
      "paymentMethod": "UPI"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 15000,
    "totalPages": 300
  }
}
```

### Simulation Features
* **Random Artificial Latency:** Every API request executes `setTimeout` between `200ms` and `3000ms`.
* **Random Simulated Failures:** Approximately 10% of requests (`Math.random() < 0.10`) return HTTP 500 error:
  ```json
  { "error": "Simulated internal server error (10% random failure rate). Please retry." }
  ```

---

## 7. Race Condition Protection & Request Cancellation

A critical requirement in data explorer applications is ensuring out-of-order network responses never corrupt the user interface.

### The Problem
1. User types `"laptop"` (Request A starts, delayed by 2500ms).
2. User quickly corrects query to `"iphone"` (Request B starts, delayed by 300ms).
3. Request B finishes first in 300ms, displaying iPhone results.
4. Request A finishes later at 2500ms. Without protection, Request A would overwrite iPhone results with stale laptop results.

### The Solution: Two-Layer Defense
In `app/orders/page.jsx`:
1. **Layer 1: Native Request Cancellation (`AbortController`):**
   Before initiating a new fetch, `abortControllerRef.current.abort()` cancels the previous in-flight HTTP request.
2. **Layer 2: Monotonic Request Sequence Tracking:**
   `activeRequestIdRef.current` increments with each request. When an API response completes, the callback compares `currentRequestId === activeRequestIdRef.current`. If a newer request was dispatched in the meantime, the stale response is completely dropped.
3. **Layer 3: Abort Error Isolation:**
   When a fetch request is aborted by a newer action, its rejection has `err.name === 'AbortError'`. The error handler ignores this error instead of showing false "Error loading orders" banners.

---

## 8. URL State Management

All critical explorer state lives directly in the URL:
```text
/orders?search=laptop&status=Delivered&category=Electronics&sort=amount&order=desc&page=2
```

### Advantages
* **Bookmarkable & Shareable:** Pasting this link into another browser window reproduces the identical view and page.
* **Refresh Proof:** Refreshing does not lose your search query, filters, or pagination.
* **Browser History Support:** Clicking Back (`←`) and Forward (`→`) transitions smoothly through previous filter steps.
* **Page Reset Rule:** Modifying search, status, category, or sorting immediately resets `page` to 1.

---

## 9. Large Dataset Virtualization & Performance

* **Virtualization:** `@tanstack/react-virtual` is integrated in `components/orders/OrderTable.jsx`.
* **Spacer Row Architecture:** Rather than using CSS positioning hacks that misalign table columns, the virtualizer utilizes top and bottom spacer rows (`<td style={{ height: paddingTop }} />`). This preserves native HTML table semantics, column alignment, and screen reader flow.
* **Overscan Buffering:** An overscan buffer of 6 rows ensures that fast scrolling feels completely instantaneous without blank flicker.
* **Minimal DOM Footprint:** Out of 50 records per page (or thousands when configured higher), only the ~12 visible rows are mounted in the DOM.

---

## 10. Accessibility (a11y) & Responsiveness

* **Keyboard Navigation:** Every interactive element is reachable via `Tab`. Rows open via `Enter` or `Space`. Search clears via `Esc`.
* **Focus Management:** Visible `:focus-visible` ring styled in `globals.css` with indigo outline and offset.
* **ARIA Semantics:**
  * Caption on table (`<caption>`).
  * Live status region (`role="status"`, `aria-live="polite"`) announcing result counts.
  * Error alerts flagged with `role="alert"`.
  * Pagination identified with `role="navigation"`, `aria-label="Pagination Navigation"`, and active page highlighted via `aria-current="page"`.
* **Responsive Layout:** Designed for desktop, tablet, and mobile. The data table container features smooth horizontal scrolling (`overflow-x-auto`) on smaller screens.

---

## 11. Testing Suite

The project includes unit and integration tests powered by **Vitest** and **React Testing Library**.

### Running Tests
```bash
npm test
```

### Test Coverage Summary (13 passing tests)

1. **`tests/search.test.js`**
   * Renders search input with placeholder and value.
   * Debounces user keystrokes (400ms threshold) before triggering the callback.
   * Clears query when clicking the clear icon.
   * Clears query when pressing the `Escape` key.

2. **`tests/pagination.test.js`**
   * Renders current page and total pages correctly.
   * Disables `Previous` button on page 1.
   * Disables `Next` button on the final page.
   * Dispatches page change events on `Next`, `Previous`, and numbered buttons.

3. **`tests/race-condition.test.js`**
   * Simulates slow Request A (`laptop`) and fast Request B (`iphone`), asserting that Request A never overwrites Request B.
   * Verifies `AbortController.signal.aborted` flips to `true` when superseding requests launch.
   * Verifies honest error state display and functional retry flow.

---

## 12. Tradeoffs & Architectural Decisions

1. **URL State as the Single Source of Truth:**
   * *Tradeoff:* Requires wrapping the explorer in Next.js `<Suspense>` boundary to allow client-side hydration of `useSearchParams()`.
   * *Benefit:* Eliminates state duplication between Redux/Zustand and URL params, making the application bookmarkable and resilient.
2. **Spacer Rows for Table Virtualization:**
   * *Tradeoff:* Requires a table container with fixed or maximum height (`max-h-[620px]`).
   * *Benefit:* Retains standard semantic `<table>`, `<thead>`, and `<tbody>` elements without column width drift.
3. **In-Memory Procedural Generation:**
   * *Tradeoff:* Generates 15,000 items in server memory at startup.
   * *Benefit:* Generation takes under 15ms, requires zero external database setup, and guarantees 100% deterministic repeatable records across environments.

---

## 13. Local Setup & Getting Started

### Prerequisites
* Node.js 18.x or higher
* npm 9.x or higher

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd data-explorer

# Install dependencies
npm install

# Run the test suite
npm test

# Run Next.js production build
npm run build

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 14. Sources & References

* [Next.js App Router Documentation](https://nextjs.org/docs/app)
* [TanStack Virtual v3 Guide](https://tanstack.com/virtual/latest)
* [MDN Web Docs: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
* [W3C WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
* [Vitest Documentation](https://vitest.dev/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 15. AI Usage Disclosure

In compliance with the assignment rules:
* AI tools (**Antigravity / Gemini 3.8 Flash**) were utilized during development for code structuring, synthesizing realistic Indian and global e-commerce test records, writing comprehensive Vitest specifications, and generating documentation.
* **Review & Verification:** All AI-assisted code was manually reviewed, verified against the assignment requirements, built using `next build` (Next.js 16 App Router), and tested with 13 automated test assertions passing in Vitest.
