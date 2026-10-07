import "@testing-library/jest-dom";

// Mock next/navigation
vi.mock("next/navigation", () => {
  const currentParams = new URLSearchParams();
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn()
    }),
    useSearchParams: () => currentParams,
    usePathname: () => "/orders"
  };
});
