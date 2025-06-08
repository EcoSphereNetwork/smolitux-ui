#!/usr/bin/env bash
set -euo pipefail

# Setup Smolitux UI development environment
echo "🚀 Starte Smolitux UI Development Environment Setup..."

# Clean proxy-related npm env vars to avoid warnings
unset npm_config_http_proxy npm_config_https_proxy 2>/dev/null || true
unset npm_config_http-proxy npm_config_https-proxy 2>/dev/null || true

# Ensure ESLint packages for Flat Config are installed
echo "📦 Installiere ESLint und Test-Dependencies..."
npm install --no-audit --no-fund --save-dev \
  @eslint/js eslint eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-import \
  jest ts-jest @types/jest lerna typescript identity-obj-proxy >/dev/null

# Always install Node dependencies via npm for reliability
echo "🔧 Installiere Dependencies mit npm..."
npm install --no-audit --no-fund
npm update --no-audit --no-fund >/dev/null 2>&1 || true

# Synchronize package versions across packages
ROOT_VERSION=$(jq -r '.version' package.json)
echo "🔄 Synchronisiere Package-Versionen (v$ROOT_VERSION)..."

for pkg in packages/@smolitux/*; do
  if [ -f "$pkg/package.json" ]; then
    pkg_name=$(basename "$pkg")
    echo "  📋 Konfiguriere Paket: $pkg_name"
    
    # Update version
    tmp=$(mktemp)
    jq --arg v "$ROOT_VERSION" '.version = $v' "$pkg/package.json" > "$tmp" && mv "$tmp" "$pkg/package.json"
    
    # Create TypeScript config
    cat > "$pkg/tsconfig.json" <<EOF
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
EOF

    # Create standalone Jest config (fixed path issue!)
    cat > "$pkg/jest.config.js" <<'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/../../../jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/../../../test-utils/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/__tests__/**/*.test.{ts,tsx}',
    '**/__tests__/**/*.spec.{ts,tsx}',
    '**/src/**/*.test.{ts,tsx}',
    '**/src/**/*.spec.{ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json-summary']
};
EOF
  fi
done

# Create test-utils if missing
if [ ! -d "test-utils" ]; then
  echo "🛠️  Erstelle test-utils Verzeichnis..."
  mkdir -p test-utils
  
  # Create file mock
  cat > test-utils/fileMock.js <<'EOF'
module.exports = 'test-file-stub';
EOF

  # Create y18n mock if referenced in main config
  if grep -q "y18n" jest.config.js 2>/dev/null; then
    cat > test-utils/y18n.js <<'EOF'
module.exports = {
  __: (key) => key,
  n: (singular, plural, count) => count === 1 ? singular : plural
};
EOF
  fi
fi

# Rebuild packages like eslint, jest-cli and ts-jest to ensure build artifacts
echo "🔨 Rebuilding kritische Tools..."
npm rebuild eslint jest ts-jest >/dev/null 2>&1 || true

# Verify essential tools are available from local node_modules
echo "✅ Überprüfe verfügbare Tools..."
for tool in eslint jest prettier; do
  if ! npx --no-install $tool --version >/dev/null 2>&1; then
    echo "❌ Error: $tool ist nicht installiert" >&2
    exit 1
  else
    version=$(npx --no-install $tool --version 2>/dev/null | head -1)
    echo "  ✓ $tool: $version"
  fi
done

# Test Jest config on one package
echo "🧪 Teste Jest-Konfiguration..."
if [ -d "packages/@smolitux/core" ]; then
  cd packages/@smolitux/core
  if npx jest --passWithNoTests --verbose=false >/dev/null 2>&1; then
    echo "  ✓ Jest-Konfiguration funktioniert"
  else
    echo "  ⚠️  Jest-Konfiguration hat Probleme (wird später behoben)"
  fi
  cd ../../..
fi

echo "📚 Installiere docs dependencies..."
if [ -d "docs" ] && [ -f "docs/package.json" ]; then
  (cd docs && npm install --no-audit --no-fund >/dev/null 2>&1 || true)
else
  echo "  ⚠️  docs Verzeichnis nicht gefunden"
fi

# Run basic checks but continue on failure
echo "🔍 Führe grundlegende Checks durch..."
echo "  📋 Linting..."
npm run lint >/dev/null 2>&1 && echo "    ✓ Lint erfolgreich" || echo "    ⚠️  Lint-Probleme gefunden"

echo "  🧪 Testing..."
npm run test >/dev/null 2>&1 && echo "    ✓ Tests erfolgreich" || echo "    ⚠️  Test-Probleme gefunden"

echo "  🏗️  Building..."
npm run build >/dev/null 2>&1 && echo "    ✓ Build erfolgreich" || echo "    ⚠️  Build-Probleme gefunden"

echo ""
echo "🎉 Development Environment Setup abgeschlossen!"
echo ""
echo "📋 Nächste Schritte:"
echo "  • npm run test                    - Alle Tests ausführen"
echo "  • npm run build                   - Alle Pakete bauen"
echo "  • ./generate-coverage-dashboard.sh - Coverage-Dashboard generieren"
echo "  • npm run dev                     - Development Server starten"
echo ""
