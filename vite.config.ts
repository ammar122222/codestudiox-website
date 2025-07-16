// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,       // ↔ "0.0.0.0" also works; true is shorthand
    port: 8080,       // will try 8080 first, then 8081, 8082...
    strictPort: false // allow auto‑bump if 8080 in use (default)
  },
  plugins: [
    react(),
    ...(mode === "development" ? [componentTagger()] : [])
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
}));
