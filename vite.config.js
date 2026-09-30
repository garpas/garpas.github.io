import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// garpas.github.io 는 사용자 사이트라 루트(/)에 배포된다.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
