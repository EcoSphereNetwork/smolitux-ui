import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@smolitux/core': path.resolve(__dirname, '../../packages/@smolitux/core/src'),
      '@smolitux/theme': path.resolve(__dirname, '../../packages/@smolitux/theme/src'),
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
