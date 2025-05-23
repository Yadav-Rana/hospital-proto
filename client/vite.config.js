import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";
import netlifyPlugin from "./netlify.plugin.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), netlifyPlugin()],
  // Base path for deployment (can be adjusted for different environments)
  base: "/",
  // Build configuration
  build: {
    // Output directory for production build
    outDir: "dist",
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Ensure _redirects file is copied to the dist folder
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Server configuration for development
  server: {
    port: 3000,
    // Enable CORS for all origins
    cors: true,
    // Configure proxy if needed in the future
    proxy: {
      // Example: '/api': 'http://localhost:5000'
    },
  },
});
