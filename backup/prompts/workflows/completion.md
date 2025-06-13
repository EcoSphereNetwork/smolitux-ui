# Smolitux UI - Completion Workflow

This document provides workflow-specific context and guidelines for the component completion workflow in the Smolitux UI component library.

## Workflow Context

The component completion workflow is used to generate missing files for components, including tests and stories, and to fix validation issues. It helps ensure that all components meet the quality standards.

## Step-by-Step Instructions

### 1. Run the Repository Analyzer

Before running the completion workflow, it's a good idea to analyze the repository to understand the current state:

```bash
bash scripts/workflows/analyze-repo.sh
```

### 2. Choose the Appropriate Completion Approach

Based on the analysis results, choose the appropriate completion approach:

#### Bulk Completion (>50% missing files)

If more than 50% of components are missing tests or stories, use the bulk completion workflow:

```bash
bash scripts/workflows/complete-components.sh --all
```

#### Package-by-Package Completion (20-50% missing files)

If 20-50% of components are missing tests or stories, use the package-by-package completion workflow:

```bash
bash scripts/workflows/complete-components.sh --package core
```

#### Component-by-Component Completion (<20% missing files)

If less than 20% of components are missing tests or stories, use the component-by-component completion workflow:

```bash
bash scripts/workflows/complete-components.sh --package core --component Button
```

### 3. Validate Quality

After running the completion workflow, validate the quality of the components:

```bash
bash scripts/workflows/validate-quality.sh
```

### 4. Generate Coverage Dashboard

After validating the quality, generate a coverage dashboard to track progress:

```bash
bash scripts/workflows/generate-coverage-dashboard.sh
```

## Examples

### Example 1: Bulk Completion

```bash
bash scripts/workflows/complete-components.sh --all
```

Output:
```
=== COMPLETING ALL PACKAGES ===
=== COMPLETING PACKAGE: @smolitux/core ===
=== COMPLETING COMPONENT: @smolitux/core/Button ===
[INFO] Component file already exists: packages/@smolitux/core/src/components/Button/Button.tsx
[INFO] Fixing validation issues in: packages/@smolitux/core/src/components/Button/Button.tsx
[SUCCESS] Fixed validation issues in: packages/@smolitux/core/src/components/Button/Button.tsx
[INFO] Test file already exists: packages/@smolitux/core/src/components/Button/Button.test.tsx
[INFO] Story file already exists: packages/@smolitux/core/src/components/Button/Button.stories.tsx
[INFO] Index file already exists: packages/@smolitux/core/src/components/Button/index.ts
[SUCCESS] Component completion successful: @smolitux/core/Button
=== COMPLETING COMPONENT: @smolitux/core/Input ===
[INFO] Component file already exists: packages/@smolitux/core/src/components/Input/Input.tsx
[INFO] Fixing validation issues in: packages/@smolitux/core/src/components/Input/Input.tsx
[SUCCESS] Fixed validation issues in: packages/@smolitux/core/src/components/Input/Input.tsx
[INFO] Test file already exists: packages/@smolitux/core/src/components/Input/Input.test.tsx
[INFO] Story file already exists: packages/@smolitux/core/src/components/Input/Input.stories.tsx
[INFO] Index file already exists: packages/@smolitux/core/src/components/Input/index.ts
[SUCCESS] Component completion successful: @smolitux/core/Input
...
=== COMPLETING PACKAGE: @smolitux/theme ===
...
[SUCCESS] All packages completion successful
[SUCCESS] Completion workflow complete!
```

### Example 2: Package-by-Package Completion

```bash
bash scripts/workflows/complete-components.sh --package core
```

Output:
```
=== COMPLETING PACKAGE: @smolitux/core ===
=== COMPLETING COMPONENT: @smolitux/core/Button ===
[INFO] Component file already exists: packages/@smolitux/core/src/components/Button/Button.tsx
[INFO] Fixing validation issues in: packages/@smolitux/core/src/components/Button/Button.tsx
[SUCCESS] Fixed validation issues in: packages/@smolitux/core/src/components/Button/Button.tsx
[INFO] Test file already exists: packages/@smolitux/core/src/components/Button/Button.test.tsx
[INFO] Story file already exists: packages/@smolitux/core/src/components/Button/Button.stories.tsx
[INFO] Index file already exists: packages/@smolitux/core/src/components/Button/index.ts
[SUCCESS] Component completion successful: @smolitux/core/Button
=== COMPLETING COMPONENT: @smolitux/core/Input ===
[INFO] Component file already exists: packages/@smolitux/core/src/components/Input/Input.tsx
[INFO] Fixing validation issues in: packages/@smolitux/core/src/components/Input/Input.tsx
[SUCCESS] Fixed validation issues in: packages/@smolitux/core/src/components/Input/Input.tsx
[INFO] Test file already exists: packages/@smolitux/core/src/components/Input/Input.test.tsx
[INFO] Story file already exists: packages/@smolitux/core/src/components/Input/Input.stories.tsx
[INFO] Index file already exists: packages/@smolitux/core/src/components/Input/index.ts
[SUCCESS] Component completion successful: @smolitux/core/Input
...
[SUCCESS] Package completion successful: @smolitux/core
[SUCCESS] Completion workflow complete!
```

