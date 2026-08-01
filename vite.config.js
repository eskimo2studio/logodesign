import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/logodesign/', // สำคัญมาก ต้องมีเครื่องหมาย / ครอบหัวและท้าย
})
