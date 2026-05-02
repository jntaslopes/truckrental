import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  class MockMutationObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn();
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(window, "MutationObserver", {
    writable: true,
    value: MockMutationObserver,
  });
  Object.defineProperty(globalThis, "MutationObserver", {
    writable: true,
    value: MockMutationObserver,
  });
  Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: vi.fn(),
  });
  Object.defineProperty(HTMLElement.prototype, "scrollBy", {
    writable: true,
    value: vi.fn(),
  });
});
