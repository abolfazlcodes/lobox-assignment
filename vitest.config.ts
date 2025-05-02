/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: "./setup.ts",
    globals: true,
    reporters: "verbose",
    isolate: true,
    coverage: {
      provider: "v8",
      include: [
        "src/pages/**/*",
        "src/constants/**/*",
        "src/component/**/*",
        "src/hooks/**/*",
      ],
      reporter: ["text", "json", "html", "clover"],
      all: true,
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
});
