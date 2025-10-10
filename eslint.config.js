import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

// Global variables organized by category
const browserGlobals = {
  // Standard browser APIs
  window: "readonly",
  document: "readonly",
  console: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
  fetch: "readonly",
  XMLHttpRequest: "readonly",
  location: "readonly",
  FormData: "readonly",
  DOMParser: "readonly",
  MutationObserver: "readonly",
  atob: "readonly",
  btoa: "readonly",
  navigator: "readonly",
};

const userscriptGlobals = {
  // Greasemonkey/Tampermonkey userscript APIs
  GM: "readonly",
  GM_addStyle: "readonly",
  GM_deleteValue: "readonly",
  GM_getValue: "readonly",
  GM_listValues: "readonly",
  GM_openInTab: "readonly",
  GM_registerMenuCommand: "readonly",
  GM_setValue: "readonly",
  GM_xmlhttpRequest: "readonly",
  GM_info: "readonly",
  unsafeWindow: "readonly",
  exportFunction: "readonly",
};

const nodeGlobals = {
  // Node.js globals
  process: "readonly",
  Buffer: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  global: "readonly",
  module: "readonly",
  require: "readonly",
  exports: "readonly",
  console: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
};

const libraryGlobals = {
  // Third-party library globals
  _: "readonly", // Lodash
  $: "readonly", // AdsBypasser
};

const customGlobals = {
  // Project-specific globals
  commit: "readonly", // Used in templates
};

export default [
  {
    ignores: ["dist", "**/*.template.js"],
  },
  js.configs.recommended,
  prettierConfig,
  // Base configuration for all files
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-var": "error",
      "prefer-const": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
    },
  },
  // Node.js context: build/, ci/, vitest.config.js
  {
    files: ["build/**/*.js", "ci/**/*.js", "vitest.config.js"],
    languageOptions: {
      globals: {
        ...nodeGlobals,
        ...libraryGlobals,
      },
    },
  },
  // Browser context: src/, templates/ghpages/js/
  {
    files: ["src/**/*.js", "templates/ghpages/js/**/*.js"],
    languageOptions: {
      globals: {
        ...browserGlobals,
        ...userscriptGlobals,
        ...libraryGlobals,
        ...customGlobals,
      },
    },
  },
];
