import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    open: '/',
    host: true,
    hmr: {
      clientPort: 3001,
      port: 3001
    },
  },
  plugins: [react()],
})
