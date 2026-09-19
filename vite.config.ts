import { defineConfig } from 'vite';

export default defineConfig({
  root: 'ui',
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
