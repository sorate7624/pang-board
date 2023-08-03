import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
  build: {
    publicDir: 'dist', // 정적 파일의 경로를 지정
  },
});
