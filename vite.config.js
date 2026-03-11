import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 🚨 Dynamic base path for both Netlify and GitHub Pages
  base: process.env.NETLIFY ? "/" : "/poland-odyssey/",
});
