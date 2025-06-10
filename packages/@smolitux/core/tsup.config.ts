import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@smolitux/utils',
    '@smolitux/theme',
    '@smolitux/voice-control',
    'i18next',
    'i18next-browser-languagedetector',
    'i18next-http-backend',
    'react-i18next',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: `/**
 * @license Smolitux UI Core
 * Copyright (c) EcoSphereNetwork
 * This source code is licensed under the MIT license
 */`,
    };
  },
});
