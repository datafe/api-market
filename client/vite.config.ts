import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    proxy: {
      '/group': {
        target: 'https://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/api': {
        target: 'https://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/app': {
        target: 'https://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/user': {
        target: 'https://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  },
});
