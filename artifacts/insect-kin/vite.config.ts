import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import { BOOK, OG_IMAGE_URL } from './src/data/book.ts';

/**
 * Replaces {{BOOK_*}} placeholders in index.html at both dev-serve and build
 * time so meta tags and JSON-LD are always driven by src/data/book.ts.
 */
function bookMetaPlugin(): Plugin {
  const replacements: Record<string, string> = {
    '{{BOOK_TITLE}}':       BOOK.title,
    '{{BOOK_DESCRIPTION}}': BOOK.description,
    '{{BOOK_NAME}}':        BOOK.name,
    '{{BOOK_AUTHOR}}':      BOOK.author,
    '{{BOOK_PUBLISHER}}':   BOOK.publisher,
    '{{BOOK_GENRE}}':       BOOK.genre,
    '{{BOOK_LANGUAGE}}':    BOOK.language,
    '{{BOOK_SITE_URL}}':    BOOK.siteUrl,
    '{{BOOK_OG_IMAGE}}':    OG_IMAGE_URL,
  };

  return {
    name: 'book-meta',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (acc, [placeholder, value]) => acc.replaceAll(placeholder, value),
        html,
      );
    },
  };
}

// PORT is only needed for the dev/preview server (Replit). Default to 3000
// so `vite build` works in CI / Cloudflare Pages without the variable set.
const rawPort = process.env.PORT ?? '3000';
const port = Number(rawPort);

// BASE_PATH defaults to '/' for Cloudflare Pages; Replit sets it explicitly.
const basePath = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base: basePath,
  plugins: [
    bookMetaPlugin(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
