import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.js"],
  },
  resolve: {
    alias: {
      util: path.resolve(__dirname, "./src/util"),
    },
  },
});
