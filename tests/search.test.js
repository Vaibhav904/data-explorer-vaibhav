import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchBar from "@/components/orders/SearchBar";

describe("SearchBar & Debouncing", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders search input with placeholder and value", () => {
    render(<SearchBar value="laptop" onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("laptop");
  });

  it("debounces user keystrokes before calling onChange callback", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");

    // User types 'l', 'a', 'p'
    fireEvent.change(input, { target: { value: "l" } });
    fireEvent.change(input, { target: { value: "la" } });
    fireEvent.change(input, { target: { value: "lap" } });

    // Should NOT have fired immediately
    expect(handleChange).not.toHaveBeenCalled();

    // Fast-forward time by 200ms (less than 400ms debounce threshold)
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(handleChange).not.toHaveBeenCalled();

    // Advance remaining debounce time (+250ms -> 450ms total)
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Should be called once with final debounced query
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("lap");
  });

  it("clears input when clear button is clicked", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="keyboard" onChange={handleChange} />);

    const clearButton = screen.getByLabelText("Clear search query");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("clears search input when Escape key is pressed", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="monitor" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Escape" });

    expect(handleChange).toHaveBeenCalledWith("");
  });
});
