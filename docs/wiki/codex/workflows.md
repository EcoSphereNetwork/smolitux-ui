# Smolitux UI - Workflows

This document provides detailed workflow documentation for common tasks when working with the Smolitux UI component library using the Codex agent system.

## 📋 Table of Contents

- [Repository Analysis Workflow](#repository-analysis-workflow)
- [Bulk Completion Workflow](#bulk-completion-workflow)
- [Package-by-Package Development Workflow](#package-by-package-development-workflow)
- [Component-by-Component Development Workflow](#component-by-component-development-workflow)
- [Quality Validation Workflow](#quality-validation-workflow)
- [Progress Tracking Workflow](#progress-tracking-workflow)

## Repository Analysis Workflow

The repository analysis workflow is used to understand the current state of the repository before starting any work.

### Steps

1. **Run the repository analyzer**
   ```bash
   bash scripts/workflows/analyze-repo.sh
   ```

2. **Review the analysis results**
   - Total components
   - Test coverage
   - Story coverage
   - Validation issues

3. **Check component status**
   ```bash
   cat COMPONENT_STATUS.md
   ```

4. **Determine the appropriate workflow**
   - >50% missing files: Use [Bulk Completion Workflow](#bulk-completion-workflow)
   - 20-50% missing files: Use [Package-by-Package Development Workflow](#package-by-package-development-workflow)
   - <20% missing files: Use [Component-by-Component Development Workflow](#component-by-component-development-workflow)

### Example

```bash
# Run the repository analyzer
bash scripts/workflows/analyze-repo.sh

# Check component status
cat COMPONENT_STATUS.md

# Determine the appropriate workflow based on the analysis results
# For example, if 60% of components are missing tests or stories:
bash scripts/workflows/complete-components.sh --all
```

## Bulk Completion Workflow

The bulk completion workflow is used when more than 50% of components are missing tests or stories.

### Steps

1. **Generate missing files**
   ```bash
   bash scripts/workflows/complete-components.sh --all
   ```

2. **Validate quality**
   ```bash
   bash scripts/workflows/validate-quality.sh
   ```

3. **Review generated files**
   - Check for any issues with the generated files
   - Make any necessary adjustments

4. **Update progress**
   ```bash
   bash scripts/workflows/generate-coverage-dashboard.sh
   ```

### Example

```bash
# Generate missing files
bash scripts/workflows/complete-components.sh --all

# Validate quality
bash scripts/workflows/validate-quality.sh

# Update progress
bash scripts/workflows/generate-coverage-dashboard.sh
```

## Package-by-Package Development Workflow

The package-by-package development workflow is used when 20-50% of components are missing tests or stories.

### Steps

1. **Select a package**
   ```bash
   PACKAGE="core"  # Start with high-priority packages
   ```

2. **List components**
   ```bash
   find packages/@smolitux/$PACKAGE/src/components -type d -mindepth 1 -maxdepth 1
   ```

3. **Complete components**
   ```bash
   bash scripts/workflows/complete-components.sh --package $PACKAGE
   ```

4. **Validate quality**
   ```bash
   bash scripts/workflows/validate-quality.sh --package $PACKAGE
   ```

5. **Update progress**
   ```bash
   bash scripts/workflows/generate-coverage-dashboard.sh --package $PACKAGE
   ```

6. **Move to the next package**
   - Repeat steps 1-5 for each package in priority order

### Example

```bash
# Select a package
PACKAGE="core"

# List components
find packages/@smolitux/$PACKAGE/src/components -type d -mindepth 1 -maxdepth 1

# Complete components
bash scripts/workflows/complete-components.sh --package $PACKAGE

# Validate quality
bash scripts/workflows/validate-quality.sh --package $PACKAGE

# Update progress
bash scripts/workflows/generate-coverage-dashboard.sh --package $PACKAGE
```

## Component-by-Component Development Workflow

The component-by-component development workflow is used when less than 20% of components are missing tests or stories, or for quality enhancement of specific components.

### Steps

1. **Select a component**
   ```bash
   PACKAGE="core"
   COMPONENT="Button"
   ```

2. **Analyze component**
   ```bash
   bash scripts/workflows/analyze-component.sh --package $PACKAGE --component $COMPONENT
   ```

3. **Complete component**
   ```bash
   bash scripts/workflows/complete-component.sh --package $PACKAGE --component $COMPONENT
   ```

4. **Validate component**
   ```bash
   npm run lint --workspace=@smolitux/$PACKAGE
   npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests
   ```

5. **Update progress**
   ```bash
   echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
   ```

6. **Move to the next component**
   - Repeat steps 1-5 for each component in priority order

### Example

```bash
# Select a component
PACKAGE="core"
COMPONENT="Button"

# Analyze component
bash scripts/workflows/analyze-component.sh --package $PACKAGE --component $COMPONENT

# Complete component
bash scripts/workflows/complete-component.sh --package $PACKAGE --component $COMPONENT

# Validate component
npm run lint --workspace=@smolitux/$PACKAGE
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests

# Update progress
echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
```

## Quality Validation Workflow

The quality validation workflow is used to ensure that all components meet the quality standards.

### Steps

1. **Run the quality validation script**
   ```bash
   bash scripts/workflows/validate-quality.sh
   ```

2. **Review the validation results**
   - TypeScript errors
   - ESLint errors
   - Test failures
   - Build status
   - Coverage percentage

3. **Fix any issues**
   - Address any TypeScript errors
   - Fix any ESLint errors
   - Fix any test failures
   - Fix any build issues

4. **Re-run the validation**
   ```bash
   bash scripts/workflows/validate-quality.sh
   ```

### Example

```bash
# Run the quality validation script
bash scripts/workflows/validate-quality.sh

# Fix any issues
# For example, if there are TypeScript errors:
npm run lint --fix

# Re-run the validation
bash scripts/workflows/validate-quality.sh
```

## Progress Tracking Workflow

The progress tracking workflow is used to track progress and generate reports.

### Steps

1. **Generate coverage dashboard**
   ```bash
   bash scripts/workflows/generate-coverage-dashboard.sh
   ```

2. **Check component status**
   ```bash
   cat COMPONENT_STATUS.md
   ```

3. **Create session report**
   ```bash
   cat > SESSION_REPORT.md << EOF
   # Codex Session Report - $(date +%Y-%m-%d)

   ## 📊 Session Metrics
   - **Duration**: [X] minutes
   - **Package**: @smolitux/[package]
   - **Components**: [X] completed
   - **Coverage**: [X]% → [Y]%

   ## ✅ Completed
   | Component | Implementation | Tests | Stories | Coverage | Notes |
   |-----------|---------------|-------|---------|----------|-------|
   | Button    | ✅            | ✅    | ✅      | 98%      | Complete |

   ## 🔧 Issues Fixed
   - [List specific fixes applied]

   ## 📊 Quality Metrics
   - TypeScript Errors: [X] → 0
   - ESLint Errors: [X] → 0
   - Test Coverage: [X]% → [Y]%
   - Build Status: ✅ Success

   ## 🎯 Next Session
   - [Specific next steps and priorities]
   EOF
   ```

### Example

```bash
# Generate coverage dashboard
bash scripts/workflows/generate-coverage-dashboard.sh

# Check component status
cat COMPONENT_STATUS.md

# Create session report
cat > SESSION_REPORT.md << EOF
# Codex Session Report - $(date +%Y-%m-%d)

## 📊 Session Metrics
- **Duration**: 60 minutes
- **Package**: @smolitux/core
- **Components**: 5 completed
- **Coverage**: 85% → 92%

## ✅ Completed
| Component | Implementation | Tests | Stories | Coverage | Notes |
|-----------|---------------|-------|---------|----------|-------|
| Button    | ✅            | ✅    | ✅      | 98%      | Complete |
| Input     | ✅            | ✅    | ✅      | 95%      | Complete |
| Card      | ✅            | ✅    | ✅      | 90%      | Complete |
| Modal     | ✅            | ✅    | ✅      | 92%      | Complete |
| Table     | ✅            | ✅    | ✅      | 88%      | Complete |

## 🔧 Issues Fixed
- Fixed TypeScript errors in Button component
- Added missing accessibility tests to Input component
- Fixed ESLint errors in Card component
- Added missing story variants to Modal component
- Fixed test failures in Table component

## 📊 Quality Metrics
- TypeScript Errors: 12 → 0
- ESLint Errors: 5 → 0
- Test Coverage: 85% → 92%
- Build Status: ✅ Success

## 🎯 Next Session
- Continue with @smolitux/layout package
- Focus on Container, Grid, and Flex components
EOF
```

These workflows provide detailed guidance for common tasks when working with the Smolitux UI component library using the Codex agent system. For more information, refer to the [Component Patterns](./component-patterns.md) and [Package-Specific Guidelines](./package-specific/README.md).