### Example 3: Component-by-Component Completion

```bash
bash scripts/workflows/complete-components.sh --package core --component Button
```

Output:
```
=== COMPLETING COMPONENT: @smolitux/core/Button ===
[INFO] Component file already exists: packages/@smolitux/core/src/components/Button/Button.tsx
[INFO] Fixing validation issues in: packages/@smolitux/core/src/components/Button/Button.tsx
[SUCCESS] Fixed validation issues in: packages/@smolitux/core/src/components/Button/Button.tsx
[INFO] Test file already exists: packages/@smolitux/core/src/components/Button/Button.test.tsx
[INFO] Story file already exists: packages/@smolitux/core/src/components/Button/Button.stories.tsx
[INFO] Index file already exists: packages/@smolitux/core/src/components/Button/index.ts
[SUCCESS] Component completion successful: @smolitux/core/Button
[SUCCESS] Completion workflow complete!
```

## Generated Files

### Component File

The completion workflow generates component files with the following structure:

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the Component
 */
export interface ComponentProps {
  /** Content to display inside the component */
  children?: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Component description
 */
export const Component = forwardRef<HTMLElement, ComponentProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      onClick,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // CSS classes with conditional logic
    const componentClasses = clsx(
      'component',
      `component--${variant}`,
      `component--${size}`,
      {
        'component--disabled': disabled,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={componentClasses}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        data-testid="Component"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = 'Component';

export default Component;
```

### Test File

The completion workflow generates test files with the following structure:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Component } from './Component';

expect.extend(toHaveNoViolations);

describe('Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<Component>Custom Content</Component>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Component className="custom-class">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('custom-class');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--primary');
    });

    it('renders secondary variant correctly', () => {
      render(<Component variant="secondary">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--secondary');
    });

    it('renders danger variant correctly', () => {
      render(<Component variant="danger">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--danger');
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Component>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--md');
    });

    it('renders small size correctly', () => {
      render(<Component size="sm">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--sm');
    });

    it('renders large size correctly', () => {
      render(<Component size="lg">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--lg');
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Component disabled>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass('component--disabled');
      expect(screen.getByTestId('Component')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Component onClick={handleClick}>Test</Component>);

      await user.click(screen.getByTestId('Component'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Component onClick={handleClick} disabled>Test</Component>);

      await user.click(screen.getByTestId('Component'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Component ref={ref}>Test</Component>);
      expect(ref.current).not.toBeNull();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Component>Test</Component>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports ARIA labels', () => {
      render(<Component aria-label="Custom Label">Test</Component>);
      expect(screen.getByTestId('Component')).toHaveAttribute('aria-label', 'Custom Label');
    });
  });
});
```

### Story File

The completion workflow generates story files with the following structure:

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
        component: 'Description of the Component functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual variant of the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Content to display inside the component',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Component',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="danger">Danger</Component>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Component',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    onClick: () => console.log('Component clicked!'),
  },
};
```

### Index File

The completion workflow generates index files with the following structure:

```typescript
export * from './Component';
export { default } from './Component';
```

## Best Practices

- Always run the repository analysis before running the completion workflow
- Use the appropriate completion approach based on the analysis results
- Validate quality after running the completion workflow
- Generate a coverage dashboard to track progress
- Review the generated files and make any necessary adjustments
- Run tests to ensure all components work correctly

## Common Issues and Solutions

### Issue: Script fails with "Permission denied"

**Cause**: Script files don't have execute permission.

**Solution**:
```bash
chmod +x scripts/workflows/complete-components.sh
```

### Issue: Script fails with "No such file or directory"

**Cause**: Script files not found or incorrect path.

**Solution**:
```bash
# Check script path
ls -la scripts/workflows/

# Run script with correct path
bash scripts/workflows/complete-components.sh
```

### Issue: Generated files have incorrect content

**Cause**: Templates or generation logic is incorrect.

**Solution**:
```bash
# Check templates
cat scripts/core/completion.sh

# Fix templates and regenerate files
bash scripts/workflows/complete-components.sh --package core --component Button
```

### Issue: Validation fails after completion

**Cause**: Generated files don't meet the quality standards.

**Solution**:
```bash
# Check validation issues
bash scripts/workflows/validate-quality.sh --package core --component Button

# Fix issues and revalidate
bash scripts/workflows/complete-components.sh --package core --component Button
bash scripts/workflows/validate-quality.sh --package core --component Button
```