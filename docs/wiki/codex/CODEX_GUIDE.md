# Smolitux UI Codex Development Guide

**Comprehensive guide for AI agents working on the Smolitux UI component library**

## Table of Contents

1. [Introduction](#introduction)
2. [Repository Structure](#repository-structure)
3. [Development Workflow](#development-workflow)
4. [Package Development](#package-development)
5. [Component Development](#component-development)
6. [Testing Strategy](#testing-strategy)
7. [Documentation Standards](#documentation-standards)
8. [Quality Assurance](#quality-assurance)
9. [Tools & Scripts](#tools--scripts)
10. [Best Practices](#best-practices)

## Introduction

The Smolitux UI project aims to create a comprehensive, production-ready component library with:

- ✅ **100% functional components** across all packages
- ✅ **Zero TypeScript/ESLint errors** in production builds
- ✅ **Complete test coverage** with all tests passing
- ✅ **Full Storybook documentation** with interactive examples
- ✅ **Accessibility compliance** (WCAG 2.1 AA standard)

This guide provides a structured approach for AI agents to efficiently contribute to the project.

## Repository Structure

```
smolitux-ui/
├── packages/@smolitux/
│   ├── core/              # Foundation components (Button, Input, Modal)
│   ├── theme/             # Design system & theming
│   ├── utils/             # Utility functions & helpers
│   ├── testing/           # Test utilities & mocks
│   ├── layout/            # Layout components (Grid, Flex, Container)
│   ├── charts/            # Data visualization components
│   ├── media/             # Audio/Video/Image components
│   ├── community/         # Social & community features
│   ├── ai/                # AI-powered components
│   ├── blockchain/        # Crypto/DeFi components
│   ├── resonance/         # Platform-specific features
│   ├── federation/        # Cross-platform integration
│   └── voice-control/     # Voice interface components
├── docs/                  # Documentation & wiki
│   ├── wiki/              # Wiki documentation
│   └── prompts/           # Modular prompt system
├── scripts/               # Development & automation scripts
│   ├── analysis/          # Analysis scripts
│   ├── generation/        # Generation scripts
│   ├── validation/        # Validation scripts
│   ├── prompts/           # Prompt scripts
│   └── utils/             # Utility scripts
└── test-utils/            # Shared testing utilities
```

### Package Priority Matrix

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

## Development Workflow

### Quick Start Decision Tree

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

## Package Development

Each package in the Smolitux UI library has specific requirements and considerations. Refer to the package-specific AGENTS.md files for detailed guidance:

- `/packages/@smolitux/core/AGENTS.md`
- `/packages/@smolitux/theme/AGENTS.md`
- etc.

### Package Development Workflow

1. **Analysis**: Understand the package's purpose and dependencies
2. **Component Inventory**: Identify all components in the package
3. **Prioritization**: Prioritize components based on usage and complexity
4. **Implementation**: Develop components systematically
5. **Integration**: Ensure components work together properly
6. **Validation**: Verify the package meets all quality standards

## Component Development

### 5-8 Minute Component Workflow

#### Minute 0-1: Quick Analysis

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

#### Minute 1-3: Implementation

Focus on:
- TypeScript interfaces
- forwardRef pattern
- Accessibility attributes
- Event handlers
- Proper styling

#### Minute 3-5: Testing

Focus on:
- Rendering tests
- Prop tests
- Event tests
- Accessibility tests
- Ref tests

#### Minute 5-7: Documentation

Focus on:
- Props documentation
- Usage examples
- Variant showcases
- Interactive examples

#### Minute 7-8: Validation

```bash
# Quick validation
npm run lint --workspace=@smolitux/$PACKAGE
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests

# Update progress
echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
```

### Component Structure

All components should follow this basic structure:

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ComponentProps {
  /** Component content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Component variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Component size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ children, className, variant = 'primary', size = 'md', disabled, onClick, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={clsx(
          'smx-component',
          `smx-component--${variant}`,
          `smx-component--${size}`,
          { 'smx-component--disabled': disabled },
          className
        )}
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

## Testing Strategy

### Test Structure

All components should have comprehensive tests covering:

1. **Rendering**: Verify the component renders correctly
2. **Props**: Verify props are applied correctly
3. **Events**: Verify event handlers are called
4. **Accessibility**: Verify accessibility compliance
5. **Ref Forwarding**: Verify ref forwarding works correctly

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Component } from './Component';

expect.extend(toHaveNoViolations);

describe('Component', () => {
  it('renders without crashing', () => {
    render(<Component>Test</Component>);
    expect(screen.getByTestId('Component')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Component className="custom-class">Test</Component>);
    expect(screen.getByTestId('Component')).toHaveClass('custom-class');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Component onClick={handleClick}>Test</Component>);
    
    await user.click(screen.getByTestId('Component'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Testing Tools

- **Jest**: Test runner
- **React Testing Library**: Component testing
- **jest-axe**: Accessibility testing
- **userEvent**: User interaction simulation

## Documentation Standards

### Storybook Stories

All components should have comprehensive Storybook stories:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Package/Component',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of the component functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
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
      <Component variant="tertiary">Tertiary</Component>
      <Component variant="danger">Danger</Component>
    </div>
  ),
};
```

### JSDoc Comments

All components and props should have JSDoc comments:

```typescript
/**
 * Component description
 */
export interface ComponentProps {
  /** Component content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Component variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
}
```

## Quality Assurance

### Component Completion Criteria

Before marking any component as complete:

- ✅ **TypeScript Compliance**: No `any` types, complete interfaces, strict mode
- ✅ **Accessibility**: WCAG 2.1 AA compliance, jest-axe tests passing
- ✅ **Testing**: ≥95% coverage, all interaction patterns tested
- ✅ **Documentation**: Complete Storybook stories with all variants
- ✅ **Performance**: <16ms render time, React.memo where appropriate
- ✅ **Build**: Clean TypeScript build, zero ESLint errors

### Package Completion Criteria

Before marking a package as complete:

- ✅ **Coverage**: ≥95% test coverage across all metrics
- ✅ **Build**: Successful build with no warnings
- ✅ **Exports**: All components properly exported
- ✅ **Dependencies**: No circular dependencies
- ✅ **Integration**: Cross-package compatibility verified

## Tools & Scripts

### Analysis Tools

```bash
# Repository state analysis
bash scripts/analysis/smolitux-analyzer.sh

# Component annotation
node scripts/utils/annotate-components.js

# Coverage dashboard
bash scripts/analysis/generate-coverage-dashboard.sh
```

### Development Tools

```bash
# Generate missing files
bash scripts/generation/smolitux-completion-finisher.sh --detailed

# Generate new component
node scripts/generation/component-generator.js --name Button --package core

# Validate component
node scripts/validation/component-validator.js --package core --component Button
```

### Prompt Tools

```bash
# Generate modular prompt
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package core --task component-development --template component

# Initialize Codex session
bash scripts/prompts/codex-init.sh --package core --component Button
```

## Best Practices

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