import { type ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

import heroEstate from '@assets/generated_images/hero-estate.jpg';
import stairwell from '@assets/generated_images/stairwell.jpg';
import asphalt from '@assets/ChatGPT_Image_Aug_9,_2026,_03_01_38_PM_1786253514550.png';
import windowImg from '@assets/generated_images/window.jpg';
import rooftop from '@assets/ChatGPT_Image_Aug_10,_2026,_05_05_14_AM_1786304514365.png';
import dragonfly from '@assets/ChatGPT_Image_Aug_9,_2026,_03_06_56_PM_1786253850408.png';
import coverImage from '@assets/insect-kin_2_1786244795412.jpg';
import darkCribLogo from '@assets/Dark_Crib_Publishing_1_1786329845958.jpg';
import authorPhoto from '@assets/Paper_231_1786331879589.jpg';

// ─── Insect SVGs ────────────────────────────────────────────────────────────

const INSECT_RED = 'hsl(4 82% 46%)';

/** Top-down dragonfly silhouette */
function DragonflySVG({ size = 220, opacity = 0.92 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.65}
      viewBox="0 0 300 495"
      fill={INSECT_RED}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Compound eyes */}
      <ellipse cx="120" cy="30" rx="20" ry="17" />
      <ellipse cx="180" cy="30" rx="20" ry="17" />
      {/* Head bridge */}
      <ellipse cx="150" cy="34" rx="18" ry="14" />
      {/* Thorax */}
      <ellipse cx="150" cy="76" rx="22" ry="28" />
      {/* ── Wings ── */}
      {/* Upper wings — large, sweeping */}
      <path d="M128 62 C95 44 35 22 6 52 C-8 80 22 122 68 116 C100 112 122 94 128 84 Z" />
      <path d="M172 62 C205 44 265 22 294 52 C308 80 278 122 232 116 C200 112 178 94 172 84 Z" />
      {/* Lower wings — slightly smaller */}
      <path d="M130 88 C100 76 42 66 16 88 C2 106 30 140 72 134 C102 128 126 112 130 100 Z" />
      <path d="M170 88 C200 76 258 66 284 88 C298 106 270 140 228 134 C198 128 174 112 170 100 Z" />
      {/* ── Abdomen — segmented, tapering ── */}
      <path d="M133 102 L167 102 L169 128 Q150 136 131 128 Z" />
      <ellipse cx="150" cy="143" rx="17" ry="14" />
      <ellipse cx="150" cy="167" rx="15" ry="13" />
      <ellipse cx="150" cy="190" rx="13" ry="12" />
      <ellipse cx="150" cy="211" rx="11" ry="10" />
      <ellipse cx="150" cy="231" rx="9"  ry="9"  />
      <ellipse cx="150" cy="249" rx="7.5" ry="8" />
      <ellipse cx="150" cy="266" rx="6"  ry="7"  />
      <ellipse cx="150" cy="281" rx="5"  ry="6.5"/>
      <ellipse cx="150" cy="295" rx="4"  ry="5.5"/>
      <ellipse cx="150" cy="308" rx="3"  ry="5"  />
      <path d="M147 312 L153 312 L152 330 L148 330 Z" />
      {/* ── Legs ── */}
      <line x1="130" y1="72" x2="82"  y2="100" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="128" y1="82" x2="78"  y2="112" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="128" y1="92" x2="80"  y2="124" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="170" y1="72" x2="218" y2="100" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="172" y1="82" x2="222" y2="112" stroke={INSECT_RED} strokeWidth="3" fill="none" />
      <line x1="172" y1="92" x2="220" y2="124" stroke={INSECT_RED} strokeWidth="3" fill="none" />
    </svg>
  );
}

/** Small housefly / beetle silhouette */
function InsectFlySVG({ size = 48, opacity = 0.88 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 80 104"
      fill={INSECT_RED}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Head */}
      <ellipse cx="40" cy="14" rx="14" ry="11" />
      {/* Thorax */}
      <ellipse cx="40" cy="36" rx="13" ry="16" />
      {/* Wings */}
      <path d="M27 28 C10 18 2 8 8 22 C14 36 26 38 27 32 Z" />
      <path d="M53 28 C70 18 78 8 72 22 C66 36 54 38 53 32 Z" />
      <path d="M28 38 C12 30 4 24 10 36 C16 48 28 48 28 42 Z" />
      <path d="M52 38 C68 30 76 24 70 36 C64 48 52 48 52 42 Z" />
      {/* Abdomen */}
      <ellipse cx="40" cy="58" rx="11" ry="12" />
      <ellipse cx="40" cy="76" rx="8"  ry="9"  />
      <ellipse cx="40" cy="91" rx="5"  ry="6"  />
      {/* Legs */}
      <line x1="27" y1="34" x2="8"  y2="46" stroke={INSECT_RED} strokeWidth="2" fill="none" />
      <line x1="27" y1="40" x2="6"  y2="54" stroke={INSECT_RED} strokeWidth="2" fill="none" />
      <line x1="53" y1="34" x2="72" y2="46" stroke={INSECT_RED} strokeWidth="2" fill="none" />
      <line x1="53" y1="40" x2="74" y2="54" stroke={INSECT_RED} strokeWidth="2" fill="none" />
    </svg>
  );
}

