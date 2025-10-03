import path from "path";
import { defineConfig } from "vitest/config";

/**
 * Vitest configuration for AdsBypasser
 *
 * This configuration sets up the testing environment for the project.
 * It includes settings for globals, environment, test file inclusion,
 * and path aliases for easier module resolution.
 */

export default defineConfig({
  // Test configuration
  test: {
    // Enable global APIs like describe, it, expect, etc.
    globals: true,

    // Set the test environment to Node.js
    environment: "node",

    // Specify test file patterns
    include: ["tests/**/*.js"],

    // Configure test coverage (optional)
    // coverage: {
    //   provider: "v8",
    //   reporter: ["text", "json", "html"],
    //   exclude: [
    //     "node_modules/",
    //     "dist/",
    //     "build/",
    //     "coverage/",
    //     "tests/",
    //     "vitest.config.js",
    //     "gulpfile.js"
    //   ]
    // }
  },

  // Path resolution aliases
  resolve: {
    alias: {
      // Alias for utility modules
      $lib: path.resolve(__dirname, "./src/lib"),

      // You can add more aliases here as needed
      // For example:
      // "@": path.resolve(__dirname, "./src"),
      // "~": path.resolve(__dirname)
    },
  },

  // Additional configuration options can be added here
  // For example, if you need to set up environment variables:
  // define: {
  //   __VERSION__: JSON.stringify(process.env.npm_package_version)
  // }
});
