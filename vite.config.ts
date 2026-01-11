import { defineConfig } from 'vite'
import react from '@vitejs/react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/JT-PinoyAppraiser/', // MUST match your repo name exactly
})
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