/**
 * FloatAnim — CSS keyframe floating animation wrapper
 *
 * WHY CSS KEYFRAMES INSTEAD OF FRAMER MOTION:
 * The hero section renders 20+ insect instances simultaneously. Framer Motion
 * drives animations on the JS main thread, which causes per-frame overhead that
 * compounds badly at that count (jank, dropped frames, compositor pressure).
 * CSS keyframe animations run entirely on the browser's compositor thread,
 * costing zero JS per frame regardless of how many instances are active.
 *
 * DO NOT replace this with <motion.div animate={...}> or useAnimate().
 * Even a small Framer Motion refactor here will reintroduce the compositor
 * pressure that was deliberately removed.
 *
 * HOW THE PARAMETERISATION WORKS:
 * Animation values that differ per instance (yRange, rotRange, baseRotation)
 * are passed as CSS custom properties on the element's inline style
 * (--base-rot, --y-neg, --rot-pos, --rot-neg). The @keyframes insect-float
 * rule (defined in index.css) reads those properties so each insect can have
 * unique motion without separate @keyframes declarations.
 *
 * The 2 s opacity delay on mount prevents jitter while the hero image loads
 * on slow connections.
 */
function FloatAnim({
  children,
  duration = 7,
  delay = 0,
  yRange = 14,
  rotRange = 3,
  baseRotation = 0,
  className = '',
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
  yRange?: number;
  rotRange?: number;
  baseRotation?: number;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const [tabHidden, setTabHidden] = useState(
    () => typeof document !== 'undefined' && document.visibilityState === 'hidden',
  );

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setTabHidden(document.visibilityState === 'hidden');
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return (
    <div
      className={`absolute pointer-events-none select-none insect-float ${className}`}
      style={{
        opacity: ready ? 1 : 0,
        transition: ready ? 'opacity 0.8s ease-out' : 'none',
        willChange: 'transform',
        // CSS custom properties consumed by @keyframes insect-float
        '--base-rot': `${baseRotation}deg`,
        '--y-neg': `-${yRange}px`,
        '--rot-pos': `${baseRotation + rotRange}deg`,
        '--rot-neg': `${baseRotation - rotRange}deg`,
        animation: ready
          ? `insect-float ${duration}s ${delay}s ease-in-out infinite`
          : 'none',
        animationPlayState: tabHidden ? 'paused' : 'running',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

// ─── Utility components ──────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.1 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

// ─── Sticky Nav ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Author',  href: '#author'  },
  { label: 'Buy',     href: '#buy'     },
] as const;

function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs for focus management
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Track whether the overlay was ever opened so we only return focus after a real close
  const wasOpenRef = useRef(false);

  // Respect prefers-reduced-motion system setting
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      // Show nav after 60 % of viewport height has been scrolled past
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close overlay on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Focus management: trap focus inside overlay while open; return to trigger on close
  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true;
      // Move focus to the first link in the overlay
      const firstLink = overlayRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();

      // Tab / Shift+Tab trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        const focusables = Array.from(
          overlayRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? [],
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }
    // Return focus to the hamburger trigger when the overlay closes
    if (wasOpenRef.current) {
      triggerRef.current?.focus();
    }
    return undefined;
  }, [menuOpen]);

  // Track which section is in view
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the first entry that is intersecting, prioritising the one
        // closest to the top of the viewport
        const intersecting = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      // Small delay so overlay can start closing before scroll;
      // use instant scroll when the user prefers reduced motion
      setTimeout(
        () => target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' }),
        60,
      );
    }
  };

  // Transition helpers that collapse to instant when reduced-motion is preferred
  const navTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const };
  const barTransition = reducedMotion ? { duration: 0 } : { duration: 0.25 };
  const midBarTransition = reducedMotion ? { duration: 0 } : { duration: 0.15 };
  const overlayTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };

  return (
    <>
      <motion.header
        aria-label="Section navigation"
        initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : (reducedMotion ? 0 : -8) }}
        transition={navTransition}
        style={{
          pointerEvents: visible ? 'auto' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: '1px solid hsl(var(--border))',
          backgroundColor: 'hsl(var(--background) / 0.85)',
          backdropFilter: 'blur(12px) saturate(0.9)',
          WebkitBackdropFilter: 'blur(12px) saturate(0.9)',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-11">
          {/* Brand mark — left */}
          <span
            className="font-mono text-[10px] uppercase tracking-[0.25em] shrink-0"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Insect Kin
          </span>

          {/* Hamburger button — only on screens < 480 px */}
          <button
            ref={triggerRef}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            onClick={() => setMenuOpen(o => !o)}
            className="flex flex-col justify-center items-center gap-[5px] w-8 h-8 shrink-0 ml-4 max-[479px]:flex min-[480px]:hidden"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={barTransition}
              className="block w-5 h-[1px] bg-current origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={midBarTransition}
              className="block w-5 h-[1px] bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={barTransition}
              className="block w-5 h-[1px] bg-current origin-center"
            />
          </button>

          {/* Links — horizontally scrollable on mobile ≥480px, static row on desktop; hidden < 480px */}
          <div className="hidden min-[480px]:flex items-center gap-1 overflow-x-auto no-scrollbar ml-4">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeId === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 transition-colors duration-200"
                  style={{
                    color: isActive
                      ? 'hsl(var(--foreground))'
                      : 'hsl(var(--muted-foreground))',
                    borderBottom: isActive
                      ? '1px solid hsl(var(--primary))'
                      : '1px solid transparent',
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </nav>
      </motion.header>

      {/* Full-screen overlay menu — mobile only (< 480 px) */}
      <motion.div
        ref={overlayRef}
        id="mobile-nav-overlay"
        role={menuOpen ? 'dialog' : undefined}
        aria-modal={menuOpen ? true : undefined}
        aria-label={menuOpen ? 'Navigation menu' : undefined}
        aria-hidden={!menuOpen}
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: 'auto' as const } : { opacity: 0, pointerEvents: 'none' as const }}
        transition={overlayTransition}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 49,
          backgroundColor: 'hsl(var(--background))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0',
        }}
        className="min-[480px]:hidden"
      >
        {/* Subtle border top that aligns with the nav bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '44px',
            borderBottom: '1px solid hsl(var(--border))',
          }}
        />
        <nav className="flex flex-col items-center gap-0 w-full">
          {NAV_LINKS.map(({ label, href }, i) => {
            const isActive = activeId === href.slice(1);
            return (
              <motion.a
                key={href}
                href={href}
                // Hidden from keyboard when the overlay is not open
                tabIndex={menuOpen ? 0 : -1}
                onClick={(e) => handleClick(e, href)}
                initial={false}
                animate={
                  menuOpen
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: reducedMotion ? 0 : 12 }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.3, delay: menuOpen ? i * 0.06 : 0, ease: [0.25, 0.1, 0.25, 1] }
                }
                className="w-full text-center font-mono uppercase tracking-[0.3em] py-6 border-b transition-colors duration-200"
                style={{
                  fontSize: '0.9rem',
                  borderColor: 'hsl(var(--border))',
                  color: isActive
                    ? 'hsl(var(--foreground))'
                    : 'hsl(var(--muted-foreground))',
                  backgroundColor: isActive
                    ? 'hsl(var(--background) / 0.6)'
                    : 'transparent',
                }}
              >
                {label}
                {isActive && (
                  <span
                    aria-hidden
                    style={{
                      display: 'inline-block',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'hsl(var(--primary))',
                      marginLeft: '10px',
                      verticalAlign: 'middle',
                    }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
}

// ─── Share Buttons ───────────────────────────────────────────────────────────

const SHARE_URL  = 'https://insect-kin.replit.app/';
const SHARE_TEXT = 'Something is growing beneath Ashbrook Court. Insect Kin by Matthew Tait — available now.';

function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  const btnClass =
    'inline-flex items-center justify-center gap-2 bg-transparent text-foreground font-mono text-xs uppercase tracking-[0.2em] px-5 py-3 border border-border hover:border-foreground transition-colors duration-300 whitespace-nowrap';

  return (
    <div className="flex flex-col items-center md:items-start gap-3 mt-8 md:mt-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Share</p>
      <div className="flex flex-wrap gap-3">
        {/* X / Twitter */}
        <a
          href={twitterHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X / Twitter"
          className={btnClass}
        >
          {/* X logo mark */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X&nbsp;/&nbsp;Twitter
        </a>

        {/* Facebook */}
        <a
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className={btnClass}
        >
          {/* Facebook f mark */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.791-4.697 4.533-4.697 1.313 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.278h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
          </svg>
          Facebook
        </a>

        {/* Copy link */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy page link"
          className={btnClass}
        >
          {copied ? (
            <>
              {/* Checkmark */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              {/* Link icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
    <StickyNav />
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">

      {/* 1. HERO */}
      <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 overflow-hidden">
            <ParallaxImage src={heroEstate} alt="Ashbrook Court at night" className="w-full h-full" />
            <div className="absolute inset-0" style={{ backgroundColor: 'hsl(80 55% 10%)', mixBlendMode: 'multiply', opacity: 0.55 }} />
            <div className="absolute inset-0" style={{ backgroundColor: 'transparent', backdropFilter: 'saturate(0.4) hue-rotate(20deg)' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        </div>

        {/* Insects — hero */}
        {/* Large dragonfly hovering upper-right — hidden on mobile to avoid text overlap */}
        <FloatAnim baseRotation={-18} duration={8} delay={0} yRange={16} className="top-[8%] right-[-2%] z-20 hidden sm:block">
          <DragonflySVG size={240} opacity={0.90} />
        </FloatAnim>
        {/* Small dragonfly, lower-left — kept on mobile, small enough */}
        <FloatAnim baseRotation={30} duration={6} delay={1.5} yRange={10} className="bottom-[20%] left-[4%] z-20">
          <DragonflySVG size={90} opacity={0.80} />
        </FloatAnim>
        {/* Tiny fly, mid-right */}
        <FloatAnim baseRotation={-5} duration={5} delay={3} yRange={8} className="top-[42%] right-[8%] z-20">
          <InsectFlySVG size={38} opacity={0.75} />
        </FloatAnim>

        <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="w-full"
          >
            {/* clamp: min 3rem so "INSECT KIN" always fits on mobile; 13vw tracks viewport; max 16rem at desktop */}
            <h1 className="font-serif tracking-wide uppercase leading-none w-full"
                style={{ fontSize: 'clamp(3rem, 13vw, 16rem)', color: 'hsl(42 30% 88%)' }}>
              Insect Kin
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mt-4">
              Matthew Tait
            </p>
          </motion.div>
          {/* ── Hero tagline ──────────────────────────────────────────────────────
              Replace the string below with the final one-line tagline.
              font-sans = Lora in this project's token map; italic keeps it
              subdued against the bold title above.
          ─────────────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            <p className="font-sans italic text-base md:text-xl tracking-wide mt-6"
               style={{ color: 'hsl(42 20% 60%)' }}>
              {/* TODO: replace with your final tagline */}
              Something is growing beneath Ashbrook Court.
            </p>
          </motion.div>
          {/* ── Hero CTA ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href="https://www.amazon.com.au/Insect-Kin-Matthew-Tait/dp/B0G4GZLPTM/ref=tmm_pap_swatch_0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.25em] px-8 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Buy Paperback
            </a>
            <a
              href="#buy"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-block bg-transparent text-foreground font-mono text-xs uppercase tracking-[0.25em] px-8 py-3.5 border border-border hover:border-foreground transition-colors duration-300"
            >
              All Editions ↓
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 2. THE BLURB */}
      <section id="about" className="py-24 md:py-48 px-6 bg-background relative">
        {/* Dragonfly bleeding in from top-right — hidden on mobile */}
        <FloatAnim baseRotation={12} duration={9} delay={0.5} yRange={18} className="-top-16 right-[1%] z-10 hidden sm:block">
          <DragonflySVG size={180} opacity={0.88} />
        </FloatAnim>
        {/* Tiny fly bottom-left — kept on mobile */}
        <FloatAnim baseRotation={-25} duration={5.5} delay={2} yRange={8} className="bottom-12 left-[6%] z-10">
          <InsectFlySVG size={34} opacity={0.72} />
        </FloatAnim>

        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn>
            <div className="mb-12">
              <div className="h-[1px] w-12 mb-8" style={{ backgroundColor: 'hsl(var(--ochre))' }} />
              <p className="text-sm font-sans uppercase tracking-widest font-semibold" style={{ color: 'hsl(var(--ochre))' }}>
                A claustrophobic supernatural horror novella from award-winning author Matthew Tait.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-2xl md:text-5xl font-serif italic leading-snug text-foreground mb-8">
              At the height of a global pandemic, Lucas and Vanessa awake in darkness.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-base md:text-2xl font-sans text-muted-foreground font-light leading-relaxed mb-12">
              They've been stolen from their lives and dumped inside Ashbrook Court – an abandoned social housing estate in Adelaide long since left to rot. As memories return and the body count rises, they begin to uncover the truth about Ashbrook Court.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-3xl md:text-6xl font-serif italic tracking-wide text-primary">
              Something is waiting.
            </p>
          </FadeIn>
          <FadeIn delay={0.8}>
            <p className="text-2xl md:text-4xl font-serif italic tracking-wide text-primary/70 mt-4">
              Something that wants to hatch.
            </p>
          </FadeIn>
          <FadeIn delay={1.0}>
            <p className="mt-8 font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
              INSECT KIN is a descent into isolation, madness, and infestation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3. EXCERPT */}
      <section className="py-24 md:py-32 px-6 border-t border-border relative"
               style={{ backgroundColor: 'hsl(30 8% 5%)' }}>
        <FloatAnim duration={9} delay={1}>
          <div className="absolute top-16 right-12 opacity-40">
            <DragonflySVG size={90} />
          </div>
        </FloatAnim>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">Excerpt</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="border-l-2 border-primary pl-8 space-y-5">
              {[
                `A naked male was supported by his knees, both hands splayed forward as though in the process of taking a dive.`,
                `The barrel end of a shotgun protruded from his ass.`,
                `Staring, it was easy for me to ascertain how death had been delivered. After inserting the gun into his anus, someone had pulled the trigger.`,
                `If not for the unknown meds in my system, I might have lost it there and then. Because this was the type of thing you heard rumor of, whispers of some mythical gore video.`,
                `Gore.`,
                `It took me a few moments to process that particular word was written on a dirty wall above the oven. Written in blood.`,
                `Another was next to it. The letters still dripping, GORE HOUND was spelled out in this slaughterhouse of an apartment.`,
                `'That's … I recognize Joseph,' said Vanessa. Despite her initial reaction, there was now a note of calm in her voice.`,
                `I took a long look at the cadaver and realized she was right. Once upon a time, Joseph O'Brien had also lived within Ashbrook Court. During my own tenure, I recalled exchanging pleasantries with the man. And his reputation was prolific. A casual drug dealer. Someone into obscure pornography. In addition, he possessed a hardcore predilection for real life gore videos.`,
                `Inside the murky realm of Australian social housing, such personality types were not overly uncommon.`,
                `The method of death, I noted, was akin to one of the shock videos he enjoyed so much. Unable to look away, I noticed shotgun pellets had — having travelled through his lower extremities — exited through his ribcage.`,
              ].map((para, i) => (
                <p key={i} className="font-serif italic text-base md:text-lg leading-relaxed text-foreground/85">
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/50">
              Content note: extreme horror. Not for the faint-hearted.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 4. REVIEWS */}
      <section id="reviews" className="py-24 md:py-32 px-6 border-t border-border relative"
               style={{ backgroundColor: 'hsl(38 10% 7%)' }}>
        {/* Small insects in the margins — fine on all screen sizes */}
        <FloatAnim baseRotation={12} duration={7} delay={1} yRange={9} className="top-10 left-6 z-10">
          <InsectFlySVG size={32} opacity={0.68} />
        </FloatAnim>
        <FloatAnim baseRotation={-20} duration={6} delay={0} yRange={8} className="bottom-10 right-8 z-10">
          <InsectFlySVG size={28} opacity={0.60} />
        </FloatAnim>

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-16 text-center">
              Readers on Insect Kin
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Review 1 */}
            <FadeIn delay={0.1}>
              <div className="flex flex-col h-full border-l-2 pl-6 md:pl-8" style={{ borderColor: 'hsl(var(--primary))' }}>
                <span className="font-serif text-6xl leading-none mb-6" style={{ color: 'hsl(var(--primary))', opacity: 0.6 }}>&ldquo;</span>
                <p className="font-sans text-base md:text-lg leading-relaxed text-foreground font-normal flex-1">
                  Wyndham's <em>The Day of the Triffids</em> meets Ballard's <em>High-Rise</em> played out in suburban Adelaide. While the title is taken from a song by Bush, this horror story had me hearing <em>Come to Daddy</em> by Aphex Twin accompanied by the fluttering of countless chitin wings. Against the backdrop of the pandemic, Matthew Tait offers us this nightmarish tale set in an abandoned housing estate undergoing a metamorphosis.
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-8">
                  — Amazon Review
                </p>
              </div>
            </FadeIn>

            {/* Review 2 */}
            <FadeIn delay={0.25}>
              <div className="flex flex-col h-full border-l-2 pl-6 md:pl-8" style={{ borderColor: 'hsl(var(--primary))' }}>
                <span className="font-serif text-6xl leading-none mb-6" style={{ color: 'hsl(var(--primary))', opacity: 0.6 }}>&ldquo;</span>
                <p className="font-sans text-base md:text-lg leading-relaxed text-foreground font-normal flex-1">
                  Matthew Tait creates his own version of the Candyman in this short but powerful story about a supernatural executioner of Adelaide's social underbelly. Tait draws shades of Bentley Little and Richard Laymon for his violent and gritty tale, which for the most part feels strangely akin to Adelaide's own shocking true crime past.
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-8">
                  — Amazon Review
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. ASHBROOK COURT */}
      <section
        className="py-24 px-6 border-t border-border relative"
        style={{ backgroundColor: 'hsl(var(--section-forest))' }}
      >
        {/* Two small flies — fine on mobile */}
        <FloatAnim baseRotation={15} duration={6} delay={0} yRange={7} className="top-16 right-8 z-10">
          <InsectFlySVG size={44} opacity={0.82} />
        </FloatAnim>
        <FloatAnim baseRotation={-35} duration={7} delay={2.5} yRange={9} className="bottom-20 left-10 z-10">
          <InsectFlySVG size={32} opacity={0.70} />
        </FloatAnim>
        {/* Medium dragonfly mid-right — hidden on mobile, would overlap single-column text */}
        <FloatAnim baseRotation={8} duration={8.5} delay={1} yRange={12} className="top-1/2 right-4 z-10 hidden sm:block">
          <DragonflySVG size={100} opacity={0.78} />
        </FloatAnim>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <FadeIn>
            <ParallaxImage src={stairwell} alt="A claustrophobic concrete stairwell"
              className="aspect-[4/5] w-full bg-muted border border-border" />
          </FadeIn>
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                ASHBROOK COURT — UNIT 01
              </h2>
              <h3 className="text-3xl md:text-5xl font-serif font-medium tracking-wide mb-8"
                  style={{ color: 'hsl(42 25% 86%)' }}>
                Ashbrook Court
              </h3>
              <div className="space-y-6 text-base md:text-lg font-sans text-muted-foreground font-light leading-relaxed">
                <p>Ageing apartment blocks. Concrete, brick, asphalt. Corridors that smell of damp and cheap cleaning chemicals.</p>
                <p>This isn't a gothic castle. There are no ancient curses here. Just neglected gardens, rusted fences, and weeds forcing their way through cracked concrete under the oppressive Australian heat.</p>
                <p>The ordinariness is the trap. The familiar suburban textures are the walls of the cage.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. 3:00 AM — most ominous, largest dragonfly */}
      <section
        className="py-20 md:py-32 px-6 border-y border-border relative overflow-visible"
        style={{ backgroundColor: 'hsl(var(--section-ominous))' }}
      >
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none translate-x-1/2 -translate-y-1/3"
             style={{ backgroundColor: 'hsl(38 40% 18% / 0.5)' }} />

        {/* Dominant dragonfly, left edge — hidden on mobile where it covers the prose */}
        <FloatAnim baseRotation={-28} duration={10} delay={0} yRange={20} rotRange={4} className="top-8 -left-8 z-10 hidden md:block">
          <DragonflySVG size={280} opacity={0.94} />
        </FloatAnim>
        {/* Small fly, right side — fine on all screens */}
        <FloatAnim baseRotation={20} duration={5} delay={1.8} yRange={7} className="bottom-16 right-10 z-10">
          <InsectFlySVG size={40} opacity={0.78} />
        </FloatAnim>
        {/* Medium dragonfly, bottom-right bleeding into next section — hidden on mobile */}
        <FloatAnim baseRotation={-10} duration={8} delay={3} yRange={14} className="-bottom-16 right-[3%] z-10 hidden sm:block">
          <DragonflySVG size={150} opacity={0.82} />
        </FloatAnim>

        {/* Full-width rooftop image above the prose */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-16 relative z-10">
          <FadeIn>
            <ParallaxImage
              src={rooftop}
              alt="The rooftop of Ashbrook Court at night"
              className="w-full aspect-[16/9] md:aspect-[21/9] border border-border"
            />
          </FadeIn>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">NOTICE — LEVEL 3</h2>
              <h3 className="text-3xl md:text-5xl font-serif font-medium tracking-wide mb-8"
                  style={{ color: 'hsl(42 22% 82%)' }}>
                3:00 AM
              </h3>
              <div className="space-y-5 md:space-y-6 text-base md:text-lg font-sans text-muted-foreground font-light leading-relaxed">
                <p>The estate is quiet now.</p>
                <p>The windows are dark. The corridors are empty. Weeds have pushed through the concrete and the buildings have begun to surrender to time.</p>
                <p>But abandonment is not the same thing as death.</p>
                <p>Something remains beneath Ashbrook Court.</p>
                <p>Something has survived the silence.</p>
                <p className="text-foreground font-medium">Something has been growing in the dark.</p>
              </div>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <FadeIn delay={0.2}>
              <ParallaxImage src={asphalt} alt="Cracked asphalt and dead grass"
                className="aspect-square w-full bg-muted border border-border mt-12" />
            </FadeIn>
            <FadeIn delay={0.4}>
              <ParallaxImage src={windowImg} alt="A single glowing window at night"
                className="aspect-square w-full bg-muted border border-border" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6. SOMETHING IS HATCHING — densest insect section */}
      <section
        className="py-24 md:py-32 px-6 relative"
        style={{ backgroundColor: 'hsl(var(--section-deep))' }}
      >
        {/* Large dragonflies — hidden on mobile, centred text needs breathing room */}
        <FloatAnim baseRotation={8} duration={9} delay={0} yRange={18} className="top-10 right-[3%] z-10 hidden sm:block">
          <DragonflySVG size={200} opacity={0.92} />
        </FloatAnim>
        <FloatAnim baseRotation={-20} duration={7} delay={1.2} yRange={14} className="bottom-16 left-[2%] z-10 hidden sm:block">
          <DragonflySVG size={140} opacity={0.85} />
        </FloatAnim>
        {/* Interior flies hidden on mobile — they sit over the centred prose */}
        <FloatAnim baseRotation={40} duration={5} delay={0.8} yRange={8} className="top-1/3 left-[10%] z-10 hidden sm:block">
          <InsectFlySVG size={50} opacity={0.88} />
        </FloatAnim>
        <FloatAnim baseRotation={-12} duration={4.5} delay={2.5} yRange={6} className="top-1/2 right-[22%] z-10 hidden sm:block">
          <InsectFlySVG size={36} opacity={0.78} />
        </FloatAnim>
        {/* Bottom-right fly — stays on mobile, well clear of text */}
        <FloatAnim baseRotation={25} duration={6} delay={3.5} yRange={10} className="bottom-8 right-[8%] z-10">
          <InsectFlySVG size={42} opacity={0.80} />
        </FloatAnim>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <FadeIn>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] mb-4"
                style={{ color: 'hsl(var(--iridescent))' }}>
              INCIDENT REPORT — SECTOR 7
            </h2>
            <h3 className="text-3xl md:text-6xl font-serif font-medium tracking-wide mb-12 md:mb-16"
                style={{ color: 'hsl(42 25% 86%)' }}>
              Something is hatching
            </h3>
          </FadeIn>
          <div className="w-full max-w-4xl mb-12 md:mb-16">
            <FadeIn delay={0.2}>
              <ParallaxImage src={dragonfly} alt="A dragonfly on a rusted railing"
                className="aspect-[16/9] md:aspect-[21/9] w-full bg-muted border border-border" />
            </FadeIn>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-lg md:text-2xl font-sans text-muted-foreground font-light max-w-3xl leading-relaxed">
              They are not decorative. They are not beautiful. They watch from the rusted railings and the peeling stairwells. The hum of insects you can't quite locate. The sickening iridescence under a bare bulb.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 7. AUTHOR */}
      <section
        id="author"
        className="py-24 md:py-36 px-6 border-t border-border relative"
        style={{ backgroundColor: 'hsl(var(--section-warm))' }}
      >
        {/* Dragonfly corner — hidden on mobile to avoid overlapping author photo */}
        <FloatAnim baseRotation={-8} duration={8} delay={1} yRange={11} className="top-10 right-6 z-10 hidden sm:block">
          <DragonflySVG size={108} opacity={0.76} />
        </FloatAnim>
        {/* Tiny fly — kept on all screens */}
        <FloatAnim baseRotation={30} duration={5.5} delay={0} yRange={7} className="bottom-12 left-8 z-10">
          <InsectFlySVG size={30} opacity={0.68} />
        </FloatAnim>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start relative z-10">
          <FadeIn>
            <div className="relative">
              <img src={authorPhoto} alt="Matthew Tait"
                className="w-full max-w-xs border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]" />
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mt-4">
                Matthew Tait — Adelaide, South Australia
              </p>
            </div>
          </FadeIn>
          <div className="flex flex-col justify-start lg:pt-4">
            <FadeIn>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">About the Author</h2>
              <h3 className="text-2xl md:text-4xl font-serif font-medium tracking-wide mb-8"
                  style={{ color: 'hsl(42 28% 86%)' }}>
                Matthew Tait
              </h3>
              <div className="space-y-5 font-sans text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                <p>Matthew Tait is an award-winning Australian horror author whose work blends psychological intensity with uncanny, brutal atmosphere. He published his first collection of dark fiction in 2011 and has since built a catalogue of titles praised for their originality and emotional depth.</p>
                <p>His novel <em className="text-foreground font-normal">Deception Pass</em> won the Australasian Shadows Award for Best Novel, an honour for which he has been nominated three times. His short story <em className="text-foreground font-normal">Car Crash Weather</em> received a commendation from the Australian Horror Writers Association in 2006.</p>
                <p>A former horror columnist and lifelong devotee of the genre, Tait writes every draft longhand — in pen and paper — before any manuscript touches a keyboard. A working method that has shaped the deliberate, sentence-level attention his prose is known for.</p>
                <p>He lives and writes in Adelaide, South Australia, and is currently undertaking a full ground-up rewrite of his 2014 novel <em className="text-foreground font-normal">Davey Ribbon</em>.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section
        id="buy"
        className="py-32 md:py-48 px-6 border-t border-border relative flex flex-col items-center text-center overflow-hidden"
        style={{ backgroundColor: 'hsl(var(--section-rust))' }}
      >
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at center, hsl(8 40% 14% / 0.8) 0%, transparent 70%)' }} />

        {/* Flanking dragonflies — hidden on mobile, they'd crowd the cover image */}
        <FloatAnim baseRotation={6} duration={9} delay={0} yRange={16} className="top-8 left-[3%] z-10 hidden sm:block">
          <DragonflySVG size={160} opacity={0.87} />
        </FloatAnim>
        <FloatAnim baseRotation={-14} duration={8} delay={2} yRange={13} className="top-16 right-[2%] z-10 hidden sm:block">
          <DragonflySVG size={120} opacity={0.80} />
        </FloatAnim>
        {/* Small bottom fly — kept on all screens */}
        <FloatAnim baseRotation={18} duration={5} delay={1} yRange={8} className="bottom-16 right-[10%] z-10">
          <InsectFlySVG size={38} opacity={0.74} />
        </FloatAnim>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
          <FadeIn>
            <img src={coverImage} alt="Insect Kin Cover"
              className="w-full max-w-[200px] md:max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-border/30" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-4xl md:text-7xl font-serif tracking-wide mb-4 md:mb-6 uppercase"
                  style={{ color: 'hsl(42 28% 86%)' }}>
                Insect Kin
              </h2>
              <p className="text-lg md:text-xl font-sans text-muted-foreground mb-8 md:mb-12 font-light">
                Available now. Don't look away.
              </p>
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Paperback */}
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Paperback</p>
                  <a href="https://www.amazon.com.au/Insect-Kin-Matthew-Tait/dp/B0G4GZLPTM/ref=tmm_pap_swatch_0"
                     target="_blank" rel="noopener noreferrer"
                     className="inline-block bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-foreground hover:text-background transition-colors duration-300 text-center">
                    Amazon AU
                  </a>
                  <a href="https://www.amazon.com/Insect-Kin-Matthew-Tait/dp/B0G4GZLPTM/ref=tmm_pap_swatch_0"
                     target="_blank" rel="noopener noreferrer"
                     className="inline-block bg-transparent text-foreground font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 border border-border hover:border-foreground transition-colors duration-300 text-center">
                    Amazon US
                  </a>
                </div>
                {/* eBook */}
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">eBook</p>
                  <a href="https://www.amazon.com.au/Insect-Kin-Matthew-Tait-ebook/dp/B0G47SQVG2/?_encoding=UTF8&pd_rd_w=myzgf&content-id=amzn1.sym.7153b2d3-487c-46f2-9cd8-b060e652f2e8&pf_rd_p=7153b2d3-487c-46f2-9cd8-b060e652f2e8&pf_rd_r=355-7962748-1400305&pd_rd_wg=vDNLQ&pd_rd_r=f63a9248-af4f-4647-acb6-09becc57e6fd"
                     target="_blank" rel="noopener noreferrer"
                     className="inline-block bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-foreground hover:text-background transition-colors duration-300 text-center">
                    Amazon AU
                  </a>
                  <a href="https://www.amazon.com/Insect-Kin-Matthew-Tait-ebook/dp/B0G47SQVG2/?_encoding=UTF8&pd_rd_w=H1KLg&content-id=amzn1.sym.f8e88413-4697-42ea-9bf7-b28eb886330d&pf_rd_p=f8e88413-4697-42ea-9bf7-b28eb886330d&pf_rd_r=146-7900009-4224238&pd_rd_wg=TROgF&pd_rd_r=052d5ae5-2cca-453a-b2ba-e6dcbf366acc"
                     target="_blank" rel="noopener noreferrer"
                     className="inline-block bg-transparent text-foreground font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 border border-border hover:border-foreground transition-colors duration-300 text-center">
                    Amazon US
                  </a>
                </div>
              </div>
              <ShareButtons />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border text-center text-sm font-sans text-muted-foreground font-light bg-background relative">
        {/* One last small dragonfly, barely visible */}
        <FloatAnim baseRotation={-5} duration={10} delay={0} yRange={6} className="top-2 right-8 z-10">
          <InsectFlySVG size={26} opacity={0.55} />
        </FloatAnim>
        {/* Author links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 relative z-10">
          {[
            { label: 'Official Site', href: 'https://matthewtaitauthor.com/' },
            { label: 'Goodreads', href: 'https://www.goodreads.com/author/show/5073719.Matthew_Tait' },
            { label: 'Blog', href: 'https://differentmasks.blogspot.com/' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] relative z-10">
          © {new Date().getFullYear()} Matthew Tait. All rights reserved.
        </p>
        <p className="mt-4 opacity-50 relative z-10">The horror is already here.</p>

        <div className="mt-12 flex justify-center relative z-10">
          <img
            src={darkCribLogo}
            alt="Dark Crib Publications"
            className="w-36 md:w-44"
            style={{ mixBlendMode: 'screen', opacity: 0.85 }}
          />
        </div>
      </footer>

    </main>
    </>
  );
}
