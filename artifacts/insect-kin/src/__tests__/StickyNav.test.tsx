/**
 * StickyNav keyboard-accessibility tests
 *
 * Covers three regression areas added by the keyboard-navigation feature:
 *   1. Focus trap — Tab wraps forward; Shift+Tab wraps backward inside the overlay
 *   2. Escape key — closes the overlay and returns focus to the hamburger trigger
 *   3. prefers-reduced-motion — overlay links use scrollIntoView 'instant' when
 *      reduced motion is preferred; 'smooth' otherwise
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setReducedMotion } from '../test/setup';

// ── Partial framer-motion mock ────────────────────────────────────────────────
// Keep real implementations for motion.* components so the component renders
// correctly.  Only replace useReducedMotion so tests can control its value.
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return { ...actual, useReducedMotion: vi.fn() };
});

import { useReducedMotion } from 'framer-motion';
import { StickyNav } from '../pages/home';

// ── helpers ───────────────────────────────────────────────────────────────────

/** Scroll past the 60 % threshold so the nav header becomes interactive. */
function scrollNavIntoView() {
  Object.assign(window, { scrollY: 1000, innerHeight: 800 });
  window.dispatchEvent(new Event('scroll'));
}

/** Create stub section elements so handleClick can querySelector them. */
function createSectionStubs() {
  ['about', 'reviews', 'author', 'buy'].forEach((id) => {
    if (!document.getElementById(id)) {
      const el = document.createElement('section');
      el.id = id;
      document.body.appendChild(el);
    }
  });
}

function cleanupSectionStubs() {
  ['about', 'reviews', 'author', 'buy'].forEach((id) => {
    document.getElementById(id)?.remove();
  });
}

/** Open the mobile overlay by clicking the hamburger button. */
async function openOverlay(user: ReturnType<typeof userEvent.setup>) {
  const hamburger = screen.getByRole('button', { name: /open menu/i });
  await user.click(hamburger);
}

// ── test suite ────────────────────────────────────────────────────────────────

describe('StickyNav', () => {
  beforeEach(() => {
    // Default: reduced motion OFF, normal behaviour
    vi.mocked(useReducedMotion).mockReturnValue(false);
    createSectionStubs();
  });

  afterEach(() => {
    cleanupSectionStubs();
  });

  // ── Focus trap ──────────────────────────────────────────────────────────────

  describe('focus trap', () => {
    it('moves focus to the first link when the overlay opens', async () => {
      const user = userEvent.setup();
      render(<StickyNav />);
      act(() => scrollNavIntoView());

      await openOverlay(user);

      await waitFor(() => {
        expect(document.activeElement).toHaveAttribute('href', '#about');
      });
    });

    it('wraps Tab forward from the last link to the first', async () => {
      const user = userEvent.setup();
      render(<StickyNav />);
      act(() => scrollNavIntoView());

      await openOverlay(user);

      // Move focus to the last overlay link (Buy)
      const links = screen.getAllByRole('link', { hidden: false });
      const overlayLinks = links.filter((l) => l.closest('#mobile-nav-overlay'));
      const lastLink = overlayLinks[overlayLinks.length - 1];
      act(() => lastLink.focus());

      await user.tab();

      expect(document.activeElement).toHaveAttribute('href', '#about');
    });

    it('wraps Shift+Tab backward from the first link to the last', async () => {
      const user = userEvent.setup();
      render(<StickyNav />);
      act(() => scrollNavIntoView());

      await openOverlay(user);

      // Focus is already on the first link after open
      await waitFor(() => {
        expect(document.activeElement).toHaveAttribute('href', '#about');
      });

      await user.tab({ shift: true });

      expect(document.activeElement).toHaveAttribute('href', '#buy');
    });
  });

  // ── Escape key ──────────────────────────────────────────────────────────────

  describe('Escape key', () => {
    it('closes the overlay when Escape is pressed', async () => {
      const user = userEvent.setup();
      render(<StickyNav />);
      act(() => scrollNavIntoView());

      await openOverlay(user);

      // Confirm it is open
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('returns focus to the hamburger button after Escape', async () => {
      const user = userEvent.setup();
      render(<StickyNav />);
      act(() => scrollNavIntoView());

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await openOverlay(user);

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(document.activeElement).toBe(hamburger);
      });
    });

    it('returns focus to the hamburger button after the button is clicked to close', async () => {
      const user = userEvent.setup();
      render(<StickyNav />);
      act(() => scrollNavIntoView());

      await openOverlay(user);

      const hamburger = screen.getByRole('button', { name: /close menu/i });
      await user.click(hamburger);

      await waitFor(() => {
        expect(document.activeElement).toBe(screen.getByRole('button', { name: /open menu/i }));
      });
    });
  });

  // ── prefers-reduced-motion ──────────────────────────────────────────────────

  describe('prefers-reduced-motion', () => {
    it('calls scrollIntoView with behavior: smooth when reduced motion is OFF', async () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      const user = userEvent.setup();
      render(<StickyNav />);
      act(() => scrollNavIntoView());

      await openOverlay(user);

      const aboutLink = screen
        .getAllByRole('link', { hidden: true })
        .find((l) => l.getAttribute('href') === '#about')!;

      await user.click(aboutLink);

      await waitFor(() => {
        const stub = vi.mocked(window.HTMLElement.prototype.scrollIntoView);
        expect(stub).toHaveBeenCalledWith(
          expect.objectContaining({ behavior: 'smooth' }),
        );
      });
    });

    it('calls scrollIntoView with behavior: instant when reduced motion is ON', async () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);
      setReducedMotion(true);

      const user = userEvent.setup();
      render(<StickyNav />);
      act(() => scrollNavIntoView());

      await openOverlay(user);

      const aboutLink = screen
        .getAllByRole('link', { hidden: true })
        .find((l) => l.getAttribute('href') === '#about')!;

      await user.click(aboutLink);

      await waitFor(() => {
        const stub = vi.mocked(window.HTMLElement.prototype.scrollIntoView);
        expect(stub).toHaveBeenCalledWith(
          expect.objectContaining({ behavior: 'instant' }),
        );
      });
    });
  });
});
