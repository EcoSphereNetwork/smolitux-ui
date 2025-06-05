#!/usr/bin/env bash
set -euo pipefail

# Install Node dependencies using yarn or npm
if command -v yarn >/dev/null 2>&1; then
  echo "==> Installing dependencies with yarn"
  yarn install
else
  echo "==> Installing dependencies with npm"
  npm ci
fi

# Verify essential tools are available from local node_modules
for tool in eslint jest prettier; do
  if ! npx --no-install $tool --version >/dev/null 2>&1; then
    echo "Error: $tool is not installed" >&2
    exit 1
  fi
done

echo "Development environment is ready"
