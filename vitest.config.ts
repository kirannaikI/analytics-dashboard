import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './apps/dashboard/src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps/dashboard/src'),
      '@components': path.resolve(__dirname, './apps/dashboard/src/components'),
      '@pages': path.resolve(__dirname, './apps/dashboard/src/pages'),
      '@utils': path.resolve(__dirname, './apps/dashboard/src/utils'),
      '@hooks': path.resolve(__dirname, './apps/dashboard/src/hooks'),
      '@store': path.resolve(__dirname, './apps/dashboard/src/store'),
      '@styles': path.resolve(__dirname, './apps/dashboard/src/styles'),
    },
  },
});