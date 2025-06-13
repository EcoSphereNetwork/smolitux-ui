# Smolitux UI - Analysis Workflow

This document provides workflow-specific context and guidelines for the repository analysis workflow in the Smolitux UI component library.

## Workflow Context

The repository analysis workflow is used to understand the current state of the repository before starting any work. It helps identify missing components, tests, and stories, as well as validation issues.

## Step-by-Step Instructions

### 1. Run the Repository Analyzer

```bash
bash scripts/workflows/analyze-repo.sh
```

This script will analyze the entire repository and provide a summary of the current state, including:

- Total components
- Test coverage
- Story coverage
- Validation issues

### 2. Review the Analysis Results

The analysis results will be displayed in the terminal. Pay attention to the following sections:

- **Repository Analysis**: Overview of the repository
- **Package Overview**: Status of each package
- **Component Status**: Status of each component
- **Validation Issues**: TypeScript, ESLint, and other issues
- **Completion Impact Prediction**: Expected results after completion

### 3. Check Component Status

```bash
cat COMPONENT_STATUS.md
```

This file contains a detailed status of all components in the repository, including:

- Implementation status
- Test status
- Story status
- Overall status

### 4. Determine the Appropriate Workflow

Based on the analysis results, determine the appropriate workflow to use:

- **>50% missing files**: Use the bulk completion workflow
- **20-50% missing files**: Use the package-by-package development workflow
- **<20% missing files**: Use the component-by-component development workflow

### 5. Analyze Specific Packages or Components

If you want to analyze a specific package or component, use the following commands:

```bash
# Analyze a specific package
bash scripts/workflows/analyze-repo.sh --package core

# Analyze a specific component
bash scripts/workflows/analyze-repo.sh --package core --component Button
```

## Examples

### Example 1: Repository Analysis

```bash
bash scripts/workflows/analyze-repo.sh
```

Output:
```
=== REPOSITORY ANALYSIS ===
[INFO] Analyzing packages...
[INFO] 📦 @smolitux/core
[INFO]   Components: 10
[INFO]   Tests: 8/10 (80%) | Missing: 2
[INFO]   Stories: 7/10 (70%) | Missing: 3
[INFO] 📦 @smolitux/theme
[INFO]   Components: 5
[INFO]   Tests: 3/5 (60%) | Missing: 2
[INFO]   Stories: 2/5 (40%) | Missing: 3
...

=== OVERALL SUMMARY ===
[INFO] Total Components: 50
[INFO] 
[INFO] Test Coverage:
[INFO]   ✅ Complete: 35 (70%)
[INFO]   ❌ Missing: 15
[INFO] 
[INFO] Story Coverage:
[INFO]   ✅ Complete: 30 (60%)
[INFO]   ❌ Missing: 20

=== VALIDATION ISSUES ANALYSIS ===
[INFO] Scanning for validation issues...
[INFO] React Import Issues: 5
[INFO] Missing Export Issues: 3
[INFO] TypeScript Issues (any/@ts-ignore): 8
[INFO] Missing Test-ID Issues: 12

=== COMPLETION IMPACT PREDICTION ===
[INFO] Files to be generated:
[INFO]   Test files: 15
[INFO]   Story files: 20
[INFO] 
[INFO] Issues to be fixed:
[INFO]   Total validation issues: 28
[INFO] 
[INFO] READY TO RUN COMPLETION WORKFLOW
[INFO] 
[INFO] Expected results after completion:
[INFO]   Test Coverage: 70% → 100%
[INFO]   Story Coverage: 60% → 100%
[INFO]   Validation Issues: 28 → 0
[INFO] 
[INFO] To proceed, run the completion workflow script.
[SUCCESS] Analysis complete!
```

### Example 2: Package Analysis

```bash
bash scripts/workflows/analyze-repo.sh --package core
```

