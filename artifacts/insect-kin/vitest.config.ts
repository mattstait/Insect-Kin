import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    // Stub all image asset imports so test files don't need real WebP files
    {
      name: 'stub-static-assets',
      resolveId(id) {
        if (/\.(webp|png|jpg|jpeg|gif|svg)$/.test(id)) {
          return '\0stub-asset';
        }
      },
      load(id) {
        if (id === '\0stub-asset') {
          return 'export default "stub-asset"';
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      // Point @assets to the real directory — the stub plugin above intercepts
      // individual .webp requests before they hit the filesystem.
      '@assets': path.resolve(import.meta.dirname, '..', '..', 'attached_assets'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
