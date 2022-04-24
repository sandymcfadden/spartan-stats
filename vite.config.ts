import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const customHeadersPlugin = () => ({
  name: "custom-headers-plugin",
  // @ts-ignore
  configureServer(server) {
    // @ts-ignore
    server.middlewares.use((_, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "env",
  build: {
    emptyOutDir: true,
  },

  esbuild: {
    jsxFactory: `jsx`,
  },

  server: {
    port: 5000,
    watch: {
      ignored: [".git", "node_modules", "**/*.test.*"],
    },
  },

  plugins: [react(), customHeadersPlugin()],
});
