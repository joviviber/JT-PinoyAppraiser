import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: The base path must match your GitHub repository name exactly.
  // This ensures assets are loaded from /JT-PinoyAppraiser/assets/ instead of /assets/
  base: '/JT-PinoyAppraiser/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});