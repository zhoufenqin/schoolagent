import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 部署到 GitHub Pages 子路径时由 CI 设置 VITE_BASE=/schoolagent/
// 本地开发与 Netlify/Vercel 根路径部署用默认 '/'
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
