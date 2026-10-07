import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/orders/Pagination";

describe("Pagination Component", () => {
  it("renders current page and total pages correctly", () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />);
    
    expect(screen.getByRole("navigation", { name: /pagination navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
  });

  it("disables Previous button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange with next page number when Next is clicked", () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with previous page number when Previous is clicked", () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when a specific numbered button is clicked", () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);

    const page4Button = screen.getByRole("button", { name: "Page 4" });
    fireEvent.click(page4Button);

    expect(handlePageChange).toHaveBeenCalledWith(4);
  });
});
