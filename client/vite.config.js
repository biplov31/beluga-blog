import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/post": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
      "/user": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
      "/home": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
      "/upload": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
  plugins: [react()],
})
