import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add alias for "@fortawesome/fontawesome-svg-core"
      "@fortawesome/fontawesome-svg-core": "@fortawesome/fontawesome-svg-core/index.es.js"
    }
  },
  build: {
    rollupOptions: {
      external: ["@fortawesome/fontawesome-svg-core"]
    }
  }
});
