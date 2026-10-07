import { defineConfig } from "vitest/config";
import { transformWithOxc } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.includes("node_modules") && id.endsWith(".js") && (code.includes("<") || code.includes("/>"))) {
          return transformWithOxc(code, id, { lang: "jsx" });
        }
      }
    }
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.js"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./")
    }
  }
});
