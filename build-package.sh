#!/bin/bash

# Create a temporary directory for the package
mkdir -p dist

# Copy necessary files
cp package.json dist/
cp lerna.json dist/
cp README.md dist/
cp CHANGELOG.md dist/
cp LICENSE dist/
cp -r packages dist/

# Create a tarball
cd dist
npm pack
mv *.tgz ../smolitux-ui-0.2.2.tgz
cd ..

echo "Package created: smolitux-ui-0.2.2.tgz"