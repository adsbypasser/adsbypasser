import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        requireConfigFile: false
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        XMLHttpRequest: 'readonly',
        location: 'readonly',
        FormData: 'readonly',
        DOMParser: 'readonly',
        MutationObserver: 'readonly',
        atob: 'readonly',
        btoa: 'readonly',
        // Greasemonkey globals
        GM: 'readonly',
        GM_addStyle: 'readonly',
        GM_deleteValue: 'readonly',
        GM_getValue: 'readonly',
        GM_listValues: 'readonly',
        GM_openInTab: 'readonly',
        GM_registerMenuCommand: 'readonly',
        GM_setValue: 'readonly',
        GM_xmlhttpRequest: 'readonly',
        GM_getResourceURL: 'readonly',
        GM_info: 'readonly',
        unsafeWindow: 'readonly',
        exportFunction: 'readonly',
        // Custom globals
        _: 'readonly',
        $: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error'
    }
  }
];
