/**
 * Single source of truth for Insect Kin book metadata.
 *
 * Both the static <head> (meta tags + JSON-LD via Vite HTML transform) and any
 * React components import from here. Update once → propagates everywhere.
 */
export const BOOK = {
  /** Full page title */
  title: 'Insect Kin — Matthew Tait',
  /** Short book name used in structured data */
  name: 'Insect Kin',
  author: 'Matthew Tait',
  publisher: 'Dark Crib Publishing',
  description:
    'A claustrophobic supernatural horror novella. Stolen from their lives and dumped inside an abandoned estate, Lucas and Vanessa discover something has been growing in the dark.',
  genre: 'Horror',
  language: 'en',
  /**
   * Canonical production URL.
   * Update this when the book gets its own domain or the deployment URL changes.
   */
  siteUrl: 'https://insect-kin.matthewleedstait.repl.co/',
  /**
   * Absolute URL for the Open Graph / Twitter card image.
   * Path is relative to siteUrl; resolved in vite.config.ts.
   */
  ogImagePath: 'og-image.jpg',
} as const;

/** Convenience: full absolute OG image URL derived from siteUrl + ogImagePath */
export const OG_IMAGE_URL = `${BOOK.siteUrl}${BOOK.ogImagePath}`;
