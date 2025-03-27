#!/bin/bash
set -e

# Utilities zuerst bauen
echo "Building @smolitux/utils..."
cd packages/@smolitux/utils
npm run build
cd ../../..

# Theme
echo "Building @smolitux/theme..."
cd packages/@smolitux/theme
npm run build
cd ../../..

# Dann Core
echo "Building @smolitux/core..."
cd packages/@smolitux/core
npm run build
cd ../../..

# Andere Pakete
for pkg in ai blockchain charts community federation layout media resonance; do
  echo "Building @smolitux/$pkg..."
  cd packages/@smolitux/$pkg
  npm run build
  cd ../../..
done

echo "All packages built successfully!"
