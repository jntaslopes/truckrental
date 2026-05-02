import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    css: true,
    environment: "jsdom",
    exclude: [".codex-artifacts/**", "node_modules/**"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    maxWorkers: 1,
    setupFiles: ["./src/test/setup.ts"],
  },
});
