import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    host: true,
    https: true,
    watch: {
      usePolling: false,
      useFsEvents: false,
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    basicSsl(),
    tsconfigPaths(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true },
    }),
  ],
  preview: {
    port: 3002,
    https: true,
    host: "localhost",
    strictPort: true,
  },
});
