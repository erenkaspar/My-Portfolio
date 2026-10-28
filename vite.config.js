import { defineConfig } from "vite";

// dev server only, site is deployed as static files
export default defineConfig({
  server: {
    port: 3200,
    strictPort: true,
  },
  preview: {
    port: 3200,
    strictPort: true,
  },
});
