# Smolitux UI - Troubleshooting

This document provides solutions for common issues encountered when working with the Smolitux UI component library.

## 📋 Table of Contents

- [Build Issues](#build-issues)
- [Test Issues](#test-issues)
- [TypeScript Issues](#typescript-issues)
- [ESLint Issues](#eslint-issues)
- [Storybook Issues](#storybook-issues)
- [Dependency Issues](#dependency-issues)
- [Script Issues](#script-issues)
- [Common Error Messages](#common-error-messages)

## Build Issues

### Issue: Build fails with "Cannot find module"

**Cause**: Missing dependencies or incorrect import paths.

**Solution**:
```bash
# Install missing dependencies
npm install

# Check import paths
grep -r "import.*missing-module" packages/
```

### Issue: Build fails with "TypeScript error"

**Cause**: TypeScript errors in the codebase.

**Solution**:
```bash
# Run TypeScript compiler to see all errors
npm run type-check

# Fix TypeScript errors
npm run lint --fix
```

### Issue: Build fails with "Module not found: Error: Can't resolve"

**Cause**: Missing peer dependencies or incorrect import paths.

**Solution**:
```bash
# Install peer dependencies
npm install --save-peer react react-dom

# Check import paths
grep -r "import.*missing-module" packages/
```

## Test Issues

### Issue: Tests fail with "Cannot find module '@testing-library/react'"

**Cause**: Missing testing dependencies.

**Solution**:
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom jest-axe
```

### Issue: Tests fail with "TypeError: expect(...).toBeInTheDocument is not a function"

**Cause**: Missing jest-dom setup.

**Solution**:
```bash
# Create or update jest setup file
echo "import '@testing-library/jest-dom';" > jest.setup.js

# Update jest.config.js to include setup file
echo "module.exports = { setupFilesAfterEnv: ['./jest.setup.js'] };" > jest.config.js
```

### Issue: Tests fail with "Error: Not implemented: navigation"

**Cause**: Missing jsdom environment.

**Solution**:
```bash
# Update jest.config.js to include jsdom environment
echo "module.exports = { testEnvironment: 'jsdom', setupFilesAfterEnv: ['./jest.setup.js'] };" > jest.config.js
```

## TypeScript Issues

### Issue: "Property 'X' does not exist on type 'Y'"

**Cause**: Missing type definitions or incorrect types.

**Solution**:
```typescript
// Add missing property to interface
interface ComponentProps {
  // Existing properties
  x: string; // Add missing property
}
```

### Issue: "Type 'X' is not assignable to type 'Y'"

**Cause**: Incompatible types.

**Solution**:
```typescript
// Use type assertion (only when necessary)
const value = someValue as SomeType;

// Or fix the type
const value: SomeType = {
  // Ensure all required properties are present
};
```

### Issue: "Cannot find name 'X'"

**Cause**: Missing import or undefined variable.

**Solution**:
```typescript
// Import missing module
import { X } from 'module';

// Or define the variable
const X = 'value';
```

## ESLint Issues

### Issue: "React Hook useEffect has a missing dependency"

**Cause**: Missing dependency in useEffect dependency array.

**Solution**:
```typescript
// Add missing dependency
useEffect(() => {
  // Effect code
}, [dependency1, dependency2]); // Add all dependencies
```

### Issue: "React Hook useCallback has a missing dependency"

**Cause**: Missing dependency in useCallback dependency array.

**Solution**:
```typescript
// Add missing dependency
const callback = useCallback(() => {
  // Callback code
}, [dependency1, dependency2]); // Add all dependencies
```

### Issue: "Unexpected any. Specify a different type"

**Cause**: Using `any` type.

**Solution**:
```typescript
// Replace any with a more specific type
const value: string = 'value'; // Instead of any

// Or use unknown for truly unknown types
const value: unknown = someValue;
```

## Storybook Issues

### Issue: "Cannot find module '@storybook/react'"

**Cause**: Missing Storybook dependencies.

**Solution**:
```bash
# Install Storybook dependencies
npm install --save-dev @storybook/react @storybook/addon-essentials @storybook/addon-links
```

### Issue: "Failed to build Storybook"

**Cause**: Storybook configuration issues or component errors.

**Solution**:
```bash
# Check Storybook configuration
cat .storybook/main.js

# Fix component errors
npm run lint --fix
```

### Issue: "Cannot read property 'X' of undefined" in Storybook

**Cause**: Missing props or incorrect component usage.

**Solution**:
```typescript
// Provide default props
export const Default: Story = {
  args: {
    // Provide all required props
    prop1: 'value1',
    prop2: 'value2',
  },
};
```

## Dependency Issues

### Issue: "npm ERR! code ERESOLVE"

**Cause**: Dependency conflicts.

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: "npm ERR! code ENOENT"

**Cause**: Missing files or directories.

**Solution**:
```bash
# Create missing directories
mkdir -p packages/@smolitux/core/src/components

# Reinstall dependencies
npm install
```

### Issue: "npm ERR! code EPERM"

**Cause**: Permission issues.

**Solution**:
```bash
# Fix permissions
chmod -R 755 .

# Reinstall dependencies
npm install
```

## Script Issues

### Issue: "Permission denied" when running scripts

**Cause**: Script files don't have execute permission.

**Solution**:
```bash
# Add execute permission to script files
chmod +x scripts/*.sh
```

### Issue: "Command not found" when running scripts

**Cause**: Script files not in PATH or missing shebang.

**Solution**:
```bash
# Add shebang to script files
echo '#!/bin/bash' | cat - scripts/script.sh > temp && mv temp scripts/script.sh

# Run script with explicit path
bash scripts/script.sh
```

### Issue: "No such file or directory" when running scripts

**Cause**: Script files not found or incorrect path.

**Solution**:
```bash
# Check script path
ls -la scripts/

# Run script with correct path
bash scripts/script.sh
```

## Common Error Messages

### "Cannot read property 'X' of undefined"

**Cause**: Trying to access a property of an undefined value.

**Solution**:
```typescript
// Use optional chaining
const value = obj?.prop?.nestedProp;

// Or check for undefined
if (obj && obj.prop) {
  const value = obj.prop.nestedProp;
}
```

### "Maximum call stack size exceeded"

**Cause**: Infinite recursion or circular references.

**Solution**:
```typescript
// Fix infinite recursion
const factorial = (n: number): number => {
  if (n <= 1) return 1; // Add base case
  return n * factorial(n - 1);
};

// Fix circular references
const obj = { prop: 'value' };
const circular = { obj }; // Don't set circular.obj = circular
```

### "Uncaught TypeError: Cannot read property 'X' of null"

**Cause**: Trying to access a property of a null value.

**Solution**:
```typescript
// Use nullish coalescing
const value = obj ?? defaultObj;

// Or check for null
if (obj !== null) {
  const value = obj.prop;
}
```

### "Uncaught TypeError: X is not a function"

**Cause**: Trying to call a non-function value.

**Solution**:
```typescript
// Check if value is a function
if (typeof fn === 'function') {
  fn();
}

// Or provide a default function
const callback = fn || (() => {});
callback();
```

These troubleshooting tips should help resolve common issues encountered when working with the Smolitux UI component library. If you encounter an issue not covered here, please refer to the [Component Patterns](./component-patterns.md) and [Package-Specific Guidelines](./package-specific/README.md) for more information.