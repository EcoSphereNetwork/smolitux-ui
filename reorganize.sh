#!/bin/bash

# Reorganization script for smolitux-ui repository
# This script organizes files and directories according to best practices

set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting repository reorganization..."

# Create backup of the current structure
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
echo "📦 Creating backup at $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp -r * .[^.]* "$BACKUP_DIR" 2>/dev/null || true

# Function to create directory if it doesn't exist
create_dir_if_not_exists() {
    if [ ! -d "$1" ]; then
        echo "📁 Creating directory: $1"
        mkdir -p "$1"
    fi
}

# Define the new repository structure
echo "🏗️ Setting up directory structure..."

# Main directories
create_dir_if_not_exists "packages"
create_dir_if_not_exists "packages/@smolitux"
create_dir_if_not_exists "packages/@smolitux/core"
create_dir_if_not_exists "packages/@smolitux/theme"
create_dir_if_not_exists "packages/@smolitux/layout"
create_dir_if_not_exists "packages/@smolitux/charts"
create_dir_if_not_exists "packages/playground"
create_dir_if_not_exists "examples"
create_dir_if_not_exists "docs"
create_dir_if_not_exists "scripts"
create_dir_if_not_exists "tests"

# Source code directories
create_dir_if_not_exists "packages/@smolitux/core/src/components"
create_dir_if_not_exists "packages/@smolitux/theme/src"
create_dir_if_not_exists "packages/@smolitux/layout/src/components"
create_dir_if_not_exists "packages/@smolitux/charts/src/components"
create_dir_if_not_exists "packages/playground/src"
create_dir_if_not_exists "packages/playground/src/components"
create_dir_if_not_exists "packages/playground/src/examples"

# Documentation directories
create_dir_if_not_exists "docs/guides"
create_dir_if_not_exists "docs/api"
create_dir_if_not_exists "docs/development"
create_dir_if_not_exists "docs/architecture"
create_dir_if_not_exists "docs/contributing"
create_dir_if_not_exists "docs/testing"

# Move files to their correct locations
echo "🔄 Moving files to their correct locations..."

