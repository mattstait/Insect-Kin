import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';

// ── IntersectionObserver stub ─────────────────────────────────────────────────
// jsdom does not implement IntersectionObserver; StickyNav uses it to track
// which section is in view.  A no-op stub is enough for keyboard tests.
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;

// ── window.matchMedia stub ────────────────────────────────────────────────────
// jsdom does not implement matchMedia; framer-motion's useReducedMotion calls
// it internally.  We expose a configurable mock so individual tests can set
// prefers-reduced-motion: reduce by calling setReducedMotion(true).
let reducedMotionMatches = false;

export function setReducedMotion(value: boolean) {
  reducedMotionMatches = value;
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reducedMotionMatches : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// ── scrollY helper ────────────────────────────────────────────────────────────
// jsdom's scrollY is read-only; redefine it so tests can trigger the scroll
// visibility logic in StickyNav.
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

// ── Element.scrollIntoView stub ───────────────────────────────────────────────
// jsdom does not implement scrollIntoView; stub it so tests can spy on calls.
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Reset per-test state
beforeEach(() => {
  reducedMotionMatches = false;
});
