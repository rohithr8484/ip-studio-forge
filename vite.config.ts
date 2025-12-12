import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Stub native modules that can't be built in browser environment
      "usb": path.resolve(__dirname, "./src/lib/empty-module.ts"),
    },
  },
  optimizeDeps: {
    exclude: ["usb"],
  },
  build: {
    rollupOptions: {
      external: ["usb"],
    },
  },
}));
