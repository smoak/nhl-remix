import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["**/*.test.ts", "**/test.tsx"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["config/vitest.setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["app/**"],
      exclude: [
        "app/root.tsx",
        "app/entry.client.tsx",
        "app/entry.worker.ts",
        "app/routes/**",
      ],
    },
  },
});
