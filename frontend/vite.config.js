import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: false,
    open: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
})
