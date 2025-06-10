#!/usr/bin/env node

/**
 * Smolitux UI Component Generator
 * 
 * This script generates new component files from templates, including:
 * - Component file
 * - Test file
 * - Story file
 * 
 * Usage:
 * node scripts/generation/component-generator.js --name Button --package core
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Parse command line arguments
program
  .option('--name <name>', 'Component name (e.g., Button)')
  .option('--package <name>', 'Package name (e.g., core)')
  .option('--force', 'Overwrite existing files')
  .option('--variant <variant>', 'Component variant (basic, form, data, overlay)', 'basic')
  .parse(process.argv);

const options = program.opts();

// Validate required options
if (!options.name) {
  console.error('Error: Component name is required');
  process.exit(1);
}

if (!options.package) {
  console.error('Error: Package name is required');
  process.exit(1);
}

// Set up paths
const componentName = options.name;
const packageName = options.package;
const componentDir = path.join(process.cwd(), 'packages', '@smolitux', packageName, 'src', 'components', componentName);
const componentFile = path.join(componentDir, `${componentName}.tsx`);
const testFile = path.join(componentDir, `${componentName}.test.tsx`);
const storyFile = path.join(componentDir, `${componentName}.stories.tsx`);

// Check if component directory exists
if (fs.existsSync(componentDir) && !options.force) {
  console.error(`Error: Component directory already exists: ${componentDir}`);
  console.error('Use --force to overwrite existing files');
  process.exit(1);
}

// Create component directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
  console.log(`Created directory: ${componentDir}`);
}

// Generate component file
const componentTemplate = `import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the ${componentName} component
 */
export interface ${componentName}Props {
  /** Content to display inside the component */
  children?: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * ${componentName} component
 *
 * @description
 * A versatile ${componentName.toLowerCase()} component with multiple variants and sizes.
 *
 * @example
 * \`\`\`tsx
 * <${componentName} variant="primary">Content</${componentName}>
 * \`\`\`
 */
export const ${componentName} = forwardRef<HTMLElement, ${componentName}Props>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'smx-${componentName.toLowerCase()}',
          \`smx-${componentName.toLowerCase()}--\${variant}\`,
          \`smx-${componentName.toLowerCase()}--\${size}\`,
          {
            'smx-${componentName.toLowerCase()}--disabled': disabled,
          },
          className
        )}
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled}
        data-testid="${componentName}"
        {...props}
      >
        {children}
      </div>
    );
  }
);

${componentName}.displayName = '${componentName}';

export default ${componentName};
`;

// Generate test file
const testTemplate = `import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ${componentName} } from './${componentName}';

expect.extend(toHaveNoViolations);

describe('${componentName}', () => {
  // Rendering tests
  it('renders without crashing', () => {
    render(<${componentName}>Test</${componentName}>);
    expect(screen.getByTestId('${componentName}')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<${componentName}>Test Content</${componentName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<${componentName} className="custom-class">Test</${componentName}>);
    expect(screen.getByTestId('${componentName}')).toHaveClass('custom-class');
  });

  // Variant tests
  it('applies the correct variant class', () => {
    render(<${componentName} variant="secondary">Test</${componentName}>);
    expect(screen.getByTestId('${componentName}')).toHaveClass('smx-${componentName.toLowerCase()}--secondary');
  });

  // Size tests
  it('applies the correct size class', () => {
    render(<${componentName} size="lg">Test</${componentName}>);
    expect(screen.getByTestId('${componentName}')).toHaveClass('smx-${componentName.toLowerCase()}--lg');
  });

  // Disabled state tests
  it('applies disabled state correctly', () => {
    render(<${componentName} disabled>Test</${componentName}>);
    const element = screen.getByTestId('${componentName}');
    expect(element).toHaveClass('smx-${componentName.toLowerCase()}--disabled');
    expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  // Interaction tests
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<${componentName} onClick={handleClick}>Test</${componentName}>);
    
    await user.click(screen.getByTestId('${componentName}'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<${componentName} onClick={handleClick} disabled>Test</${componentName}>);
    
    await user.click(screen.getByTestId('${componentName}'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Accessibility tests
  it('has no accessibility violations', async () => {
    const { container } = render(<${componentName}>Test</${componentName}>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
`;

// Generate story file
const storyTemplate = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${packageName.charAt(0).toUpperCase() + packageName.slice(1)}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: \`
${componentName} is a versatile component that supports multiple variants and sizes.

## Features
- Multiple variants (primary, secondary, tertiary, danger)
- Multiple sizes (sm, md, lg)
- Disabled state
- Full accessibility support
        \`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: 'Visual variant of the component',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the component',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
    },
    children: {
      control: { type: 'text' },
      description: 'Content to display inside the component',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ${componentName}',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary ${componentName}',
    variant: 'secondary',
    size: 'md',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary ${componentName}',
    variant: 'tertiary',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger ${componentName}',
    variant: 'danger',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small ${componentName}',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium ${componentName}',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large ${componentName}',
    variant: 'primary',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled ${componentName}',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <${componentName} variant="primary">Primary</${componentName}>
        <${componentName} variant="secondary">Secondary</${componentName}>
        <${componentName} variant="tertiary">Tertiary</${componentName}>
        <${componentName} variant="danger">Danger</${componentName}>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <${componentName} size="sm">Small</${componentName}>
        <${componentName} size="md">Medium</${componentName}>
        <${componentName} size="lg">Large</${componentName}>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <${componentName} disabled>Disabled</${componentName}>
      </div>
    </div>
  ),
};
`;

// Write files
fs.writeFileSync(componentFile, componentTemplate);
fs.writeFileSync(testFile, testTemplate);
fs.writeFileSync(storyFile, storyTemplate);

console.log(`✅ Generated component files for ${componentName} in @smolitux/${packageName}:`);
console.log(`  - ${componentFile}`);
console.log(`  - ${testFile}`);
console.log(`  - ${storyFile}`);

// Update progress
const progressFile = path.join(process.cwd(), 'COMPONENT_STATUS.md');
const progressEntry = `✅ ${componentName} (@smolitux/${packageName}): Generated (${new Date().toISOString()})\n`;

if (fs.existsSync(progressFile)) {
  fs.appendFileSync(progressFile, progressEntry);
} else {
  fs.writeFileSync(progressFile, `# Component Status\n\n${progressEntry}`);
}

console.log(`📝 Updated progress in COMPONENT_STATUS.md`);
console.log(`🚀 Next steps:`);
console.log(`  1. Review and customize the generated files`);
console.log(`  2. Run tests: npm test --workspace=@smolitux/${packageName} -- --testPathPattern="${componentName}"`);
console.log(`  3. Run lint: npm run lint --workspace=@smolitux/${packageName}`);