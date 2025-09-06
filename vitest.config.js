import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.js'],
  },
  resolve: {
    alias: {
      'util': path.resolve(__dirname, './src/util'),
    },
  },
});
