import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/logodesign/', // เพิ่มบรรทัดนี้เพื่อให้ตัวโปรเจกต์รู้จัก path บน GitHub Pages
})