# Move component source files if they exist in the old structure
if [ -d "src/Frontend-Bibliothek/smolitux-ui/packages/@smolitux" ]; then
    echo "📋 Moving component source files..."
    
    # Move core components
    cp -r src/Frontend-Bibliothek/smolitux-ui/packages/@smolitux/core/src/* packages/@smolitux/core/src/ 2>/dev/null || true
    
    # Move theme components
    cp -r src/Frontend-Bibliothek/smolitux-ui/packages/@smolitux/theme/src/* packages/@smolitux/theme/src/ 2>/dev/null || true
    
    # Move layout components
    cp -r src/Frontend-Bibliothek/smolitux-ui/packages/@smolitux/layout/src/* packages/@smolitux/layout/src/ 2>/dev/null || true
    
    # Move chart components
    cp -r src/Frontend-Bibliothek/smolitux-ui/packages/@smolitux/charts/src/* packages/@smolitux/charts/src/ 2>/dev/null || true
    
    # Move playground files
    cp -r src/Frontend-Bibliothek/smolitux-ui/packages/playground/src/* packages/playground/src/ 2>/dev/null || true
fi

# Move existing examples if they exist
if [ -d "src/Frontend-Bibliothek/smolitux-ui/examples" ]; then
    echo "📋 Moving example files..."
    cp -r src/Frontend-Bibliothek/smolitux-ui/examples/* examples/ 2>/dev/null || true
fi

# Move and reorganize documentation files
echo "📋 Reorganizing documentation files..."

# Architecture documentation
for file in src/Frontend-Bibliothek/smolitux-ui/Architekturdesign.md docs/docs/Smolitux-UI/Architekturdesign.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/architecture/architecture-design.md 2>/dev/null || true
    fi
done

# Technical requirements documentation
for file in src/Frontend-Bibliothek/smolitux-ui/technischeAnforderungen.md docs/docs/Smolitux-UI/technischeAnforderungen.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/architecture/technical-requirements.md 2>/dev/null || true
    fi
done

# Requirements analysis documentation
for file in src/Frontend-Bibliothek/smolitux-ui/Anforderungsanalyse.md docs/docs/Smolitux-UI/Anforderungsanalyse.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/architecture/requirements-analysis.md 2>/dev/null || true
    fi
done

# Component specification documentation
for file in src/Frontend-Bibliothek/smolitux-ui/Komponenten-Spezifikation.md docs/docs/Smolitux-UI/Komponenten-Spezifikation.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/architecture/component-specification.md 2>/dev/null || true
    fi
done

# Development strategy documentation
for file in src/Frontend-Bibliothek/smolitux-ui/Entwicklungsstrategie.md docs/docs/Smolitux-UI/Entwicklungsstrategie.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/development/development-strategy.md 2>/dev/null || true
    fi
done

# Implementation roadmap documentation
for file in src/Frontend-Bibliothek/smolitux-ui/Implementierungsroadmap.md docs/docs/Smolitux-UI/Implementierungsroadmap.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/development/implementation-roadmap.md 2>/dev/null || true
    fi
done

# Documentation strategy
for file in src/Frontend-Bibliothek/smolitux-ui/Dokumentationsstrategie.md docs/docs/Smolitux-UI/Dokumentationsstrategie.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/development/documentation-strategy.md 2>/dev/null || true
    fi
done

# Project guide
for file in src/Frontend-Bibliothek/smolitux-ui/Projektleitfaden.md docs/docs/Smolitux-UI/Projektleitfaden.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/development/project-guide.md 2>/dev/null || true
    fi
done

# Migration guide
for file in src/Frontend-Bibliothek/smolitux-ui/Migrations-Anleitung.md docs/docs/Smolitux-UI/Migrations-Anleitung.md src/Frontend-Bibliothek/smolitux-ui/Migrationsstrategie.md docs/docs/Smolitux-UI/Migrationsstrategie.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/guides/migration-guide.md 2>/dev/null || true
    fi
done

# Performance optimization
for file in src/Frontend-Bibliothek/smolitux-ui/Performance-Optimierungsstrategie.md docs/docs/Smolitux-UI/Performance-Optimierungsstrategie.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/development/performance-optimization.md 2>/dev/null || true
    fi
done

# MVP development guide
for file in src/Frontend-Bibliothek/smolitux-ui/MVP-Entwicklung.md docs/docs/Smolitux-UI/MVP-Entwicklung.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/guides/mvp-development.md 2>/dev/null || true
    fi
done

# Security and compatibility
for file in src/Frontend-Bibliothek/smolitux-ui/Sicherheits-\&Kompatibilitätsstrategie.md "docs/docs/Smolitux-UI/Sicherheits-&Kompatibilitätsstrategie.md"; do
    if [ -f "$file" ]; then
        cp "$file" docs/development/security-compatibility.md 2>/dev/null || true
    fi
done

# Move test plan documents
echo "📋 Moving test plan documentation..."

# Create test plan directory
create_dir_if_not_exists "docs/testing/testplan"

# Move each test plan file
for testplan_file in docs/docs/Smolitux-UI/Testplan/*.md src/Frontend-Bibliothek/smolitux-ui/Testplan/*.md; do
    if [ -f "$testplan_file" ]; then
        filename=$(basename "$testplan_file")
        cp "$testplan_file" "docs/testing/testplan/$filename" 2>/dev/null || true
    fi
done

# Also check the main test strategy document
for file in src/Frontend-Bibliothek/smolitux-ui/Teststrategie.md docs/docs/Smolitux-UI/Teststrategie.md; do
    if [ -f "$file" ]; then
        cp "$file" docs/testing/test-strategy.md 2>/dev/null || true
    fi
done

# Move scripts
echo "📋 Moving scripts..."
for script_file in scripts/*.sh src/Frontend-Bibliothek/smolitux-ui/*.sh; do
    if [ -f "$script_file" ]; then
        filename=$(basename "$script_file")
        # Skip the current script to avoid issues
        if [ "$filename" != "reorganize.sh" ]; then
            cp "$script_file" "scripts/$filename" 2>/dev/null || true
            chmod +x "scripts/$filename"
        fi
    fi
done

# Move README and other top-level files
echo "📋 Moving top-level files..."
for readme_file in src/Frontend-Bibliothek/smolitux-ui/README.md; do
    if [ -f "$readme_file" ]; then
        cp "$readme_file" README.md 2>/dev/null || true
    fi
done

# Copy package configurations if they exist
echo "📋 Setting up package configurations..."

# Create package.json files if they don't exist
if [ ! -f "packages/@smolitux/core/package.json" ]; then
    cat > packages/@smolitux/core/package.json << 'EOF'
{
  "name": "@smolitux/core",
  "version": "0.1.0",
  "description": "Core UI components for Smolitux UI",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "test": "jest"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
EOF
fi

if [ ! -f "packages/@smolitux/theme/package.json" ]; then
    cat > packages/@smolitux/theme/package.json << 'EOF'
{
  "name": "@smolitux/theme",
  "version": "0.1.0",
  "description": "Theming system for Smolitux UI",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "test": "jest"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
EOF
fi

if [ ! -f "packages/@smolitux/layout/package.json" ]; then
    cat > packages/@smolitux/layout/package.json << 'EOF'
{
  "name": "@smolitux/layout",
  "version": "0.1.0",
  "description": "Layout components for Smolitux UI",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "test": "jest"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@smolitux/core": "0.1.0",
    "@smolitux/theme": "0.1.0"
  }
}
EOF
fi

if [ ! -f "packages/@smolitux/charts/package.json" ]; then
    cat > packages/@smolitux/charts/package.json << 'EOF'
{
  "name": "@smolitux/charts",
  "version": "0.1.0",
  "description": "Chart components for Smolitux UI",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "test": "jest"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@smolitux/core": "0.1.0",
    "@smolitux/theme": "0.1.0"
  }
}
EOF
fi

# Create or update root package.json
if [ ! -f "package.json" ]; then
    cat > package.json << 'EOF'
{
  "name": "smolitux-ui-monorepo",
  "private": true,
  "workspaces": [
    "packages/*",
    "packages/@smolitux/*"
  ],
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "build": "lerna run build",
    "test": "lerna run test",
    "lint": "lerna run lint",
    "storybook": "cd packages/docs && npm run storybook",
    "dev": "cd packages/playground && npm run dev"
  },
  "devDependencies": {
    "lerna": "^6.6.2"
  }
}
EOF
fi

# Create or update root Readme.md if it doesn't exist
if [ ! -f "README.md" ]; then
    cat > README.md << 'EOF'
# Smolitux UI

A modern React component library for consistent UI development.

## Packages

- **@smolitux/core**: Basic UI components
- **@smolitux/theme**: Theming and styling
- **@smolitux/layout**: Layout components
- **@smolitux/charts**: Chart components

## Development

```bash
# Install dependencies
npm run bootstrap

# Start development server (playground)
npm run dev

# Start Storybook
npm run storybook
```

## Build

```bash
# Build all packages
npm run build
```

## Documentation

See the [docs](./docs) directory for detailed documentation.
EOF
fi

# Create lerna.json if it doesn't exist
if [ ! -f "lerna.json" ]; then
    cat > lerna.json << 'EOF'
{
  "version": "0.1.0",
  "npmClient": "npm",
  "useWorkspaces": true,
  "packages": ["packages/*", "packages/@smolitux/*"],
  "command": {
    "publish": {
      "conventionalCommits": true,
      "yes": true
    }
  }
}
EOF
fi

# Create a .gitignore file if it doesn't exist
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules
.pnp
.pnp.js

# Build files
dist
build
.next
out
storybook-static

# Testing
coverage

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor files
.idea
.vscode
*.sublime-project
*.sublime-workspace
.DS_Store
.directory
Thumbs.db
EOF
fi

# Clean up old folders that are no longer needed
echo "🧹 Cleaning up old directory structure..."

# Don't remove source folders yet, keep them as backup
# We'll instruct the user to remove them after verifying everything works

echo "✅ Repository reorganization complete!"
echo ""
echo "🔍 Please verify that all files have been properly moved to their new locations."
echo "📝 If everything looks good, you can remove the old directories with:"
echo "   rm -rf src/Frontend-Bibliothek docs/docs/Smolitux-UI"
echo ""
echo "📚 Documentation is now organized in the docs/ directory"
echo "💻 Component source code is now in packages/@smolitux/"
echo "🧪 Examples are in the examples/ directory"
echo "📜 Scripts are in the scripts/ directory"
echo ""
echo "🚀 Next steps:"
echo "1. Run 'npm install' to update dependencies"
echo "2. Run 'npm run bootstrap' to set up the workspace"
echo "3. Run 'npm run build' to build all packages"
echo "4. Run 'npm run dev' to start the playground for testing"