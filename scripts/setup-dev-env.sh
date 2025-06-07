#!/usr/bin/env bash
set -euo pipefail

# Clean proxy-related npm env vars to avoid warnings
unset npm_config_http_proxy npm_config_https_proxy
unset npm_config_http-proxy npm_config_https-proxy

# Always install Node dependencies via npm for reliability
echo "==> Installing dependencies with npm"
npm install --no-audit --no-fund
npm update --no-audit --no-fund

# Synchronize package versions across packages
ROOT_VERSION=$(jq -r '.version' package.json)
for pkg in packages/@smolitux/*; do
  if [ -f "$pkg/package.json" ]; then
    tmp=$(mktemp)
    jq --arg v "$ROOT_VERSION" '.version = $v' "$pkg/package.json" > "$tmp" && mv "$tmp" "$pkg/package.json"
  fi

  cat > "$pkg/tsconfig.json" <<EOF
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
EOF

  cat > "$pkg/jest.config.js" <<'EOF'
const base = require('../../jest.config');
module.exports = { ...base, rootDir: __dirname };
EOF
done

# Rebuild packages like eslint and jest-cli to ensure build artifacts
npm rebuild eslint jest-cli

# Verify essential tools are available from local node_modules
for tool in eslint jest prettier; do
  if ! npx --no-install $tool --version >/dev/null 2>&1; then
    echo "Error: $tool is not installed" >&2
    exit 1
  fi
done

echo "Development environment is ready"
