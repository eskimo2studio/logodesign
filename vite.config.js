import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/logodesign/',
  plugins: [react()],
  base: '/logodesign/', // ต้องใส่ชื่อ repository ครอบด้วย / ทั้งหน้าและหลัง
})