Output:
```
=== PACKAGE ANALYSIS: @smolitux/core ===
[INFO] Components: 10
[INFO] Tests: 8/10 (80%) | Missing: 2
[INFO] Stories: 7/10 (70%) | Missing: 3

=== COMPONENT STATUS ===
[INFO] Button: Implementation ✅ | Test ✅ | Story ✅
[INFO] Input: Implementation ✅ | Test ✅ | Story ✅
[INFO] Checkbox: Implementation ✅ | Test ✅ | Story ✅
[INFO] Radio: Implementation ✅ | Test ✅ | Story ✅
[INFO] Select: Implementation ✅ | Test ✅ | Story ✅
[INFO] Textarea: Implementation ✅ | Test ✅ | Story ✅
[INFO] Switch: Implementation ✅ | Test ✅ | Story ✅
[INFO] Slider: Implementation ✅ | Test ❌ | Story ❌
[INFO] FormControl: Implementation ✅ | Test ❌ | Story ❌
[INFO] FormLabel: Implementation ✅ | Test ✅ | Story ❌

=== VALIDATION ISSUES ===
[INFO] React Import Issues: 2
[INFO] Missing Export Issues: 1
[INFO] TypeScript Issues (any/@ts-ignore): 3
[INFO] Missing Test-ID Issues: 4

=== COMPLETION IMPACT PREDICTION ===
[INFO] Files to be generated:
[INFO]   Test files: 2
[INFO]   Story files: 3
[INFO] 
[INFO] Issues to be fixed:
[INFO]   Total validation issues: 10
[INFO] 
[INFO] READY TO RUN COMPLETION WORKFLOW
[INFO] 
[INFO] Expected results after completion:
[INFO]   Test Coverage: 80% → 100%
[INFO]   Story Coverage: 70% → 100%
[INFO]   Validation Issues: 10 → 0
[INFO] 
[INFO] To proceed, run the completion workflow script for this package.
[SUCCESS] Package analysis complete!
```

### Example 3: Component Analysis

```bash
bash scripts/workflows/analyze-repo.sh --package core --component Button
```

Output:
```
=== COMPONENT ANALYSIS: @smolitux/core/Button ===
[INFO] Implementation: ✅
[INFO] Test: ✅
[INFO] Story: ✅

=== COMPONENT FILES ===
[INFO] Component file: packages/@smolitux/core/src/components/Button/Button.tsx
[INFO]   import React, { forwardRef } from 'react';
[INFO]   import { clsx } from 'clsx';
[INFO]   
[INFO]   /**
[INFO]    * Button variants
[INFO]    */
[INFO]   export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
[INFO]   
[INFO]   /**
[INFO]    * Button sizes
[INFO]    */
[INFO]   export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
[INFO]   ...
[INFO] Test file: packages/@smolitux/core/src/components/Button/Button.test.tsx
[INFO]   import React from 'react';
[INFO]   import { render, screen, fireEvent } from '@testing-library/react';
[INFO]   import userEvent from '@testing-library/user-event';
[INFO]   import { axe, toHaveNoViolations } from 'jest-axe';
[INFO]   import { Button } from './Button';
[INFO]   
[INFO]   expect.extend(toHaveNoViolations);
[INFO]   
[INFO]   describe('Button', () => {
[INFO]     // Basic rendering tests
[INFO]     describe('Rendering', () => {
[INFO]   ...
[INFO] Story file: packages/@smolitux/core/src/components/Button/Button.stories.tsx
[INFO]   import type { Meta, StoryObj } from '@storybook/react';
[INFO]   import { Button } from './Button';
[INFO]   
[INFO]   const meta: Meta<typeof Button> = {
[INFO]     title: 'Components/Core/Button',
[INFO]     component: Button,
[INFO]     parameters: {
[INFO]       layout: 'centered',
[INFO]       docs: {
[INFO]         description: {
[INFO]   ...

=== VALIDATION ISSUES ===

=== COMPLETION IMPACT PREDICTION ===
[SUCCESS] COMPONENT IS ALREADY COMPLETE!
[INFO] No missing files found.
[SUCCESS] Component analysis complete!
```

## Best Practices

- Always run the repository analysis before starting any work
- Pay attention to the validation issues section
- Use the detailed option for more verbose output
- Check the component status file for a comprehensive overview
- Use the package and component options to focus on specific areas

## Common Issues and Solutions

### Issue: Script fails with "Permission denied"

**Cause**: Script files don't have execute permission.

**Solution**:
```bash
chmod +x scripts/workflows/analyze-repo.sh
```

### Issue: Script fails with "No such file or directory"

**Cause**: Script files not found or incorrect path.

**Solution**:
```bash
# Check script path
ls -la scripts/workflows/

# Run script with correct path
bash scripts/workflows/analyze-repo.sh
```

### Issue: Analysis shows many validation issues

**Cause**: Components don't meet the quality standards.

**Solution**:
```bash
# Fix validation issues
bash scripts/workflows/complete-components.sh --package core

# Validate quality
bash scripts/workflows/validate-quality.sh --package core
```

### Issue: Analysis shows missing tests or stories

**Cause**: Components don't have tests or stories.

**Solution**:
```bash
# Generate missing files
bash scripts/workflows/complete-components.sh --package core

# Validate quality
bash scripts/workflows/validate-quality.sh --package core
```