import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Sửa lỗi: Thay __dirname bằng path.dirname(import.meta.url)
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
