import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";

/**
 * Test harness replicating the race-condition protection and AbortController
 * logic implemented in OrdersExplorer.
 */
function TestRaceConditionExplorer({ query }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const activeRequestIdRef = useRef(0);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const currentRequestId = ++activeRequestIdRef.current;

    window
      .__mockFetchOrders(query, { signal: controller.signal })
      .then((res) => {
        if (currentRequestId === activeRequestIdRef.current) {
          setData(res.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (currentRequestId === activeRequestIdRef.current) {
          setError(err.message);
          setData([]);
        }
      });

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      {error && <div data-testid="error">{error}</div>}
      <div data-testid="results">
        {data.map((item) => (
          <div key={item.id} data-testid="item">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

describe("Race Condition & Stale Response Protection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("prevents slower earlier Request A from overwriting faster newer Request B", async () => {
    let resolveRequestA;
    let resolveRequestB;

    // Mock fetch where Request A can be delayed manually
    window.__mockFetchOrders = vi.fn().mockImplementation((query, { signal }) => {
      return new Promise((resolve, reject) => {
        signal?.addEventListener("abort", () => {
          const abortErr = new Error("Aborted");
          abortErr.name = "AbortError";
          reject(abortErr);
        });

        if (query === "laptop") {
          resolveRequestA = () => resolve({ data: [{ id: 1, name: "MacBook Air" }] });
        } else if (query === "iphone") {
          resolveRequestB = () => resolve({ data: [{ id: 2, name: "iPhone 15 Pro" }] });
        }
      });
    });

    const { rerender } = render(<TestRaceConditionExplorer query="laptop" />);

    // Request A ("laptop") is pending...
    expect(window.__mockFetchOrders).toHaveBeenCalledWith("laptop", expect.any(Object));

    // User quickly changes search to "iphone" (Request B)
    rerender(<TestRaceConditionExplorer query="iphone" />);
    expect(window.__mockFetchOrders).toHaveBeenCalledWith("iphone", expect.any(Object));

    // Request B finishes FIRST
    await act(async () => {
      resolveRequestB();
    });

    // iPhone results must be shown
    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
    expect(screen.queryByText("MacBook Air")).not.toBeInTheDocument();

    // Now Request A finishes LATER (stale response)
    await act(async () => {
      if (resolveRequestA) {
        resolveRequestA();
      }
    });

    // The stale laptop result must NEVER overwrite newer iphone results
    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
    expect(screen.queryByText("MacBook Air")).not.toBeInTheDocument();
  });

  it("signals request abort via AbortController when a new search starts", async () => {
    const abortedSignals = [];

    window.__mockFetchOrders = vi.fn().mockImplementation((query, { signal }) => {
      abortedSignals.push(signal);
      return new Promise(() => {}); // never resolves
    });

    const { rerender } = render(<TestRaceConditionExplorer query="sony" />);
    expect(abortedSignals[0].aborted).toBe(false);

    // Query changes to "dell"
    rerender(<TestRaceConditionExplorer query="dell" />);

    // First request's signal must be marked aborted
    expect(abortedSignals[0].aborted).toBe(true);
    expect(abortedSignals[1].aborted).toBe(false);
  });

  it("displays honest error state when request fails and allows retry", async () => {
    let shouldFail = true;

    window.__mockFetchOrders = vi.fn().mockImplementation((query) => {
      if (shouldFail) {
        return Promise.reject(new Error("500 Simulated server failure"));
      }
      return Promise.resolve({ data: [{ id: 10, name: "Recovered Order" }] });
    });

    function RetryHarness() {
      const [retry, setRetry] = useState(0);
      return (
        <div>
          <TestRaceConditionExplorer query={`search-${retry}`} />
          <button onClick={() => setRetry((r) => r + 1)}>Retry</button>
        </div>
      );
    }

    render(<RetryHarness />);

    // Should display the error message and no stale data
    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent("500 Simulated server failure");
    });
    expect(screen.queryByTestId("item")).not.toBeInTheDocument();

    // Now user retries
    shouldFail = false;
    act(() => {
      screen.getByRole("button", { name: "Retry" }).click();
    });

    await waitFor(() => {
      expect(screen.getByText("Recovered Order")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });
});
