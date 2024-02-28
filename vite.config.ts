import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: '',
  experimental: {
    renderBuiltUrl(filename) {
      return {
        runtime: `(typeof window === 'undefined' ? '' : window.__REMIX_PUBLIC_PATH__) + ${JSON.stringify(`/assets/${filename.replace(/(\/?assets)?\//, '')}`)}`,
      }
    }
  },
  plugins: [remix({ ssr: false }), tsconfigPaths()],
});
