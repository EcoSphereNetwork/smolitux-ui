# Smolitux UI Codex Quick Reference

**Concise reference guide for AI agents working on the Smolitux UI component library**

## 🚀 Quick Start

### Decision Tree

```
START HERE
    ↓
Run Analyzer → Check Coverage → Choose Approach
    ↓              ↓                ↓
High Missing   Medium Missing   Low Missing
Files (>50%)   Files (20-50%)   Files (<20%)
    ↓              ↓                ↓
Bulk Approach  Targeted Work    Quality Focus
```

### Approach A: Bulk Completion

*Best when: Many missing files (>50%)*

```bash
# 1. Analyze current state (30 seconds)
bash scripts/analysis/smolitux-analyzer.sh

# 2. Bulk completion (5-10 minutes)
bash scripts/generation/smolitux-completion-finisher.sh --detailed

# 3. Quality enhancement (remainder of session)
# Focus on improving generated files
```

### Approach B: Targeted Development

*Best when: Medium missing files (20-50%)*

```bash
# 1. Quick assessment
bash scripts/analysis/smolitux-analyzer.sh

# 2. Focus on highest priority packages
PACKAGES=("core" "theme" "utils" "layout")

# 3. Component-by-component workflow (5-8 min each)
for pkg in "${PACKAGES[@]}"; do
    echo "🔧 Working on @smolitux/$pkg"
    # Apply 5-8 minute workflow per component
done
```

### Approach C: Quality Enhancement

*Best when: Low missing files (<20%)*

```bash
# Focus on quality improvements:
# - TypeScript strict compliance
# - Enhanced test coverage
# - Performance optimization
# - Accessibility improvements
```

## 📋 Package Priority Matrix

| Priority | Package | Focus | Time Estimate |
|----------|---------|-------|---------------|
| **P0** | `@smolitux/core` | Foundation components | 2-3 hours |
| **P0** | `@smolitux/theme` | Design system | 1 hour |
| **P1** | `@smolitux/utils` | Utility functions | 1-2 hours |
| **P1** | `@smolitux/testing` | Test utilities | 30 min |
| **P1** | `@smolitux/layout` | Layout components | 1 hour |
| **P2** | `@smolitux/charts` | Data visualization | 2-3 hours |
| **P2** | `@smolitux/media` | Media components | 1-2 hours |
| **P3** | `@smolitux/ai` | AI components | 2-3 hours |
| **P3** | `@smolitux/blockchain` | Crypto components | 2-3 hours |
| **P3** | `@smolitux/community` | Social features | 1-2 hours |
| **P4** | `@smolitux/resonance` | Platform features | 3-4 hours |
| **P4** | `@smolitux/federation` | Cross-platform | 2-3 hours |
| **P4** | `@smolitux/voice-control` | Voice interfaces | 2-3 hours |

## 🔧 5-8 Minute Component Workflow

### Minute 0-1: Quick Analysis

```bash
COMPONENT="Button"
PACKAGE="core"

# Inspect current state
ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/
echo "Files found: $(ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/ | wc -l)"

# Check for missing files
[ ! -f "packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.test.tsx" ] && echo "❌ Missing test"
[ ! -f "packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.stories.tsx" ] && echo "❌ Missing story"
```

### Minute 1-3: Implementation

**Essential component structure:**

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ children, className, variant = 'primary', disabled, onClick, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={clsx('smx-component', `smx-component--${variant}`, className)}
        disabled={disabled}
        onClick={onClick}
        data-testid="Component"
        {...props}
      >
        {children}
      </element>
    );
  }
);

Component.displayName = 'Component';
export default Component;
```

### Minute 3-5: Testing

**Essential test structure:**

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Component } from './Component';

expect.extend(toHaveNoViolations);

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component>Test</Component>);
    expect(screen.getByTestId('Component')).toBeInTheDocument();
  });

  it('handles interactions', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Component onClick={handleClick}>Test</Component>);
    await user.click(screen.getByTestId('Component'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Minute 5-7: Documentation

**Essential story structure:**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Package/Component',
  component: Component,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Default Component' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component disabled>Disabled</Component>
    </div>
  ),
};
```

### Minute 7-8: Validation

```bash
# Quick validation
npm run lint --workspace=@smolitux/$PACKAGE
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests

# Update progress
echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
```

## 🛠️ Essential Tools & Commands

### Analysis Tools
```bash
# Repository state analysis
bash scripts/analysis/smolitux-analyzer.sh

# Coverage dashboard
bash scripts/analysis/generate-coverage-dashboard.sh
```

### Development Commands
```bash
# Lint specific package
npm run lint --workspace=@smolitux/core

# Test specific package
npm test --workspace=@smolitux/core

# Build specific package
npm run build --workspace=@smolitux/core

# Run all tests
npm test

# Build all packages
npm run build
```

### Quick Fixes
```bash
# Fix missing React imports
find packages -name "*.tsx" -exec grep -l "React\." {} \; | while read file; do
  [[ ! $(head -1 "$file") =~ ^import.*React ]] && sed -i '1i import React from '\''react'\'';' "$file"
done

# Add missing exports
find packages -name "*.tsx" | grep -v "\.test\.\|\.stories\." | while read file; do
  BASENAME=$(basename "$file" .tsx)
  grep -q "export.*$BASENAME\|export default" "$file" || echo "export default $BASENAME;" >> "$file"
done

# Fix TypeScript any types
find packages -name "*.tsx" -exec sed -i 's/: any\b/: unknown/g' {} \;
```

## ⚠️ Critical Dos & Don'ts

### ✅ ALWAYS DO
1. **Run analyzer first** - understand current state
2. **Work systematically** - follow package priority order
3. **Validate each step** - test before moving on
4. **Use proper typing** - no `any` types allowed
5. **Include accessibility** - jest-axe tests required
6. **Forward refs** - use forwardRef pattern
7. **Add test-ids** - data-testid for all components
8. **Update progress** - maintain status files

### ❌ NEVER DO
1. **Skip validation** - always test changes
2. **Generate duplicates** - check existing files first
3. **Use any types** - maintain TypeScript strict mode
4. **Ignore accessibility** - a11y is mandatory
5. **Work without context** - always understand current state
6. **Skip documentation** - stories are required
7. **Ignore performance** - monitor bundle size
8. **Make breaking changes** - maintain backward compatibility