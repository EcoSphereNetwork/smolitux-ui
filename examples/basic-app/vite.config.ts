import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@smolitux/utils': path.resolve(__dirname, '../../packages/@smolitux/utils/src'),
      '@smolitux/ai': path.resolve(__dirname, '../../packages/@smolitux/ai/src'),
    },
  },
});