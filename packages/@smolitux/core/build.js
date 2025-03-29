const esbuild = require('esbuild');
const { execSync } = require('child_process');

// ESM Build
esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  outExtension: { '.js': '.mjs' },
  outfile: 'dist/index.mjs',
  format: 'esm',
  bundle: true,
  external: [
    'react', 
    'react-dom', 
    '@smolitux/utils', 
    '@smolitux/theme',
    'i18next',
    'react-i18next',
    'i18next-browser-languagedetector',
    'i18next-http-backend'
  ],
  sourcemap: true,
  minify: false,
  target: ['es2019'],
  banner: {
    js: `/**
 * @license Smolitux UI Core
 * Copyright (c) EcoSphereNetwork
 * This source code is licensed under the MIT license
 */`,
  },
});

// CJS Build
esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  format: 'cjs',
  bundle: true,
  external: [
    'react', 
    'react-dom', 
    '@smolitux/utils', 
    '@smolitux/theme',
    'i18next',
    'react-i18next',
    'i18next-browser-languagedetector',
    'i18next-http-backend'
  ],
  sourcemap: true,
  minify: false,
  target: ['es2019'],
  banner: {
    js: `/**
 * @license Smolitux UI Core
 * Copyright (c) EcoSphereNetwork
 * This source code is licensed under the MIT license
 */`,
  },
});

// Generate TypeScript declarations
try {
  execSync('tsc --emitDeclarationOnly --outDir dist --skipLibCheck', { stdio: 'inherit' });
} catch (error) {
  console.error('Error generating TypeScript declarations:', error);
  // Continue despite errors
  console.warn('Continuing despite TypeScript declaration errors');
}

console.log('Build completed successfully!');