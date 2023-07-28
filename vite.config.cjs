const inject = require("@rollup/plugin-inject");
const react = require("@vitejs/plugin-react");

module.exports = async () => {
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
