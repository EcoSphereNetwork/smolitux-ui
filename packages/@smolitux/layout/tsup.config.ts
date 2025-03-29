import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@smolitux/core', '@smolitux/theme', '@smolitux/utils'],
  esbuildOptions(options) {
    options.banner = {
      js: `/**
 * @license Smolitux UI Layout
 * Copyright (c) EcoSphereNetwork
 * This source code is licensed under the MIT license
 */`,
    };
  },
});