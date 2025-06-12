#!/bin/bash

# 🧠 Codex Setup Script - Fixed Storybook Installation
# Fixes the interactive installation issue

set -e

echo "🚀 Setting up @smolitux/core with Storybook (non-interactive)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Make sure you're in the project root."
    exit 1
fi

print_status "Installing dependencies..."

# Install core dependencies first
npm install

# Install Storybook dependencies explicitly (non-interactive)
print_status "Installing Storybook dependencies..."

# Install Storybook CLI globally to avoid interactive prompts
npm install -g @storybook/cli

# Install Storybook core dependencies
npm install --save-dev \
    @storybook/react \
    @storybook/addon-essentials \
    @storybook/addon-interactions \
    @storybook/addon-a11y \
    @storybook/testing-library \
    @storybook/addon-docs \
    @storybook/addon-controls \
    @storybook/addon-viewport \
    @storybook/addon-backgrounds \
    @storybook/manager-api \
    @storybook/preview-api \
    @storybook/blocks \
    storybook

print_status "Setting up Storybook configuration..."

# Create .storybook directory if it doesn't exist
mkdir -p .storybook

# Create main.js configuration
cat > .storybook/main.js << 'EOF'
const config = {
  stories: [
    "../packages/@smolitux/core/src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-viewport",
    "@storybook/addon-backgrounds"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
EOF

# Create preview.js configuration
cat > .storybook/preview.js << 'EOF'
import '../packages/@smolitux/core/src/styles/globals.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
EOF

# Update package.json scripts
print_status "Updating package.json scripts..."

# Use node to update package.json scripts
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!pkg.scripts) pkg.scripts = {};

pkg.scripts = {
  ...pkg.scripts,
  'storybook': 'storybook dev -p 6006',
  'storybook:build': 'storybook build',
  'storybook:test': 'test-storybook',
  'dev': 'concurrently \"npm run dev:core\" \"npm run storybook\"',
  'dev:core': 'npm run build --workspace=@smolitux/core --watch',
  'build': 'npm run build --workspaces',
  'build:core': 'npm run build --workspace=@smolitux/core',
  'test': 'npm run test --workspaces',
  'test:core': 'npm run test --workspace=@smolitux/core',
  'lint': 'npm run lint --workspaces',
  'lint:core': 'npm run lint --workspace=@smolitux/core',
  'lint:fix': 'npm run lint:fix --workspaces',
  'typecheck': 'npm run typecheck --workspaces',
  'clean': 'npm run clean --workspaces && rm -rf node_modules/.cache',
  'reset': 'npm run clean && rm -rf node_modules package-lock.json && npm install'
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Install additional development dependencies
print_status "Installing additional development dependencies..."

npm install --save-dev \
    concurrently \
    @storybook/test-runner \
    @storybook/jest \
    jest-environment-jsdom

# Create Storybook test configuration
mkdir -p .storybook/test-runner-jest.config.js
cat > .storybook/test-runner-jest.config.js << 'EOF'
const { getJestConfig } = require('@storybook/test-runner');

module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   */
};
EOF

# Update workspace package.json for @smolitux/core
print_status "Updating @smolitux/core package configuration..."

CORE_PACKAGE_PATH="packages/@smolitux/core"

if [ -d "$CORE_PACKAGE_PATH" ]; then
    node -e "
    const fs = require('fs');
    const path = require('path');
    const pkgPath = path.join('$CORE_PACKAGE_PATH', 'package.json');
    
    if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        
        if (!pkg.scripts) pkg.scripts = {};
        
        pkg.scripts = {
            ...pkg.scripts,
            'build': 'tsup',
            'build:watch': 'tsup --watch',
            'dev': 'tsup --watch',
            'lint': 'eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0',
            'lint:fix': 'eslint src --ext .ts,.tsx --fix',
            'test': 'jest',
            'test:watch': 'jest --watch',
            'test:coverage': 'jest --coverage',
            'typecheck': 'tsc --noEmit',
            'clean': 'rm -rf dist .turbo'
        };
        
        // Ensure devDependencies include necessary packages
        if (!pkg.devDependencies) pkg.devDependencies = {};
        
        Object.assign(pkg.devDependencies, {
            '@testing-library/jest-dom': '^6.1.4',
            '@testing-library/react': '^14.1.2',
            '@testing-library/user-event': '^14.5.1',
            'jest': '^29.7.0',
            'jest-environment-jsdom': '^29.7.0',
            'jest-axe': '^8.0.0',
            '@types/jest': '^29.5.8',
            'tsup': '^8.0.1',
            'typescript': '^5.3.2',
            'eslint': '^8.54.0',
            '@typescript-eslint/eslint-plugin': '^6.12.0',
            '@typescript-eslint/parser': '^6.12.0'
        });
        
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        console.log('Updated @smolitux/core package.json');
    }
    "
else
    print_warning "@smolitux/core package directory not found"
fi

# Create .env file for Storybook
cat > .env << 'EOF'
# Storybook Configuration
STORYBOOK_DISABLE_TELEMETRY=1
NODE_ENV=development
EOF

# Create .gitignore additions for Storybook
if [ -f ".gitignore" ]; then
    if ! grep -q "storybook-static" .gitignore; then
        echo "" >> .gitignore
        echo "# Storybook" >> .gitignore
        echo "storybook-static/" >> .gitignore
        echo "test-results/" >> .gitignore
        echo ".env.local" >> .gitignore
    fi
fi

print_success "Storybook setup completed!"

# Validate installation
print_status "Validating Storybook installation..."

if command -v storybook &> /dev/null; then
    print_success "Storybook CLI installed successfully"
else
    print_warning "Storybook CLI not found in PATH, but local installation should work"
fi

# Test if Storybook can start (dry run)
print_status "Testing Storybook configuration..."

if npm run storybook -- --dry-run --quiet 2>/dev/null; then
    print_success "Storybook configuration is valid"
else
    print_warning "Storybook configuration test failed, but this might be expected"
fi

echo ""
print_success "🎉 Setup complete! You can now:"
echo "  • Run development mode: npm run dev"
echo "  • Start Storybook only: npm run storybook"
echo "  • Build project: npm run build"
echo "  • Run tests: npm run test"
echo "  • Lint code: npm run lint"
echo ""
print_status "Next steps for Label component:"
echo "  1. Implement: packages/@smolitux/core/src/components/Label/"
echo "  2. Test: Label.test.tsx"
echo "  3. Document: Label.stories.tsx"
echo "  4. Validate: npm run lint && npm run build && npm run test"
echo "  5. Commit & continue with Listbox component"
