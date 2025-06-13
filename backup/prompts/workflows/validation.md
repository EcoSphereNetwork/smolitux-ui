# Smolitux UI - Validation Workflow

This document provides workflow-specific context and guidelines for the quality validation workflow in the Smolitux UI component library.

## Workflow Context

The quality validation workflow is used to ensure that all components meet the quality standards. It helps identify and fix issues with TypeScript, ESLint, tests, and documentation.

## Step-by-Step Instructions

### 1. Run the Quality Validation Script

```bash
bash scripts/workflows/validate-quality.sh
```

This script will validate the quality of all components in the repository and provide a summary of the results, including:

- TypeScript errors
- ESLint errors
- Test failures
- Build status
- Coverage percentage

### 2. Review the Validation Results

The validation results will be displayed in the terminal. Pay attention to the following sections:

- **Production Readiness Validation**: Overall validation status
- **Build Validation**: Build status
- **Test Validation**: Test status
- **Lint Validation**: Lint status
- **TypeScript Validation**: TypeScript status
- **Coverage Validation**: Coverage status

### 3. Fix Any Issues

If the validation fails, fix the issues and run the validation again:

```bash
bash scripts/workflows/validate-quality.sh
```

### 4. Validate Specific Packages or Components

If you want to validate a specific package or component, use the following commands:

```bash
# Validate a specific package
bash scripts/workflows/validate-quality.sh --package core

# Validate a specific component
bash scripts/workflows/validate-quality.sh --package core --component Button
```

### 5. Generate Coverage Dashboard

After validating the quality, generate a coverage dashboard to track progress:

```bash
bash scripts/workflows/generate-coverage-dashboard.sh
```

## Examples

### Example 1: Repository Validation

```bash
bash scripts/workflows/validate-quality.sh
```

Output:
```
=== PRODUCTION READINESS VALIDATION ===
[INFO] Build Validation...
[SUCCESS] All packages build successfully
[INFO] Test Validation...
[SUCCESS] All tests pass
[INFO] Lint Validation...
[SUCCESS] No lint errors
[INFO] TypeScript Validation...
[SUCCESS] No TypeScript errors
[INFO] Coverage Validation...
[SUCCESS] Test coverage: 95%
[SUCCESS] Story coverage: 95%
[INFO] 
[SUCCESS] PRODUCTION READY!
[INFO] All validation criteria passed. Ready for release.
[SUCCESS] Quality validation complete!
```

### Example 2: Package Validation

```bash
bash scripts/workflows/validate-quality.sh --package core
```

Output:
```
=== PACKAGE VALIDATION: @smolitux/core ===
=== COMPONENT VALIDATION: @smolitux/core/Button ===
[SUCCESS] TypeScript strict compliance
[SUCCESS] Test file exists
[SUCCESS] Story file exists
[SUCCESS] Accessibility tests present
[SUCCESS] forwardRef implemented
[SUCCESS] Test ID present
[SUCCESS] Proper exports
[INFO] Quality Score: 10/10
[SUCCESS] Component is production-ready!
=== COMPONENT VALIDATION: @smolitux/core/Input ===
[SUCCESS] TypeScript strict compliance
[SUCCESS] Test file exists
[SUCCESS] Story file exists
[SUCCESS] Accessibility tests present
[SUCCESS] forwardRef implemented
[SUCCESS] Test ID present
[SUCCESS] Proper exports
[INFO] Quality Score: 10/10
[SUCCESS] Component is production-ready!
...
=== PACKAGE VALIDATION SUMMARY ===
[INFO] Total Components: 10
[INFO] Passing Components: 10
[INFO] Pass Rate: 100%
[SUCCESS] Package is production-ready!
=== BUILD VALIDATION ===
[INFO] Building package: @smolitux/core
[SUCCESS] Build successful for @smolitux/core
=== TEST VALIDATION ===
[INFO] Testing package: @smolitux/core
[SUCCESS] Tests passed for @smolitux/core
=== LINT VALIDATION ===
[INFO] Linting package: @smolitux/core
[SUCCESS] Lint passed for @smolitux/core
[SUCCESS] Quality validation complete!
```

### Example 3: Component Validation

```bash
bash scripts/workflows/validate-quality.sh --package core --component Button
```

Output:
```
=== QUALITY VALIDATION: @smolitux/core/Button ===
[SUCCESS] TypeScript strict compliance
[SUCCESS] Test file exists
[SUCCESS] Story file exists
[SUCCESS] Accessibility tests present
[SUCCESS] forwardRef implemented
[SUCCESS] Test ID present
[SUCCESS] Proper exports
[INFO] Quality Score: 10/10
[SUCCESS] Component is production-ready!
=== TEST VALIDATION ===
[INFO] Testing component: @smolitux/core/Button
[SUCCESS] Tests passed for @smolitux/core/Button
[SUCCESS] Quality validation complete!
```

## Quality Criteria

The quality validation workflow checks the following criteria:

### TypeScript Compliance

- No use of `any` type
- No use of `@ts-ignore`
- Proper interfaces and types
- JSDoc comments

### Test Coverage

- Test file exists
- Tests cover all component functionality
- Tests pass

### Story Coverage

- Story file exists
- Stories cover all component variants
- Stories include documentation

### Accessibility

- Accessibility tests present
- No accessibility violations
- Proper ARIA attributes

### Component Structure

- forwardRef implemented
- Test ID present
- Proper exports
- Proper event handling

## Best Practices

- Always run the quality validation after making changes
- Fix all issues before committing changes
- Use the package and component options to focus on specific areas
- Generate a coverage dashboard to track progress
- Review the validation results carefully

## Common Issues and Solutions

### Issue: TypeScript errors

**Cause**: Components don't meet the TypeScript standards.

**Solution**:
```typescript
// Replace any with a more specific type
const value: string = 'value'; // Instead of any

// Or use unknown for truly unknown types
const value: unknown = someValue;
```

### Issue: Test failures

**Cause**: Tests don't pass or are missing.

**Solution**:
```bash
# Generate missing tests
bash scripts/workflows/complete-components.sh --package core --component Button

# Fix test failures
# Edit the test file and fix the issues
```

### Issue: Lint errors

**Cause**: Components don't meet the ESLint standards.

**Solution**:
```bash
# Fix lint errors
npm run lint --fix
```

### Issue: Build failures

**Cause**: Components don't build correctly.

**Solution**:
```bash
# Check build errors
npm run build --workspace=@smolitux/core

# Fix build errors
# Edit the component files and fix the issues
```

### Issue: Low coverage

**Cause**: Components don't have enough tests or stories.

**Solution**:
```bash
# Generate missing tests and stories
bash scripts/workflows/complete-components.sh --package core --component Button

# Check coverage
bash scripts/workflows/generate-coverage-dashboard.sh
```