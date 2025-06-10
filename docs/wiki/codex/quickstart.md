# Smolitux UI - Quick Start Guide

This guide provides a quick start for working with the Smolitux UI component library using the Codex agent system.

## 🚀 Getting Started

### Repository Analysis

Before starting any work, analyze the current state of the repository:

```bash
# Run the repository analyzer
bash scripts/workflows/analyze-repo.sh

# Check component status
cat COMPONENT_STATUS.md
```

### Development Workflow Selection

Based on the repository analysis, choose the appropriate workflow:

#### 1. Bulk Completion (>50% missing files)

If more than 50% of components are missing tests or stories, use the bulk completion workflow:

```bash
# Generate missing files
bash scripts/workflows/complete-components.sh --all

# Validate quality
bash scripts/workflows/validate-quality.sh
```

#### 2. Package-by-Package Development (<50% missing files)

If less than 50% of components are missing tests or stories, use the package-by-package workflow:

```bash
# Select a package (start with core)
PACKAGE="core"

# List components
find packages/@smolitux/$PACKAGE/src/components -type d -mindepth 1 -maxdepth 1

# Complete components
bash scripts/workflows/complete-components.sh --package $PACKAGE
```

#### 3. Component-by-Component Development (Quality enhancement)

For quality enhancement of specific components:

```bash
# Select a component
PACKAGE="core"
COMPONENT="Button"

# Analyze component
bash scripts/workflows/analyze-component.sh --package $PACKAGE --component $COMPONENT

# Complete component
bash scripts/workflows/complete-component.sh --package $PACKAGE --component $COMPONENT
```

## 📊 Decision Tree

Use this decision tree to determine the best approach:

```
Repository Analysis
├── >50% Missing Files
│   └── Use Bulk Completion
├── 20-50% Missing Files
│   └── Use Package-by-Package Development
└── <20% Missing Files
    └── Use Component-by-Component Development
```

## 🔧 Component Development Workflow

For each component, follow this workflow:

### 1. Analysis Phase (30 seconds)
```bash
COMPONENT="Button"  # Replace with target
PACKAGE="core"      # Replace with target package

# Quick component inspection
ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/
head -20 packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.tsx
```

### 2. Implementation Phase (2-3 minutes)
- Ensure proper TypeScript interfaces with JSDoc comments
- Use forwardRef pattern for all components
- Add proper ARIA attributes for accessibility
- Include data-testid attribute for testing

### 3. Testing Phase (2-3 minutes)
- Create comprehensive test suite with jest-axe for accessibility
- Test all component variants and states
- Test user interactions and keyboard navigation
- Test error states and edge cases

### 4. Documentation Phase (2 minutes)
- Create comprehensive Storybook stories
- Document all props with descriptions
- Include usage examples for all variants
- Document accessibility considerations

### 5. Validation Phase (30 seconds)
```bash
# Quick validation per component
npm run lint --workspace=@smolitux/$PACKAGE
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests

# Update progress
echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
```

## 📈 Progress Tracking

Track your progress using the provided tools:

```bash
# Generate coverage dashboard
bash scripts/workflows/generate-coverage-dashboard.sh

# Check component status
cat COMPONENT_STATUS.md
```

## 🚨 Common Issues and Solutions

### Missing Dependencies
```bash
# Install common dependencies
npm install --save-dev @typescript-eslint/eslint-plugin jest jest-axe 
npm install --save-dev @testing-library/react @testing-library/user-event
npm install --save-dev tsup ts-node react @types/react @types/react-dom
```

### Test Environment Issues
```bash
# If tests fail due to missing setup
touch test-utils/setup.ts
echo "import '@testing-library/jest-dom';" >> test-utils/setup.ts
```

### Duplicate File Prevention
```bash
# Always check for existing files before creating new ones
ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/
```

## 🎯 Next Steps

After completing the quick start guide, refer to the following resources for more detailed information:

- [Workflows](./workflows.md) - Detailed workflow documentation
- [Component Patterns](./component-patterns.md) - Patterns and templates for component development
- [Package-Specific Guidelines](./package-specific/README.md) - Guidelines for specific packages
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

This quick start guide provides the essential information to get started with the Smolitux UI component library using the Codex agent system. For more detailed information, refer to the linked resources.