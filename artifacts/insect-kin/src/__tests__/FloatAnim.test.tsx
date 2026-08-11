/**
 * FloatAnim regression guard
 *
 * FloatAnim was deliberately migrated from Framer Motion to CSS keyframes to
 * eliminate per-frame JS overhead from 20+ simultaneous instances.  These tests
 * catch any future regression that reintroduces Framer Motion inside FloatAnim.
 *
 * Two complementary layers:
 *   1. Runtime — render FloatAnim and assert no motion.* element is in the DOM
 *      (framer-motion injects data-framer-* attributes and custom element names
 *      such as "motion.div").
 *   2. Source — read the raw source and assert that no Framer Motion animation
 *      API (motion., useAnimate, useMotionValue, etc.) appears inside the
 *      FloatAnim function body.
 */

import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, vi } from 'vitest';
import { render, container } from '@testing-library/react';
import { act } from 'react';

// FloatAnim is not exported — import the whole module so we can pluck it out.
// We use a named re-export trick: add nothing to the module; instead we extract
// FloatAnim via a targeted render of the HomePage and look only at a subtree.
// Simpler approach: import home.tsx and render the default export, then inspect
// one known insect wrapper.  But FloatAnim is unexported, so we import the
// HomePage default and test via the rendered output.
import HomePage from '../pages/home';

// ── helpers ───────────────────────────────────────────────────────────────────

const SOURCE_PATH = path.resolve(
  import.meta.dirname,
  '..',
  'pages',
  'home.tsx',
);

/**
 * Extract the source text of the FloatAnim function from home.tsx.
 * We slice from `function FloatAnim` up to (but not including) the next
 * top-level function declaration, so we only check FloatAnim's own body.
 */
function extractFloatAnimSource(): string {
  const src = fs.readFileSync(SOURCE_PATH, 'utf8');
  const start = src.indexOf('function FloatAnim(');
  if (start === -1) throw new Error('FloatAnim function not found in home.tsx');

  // Find the next top-level function/const after FloatAnim
  const afterStart = src.indexOf('\nfunction ', start + 1);
  const end = afterStart === -1 ? src.length : afterStart;
  return src.slice(start, end);
}

// ── 1. Source-level guard ─────────────────────────────────────────────────────

describe('FloatAnim source guard', () => {
  it('does not import or use motion.* inside the FloatAnim function body', () => {
    const body = extractFloatAnimSource();

    // motion.<anything> element usage — e.g. <motion.div, motion.span
    expect(body).not.toMatch(/\bmotion\.[a-z]/);
  });

  it('does not use useAnimate inside the FloatAnim function body', () => {
    const body = extractFloatAnimSource();
    expect(body).not.toMatch(/\buseAnimate\b/);
  });

  it('does not use useMotionValue inside the FloatAnim function body', () => {
    const body = extractFloatAnimSource();
    expect(body).not.toMatch(/\buseMotionValue\b/);
  });

  it('does not use useSpring inside the FloatAnim function body', () => {
    const body = extractFloatAnimSource();
    expect(body).not.toMatch(/\buseSpring\b/);
  });

  it('applies animation via the CSS animation property (not Framer Motion)', () => {
    const body = extractFloatAnimSource();
    // The animation value must reference the insect-float keyframe
    expect(body).toMatch(/insect-float/);
  });
});

// ── 2. Runtime DOM guard ──────────────────────────────────────────────────────
// We render the full HomePage (which mounts all FloatAnim instances) and then
// inspect the rendered DOM for any sign of Framer Motion element wrappers.

// Silence the 2 s opacity-reveal timer — we don't need insects to be visible.
vi.useFakeTimers();

describe('FloatAnim runtime DOM guard', () => {
  it('renders no element with a data-framer-* attribute', () => {
    const { baseElement } = render(<HomePage />);

    // Advance past the 2 s reveal timeout so all FloatAnim state has settled
    act(() => { vi.runAllTimers(); });

    // Framer Motion stamps animated elements with data-framer-* attributes
    const framerNodes = baseElement.querySelectorAll('[data-framer-appear-id], [data-framer-component-type], [data-framer-name]');
    expect(framerNodes.length).toBe(0);
  });

  it('renders no motion.* custom element tag inside insect wrappers', () => {
    const { baseElement } = render(<HomePage />);
    act(() => { vi.runAllTimers(); });

    // Framer Motion renders <motion.div> as a regular <div> in jsdom, but it
    // injects a data-projection-id attribute on elements it manages.
    // We check for that attribute on elements that carry the insect-float class
    // (which is the class FloatAnim applies to its root div).
    const insectWrappers = baseElement.querySelectorAll('.insect-float');
    expect(insectWrappers.length).toBeGreaterThan(0); // sanity: wrappers exist

    insectWrappers.forEach((el) => {
      expect(el).not.toHaveAttribute('data-projection-id');
      expect(el.tagName.toLowerCase()).toBe('div'); // plain div, not a motion element
    });
  });

  it('applies the CSS animation string (not Framer Motion) on insect wrappers after reveal', () => {
    const { baseElement } = render(<HomePage />);
    act(() => { vi.runAllTimers(); });

    const insectWrappers = Array.from(baseElement.querySelectorAll('.insect-float'));
    expect(insectWrappers.length).toBeGreaterThan(0);

    insectWrappers.forEach((el) => {
      const style = (el as HTMLElement).style;
      // After the 2 s reveal the animation property must be set to insect-float
      expect(style.animation).toMatch(/insect-float/);
    });
  });
});
