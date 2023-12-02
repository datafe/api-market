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
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/app': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/user': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  },
});
