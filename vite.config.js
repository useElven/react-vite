import inject from "@rollup/plugin-inject";
import react from "@vitejs/plugin-react";

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export default async () => {
  const { default: stdLibBrowser } = await import("node-stdlib-browser");
  return {
    resolve: {
      alias: stdLibBrowser,
    },
    optimizeDeps: {
      include: ["buffer", "process"],
    },
    server: {
      host: "localhost",
      port: 3000,
    },
    plugins: [
      react(),
      {
        ...inject({
          global: [
            require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
            "global",
          ],
          process: [
            require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
            "process",
          ],
          Buffer: [
            require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
            "Buffer",
          ],
        }),
        enforce: "post",
      },
    ],
  };
};
