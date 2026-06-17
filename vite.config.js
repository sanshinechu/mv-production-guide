import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 正式 build 時掛在 GitHub Pages 的子路徑 /mv-production-guide/；
// 本機 dev 仍維持根路徑 /，開發比較方便。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/mv-production-guide/' : '/',
  plugins: [react()],
}))
