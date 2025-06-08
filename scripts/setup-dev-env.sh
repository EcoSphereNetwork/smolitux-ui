#!/usr/bin/env bash
set -euo pipefail
# Setup Smolitux UI development environment

# Clean proxy-related npm env vars to avoid warnings
unset npm_config_http_proxy npm_config_https_proxy
unset npm_config_http-proxy npm_config_https-proxy
# Ensure ESLint packages for Flat Config are installed
npm install --no-audit --no-fund --save-dev \
  @eslint/js eslint eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-import \
  jest ts-jest @types/jest lerna typescript >/dev/null

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

# Rebuild packages like eslint, jest-cli and ts-jest to ensure build artifacts
# This avoids MODULE_NOT_FOUND errors when their build folders are missing.
npm rebuild eslint jest-cli ts-jest

# Verify essential tools are available from local node_modules
for tool in eslint jest ts-jest prettier; do
  if ! npx --no-install $tool --version >/dev/null 2>&1; then
    echo "Error: $tool is not installed" >&2
    exit 1
  fi
done

echo "==> Installing docs dependencies"
(cd docs && npm install --no-audit --no-fund)

# Run basic checks but continue on failure
echo "==> Running lint, test, build"
npm run lint || true
npm run test || true
npm run build || true

echo "Development environment is ready"
