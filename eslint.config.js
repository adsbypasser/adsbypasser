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
  GM_getResourceURL: "readonly",
  GM_info: "readonly",
  unsafeWindow: "readonly",
  exportFunction: "readonly",
};

const libraryGlobals = {
  // Third-party library globals
  _: "readonly", // Lodash
  $: "readonly", // jQuery (if used)
};

const customGlobals = {
  // Project-specific globals
};

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: {
        // Combine all globals
        ...browserGlobals,
        ...userscriptGlobals,
        ...libraryGlobals,
        ...customGlobals,
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
];
