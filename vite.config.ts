import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'apps/dashboard/src'),
      '@components': path.resolve(__dirname, 'apps/dashboard/src/components'),
      '@pages': path.resolve(__dirname, 'apps/dashboard/src/pages'),
      '@utils': path.resolve(__dirname, 'apps/dashboard/src/utils'),
      '@hooks': path.resolve(__dirname, 'apps/dashboard/src/hooks'),
      '@store': path.resolve(__dirname, 'apps/dashboard/src/store'),
      '@styles': path.resolve(__dirname, 'apps/dashboard/src/styles'),
    },
  },
  server: {
    port: 4200,
    host: 'localhost',
  },
});
