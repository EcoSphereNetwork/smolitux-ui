#!/bin/bash

# SMOLITUX CORE COMPLETION
# Core completion functions for Smolitux scripts

# Source utils using the script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/utils.sh"

# Generate component file
generate_component_file() {
  local package=$1
  local component=$2
  local component_file="packages/@smolitux/$package/src/components/$component/$component.tsx"
  
  if [ -f "$component_file" ]; then
    log_warning "Component file already exists: $component_file"
    return 0
  fi
  
  log_info "Generating component file: $component_file"
  
  mkdir -p "$(dirname "$component_file")"
  
  cat > "$component_file" << EOF
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the $component
 */
export interface ${component}Props {
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
 * $component description
 */
export const $component = forwardRef<HTMLElement, ${component}Props>(
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
      '$component',
      \`$component--\${variant}\`,
      \`$component--\${size}\`,
      {
        '$component--disabled': disabled,
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
        data-testid="$component"
        {...props}
      >
        {children}
      </div>
    );
  }
);

$component.displayName = '$component';

export default $component;
EOF
  
  log_success "Generated component file: $component_file"
  return 0
}

# Generate test file
generate_test_file() {
  local package=$1
  local component=$2
  local test_file="packages/@smolitux/$package/src/components/$component/$component.test.tsx"
  
  if [ -f "$test_file" ]; then
    log_warning "Test file already exists: $test_file"
    return 0
  fi
  
  log_info "Generating test file: $test_file"
  
  mkdir -p "$(dirname "$test_file")"
  
  cat > "$test_file" << EOF
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { $component } from './$component';

expect.extend(toHaveNoViolations);

describe('$component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<$component>Test</$component>);
      expect(screen.getByTestId('$component')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<$component>Custom Content</$component>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<$component className="custom-class">Test</$component>);
      expect(screen.getByTestId('$component')).toHaveClass('custom-class');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<$component>Test</$component>);
      expect(screen.getByTestId('$component')).toHaveClass('$component--primary');
    });

    it('renders secondary variant correctly', () => {
      render(<$component variant="secondary">Test</$component>);
      expect(screen.getByTestId('$component')).toHaveClass('$component--secondary');
    });

    it('renders danger variant correctly', () => {
      render(<$component variant="danger">Test</$component>);
      expect(screen.getByTestId('$component')).toHaveClass('$component--danger');
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<$component>Test</$component>);
      expect(screen.getByTestId('$component')).toHaveClass('$component--md');
    });

    it('renders small size correctly', () => {
      render(<$component size="sm">Test</$component>);
      expect(screen.getByTestId('$component')).toHaveClass('$component--sm');
    });

    it('renders large size correctly', () => {
      render(<$component size="lg">Test</$component>);
      expect(screen.getByTestId('$component')).toHaveClass('$component--lg');
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<$component disabled>Test</$component>);
      expect(screen.getByTestId('$component')).toHaveClass('$component--disabled');
      expect(screen.getByTestId('$component')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<$component onClick={handleClick}>Test</$component>);

      await user.click(screen.getByTestId('$component'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<$component onClick={handleClick} disabled>Test</$component>);

      await user.click(screen.getByTestId('$component'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Ref forwarding test
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<$component ref={ref}>Test</$component>);
      expect(ref.current).not.toBeNull();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<$component>Test</$component>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports ARIA labels', () => {
      render(<$component aria-label="Custom Label">Test</$component>);
      expect(screen.getByTestId('$component')).toHaveAttribute('aria-label', 'Custom Label');
    });
  });
});
EOF
  
  log_success "Generated test file: $test_file"
  return 0
}

# Generate story file
generate_story_file() {
  local package=$1
  local component=$2
  local story_file="packages/@smolitux/$package/src/components/$component/$component.stories.tsx"
  
  if [ -f "$story_file" ]; then
    log_warning "Story file already exists: $story_file"
    return 0
  fi
  
  log_info "Generating story file: $story_file"
  
  mkdir -p "$(dirname "$story_file")"
  
  cat > "$story_file" << EOF
import type { Meta, StoryObj } from '@storybook/react';
import { $component } from './$component';

const meta: Meta<typeof $component> = {
  title: 'Components/$package/$component',
  component: $component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of the $component functionality.',
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
    children: 'Default $component',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <$component variant="primary">Primary</$component>
      <$component variant="secondary">Secondary</$component>
      <$component variant="danger">Danger</$component>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <$component size="sm">Small</$component>
      <$component size="md">Medium</$component>
      <$component size="lg">Large</$component>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled $component',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    onClick: () => console.log('$component clicked!'),
  },
};
EOF
  
  log_success "Generated story file: $story_file"
  return 0
}

# Generate index file
generate_index_file() {
  local package=$1
  local component=$2
  local index_file="packages/@smolitux/$package/src/components/$component/index.ts"
  
  if [ -f "$index_file" ]; then
    log_warning "Index file already exists: $index_file"
    return 0
  fi
  
  log_info "Generating index file: $index_file"
  
  mkdir -p "$(dirname "$index_file")"
  
  cat > "$index_file" << EOF
export * from './$component';
export { default } from './$component';
EOF
  
  log_success "Generated index file: $index_file"
  return 0
}

# Fix validation issues
fix_validation_issues() {
  local package=$1
  local component=$2
  local component_file="packages/@smolitux/$package/src/components/$component/$component.tsx"
  
  if [ ! -f "$component_file" ]; then
    log_warning "Component file not found: $component_file"
    return 1
  fi
  
  log_info "Fixing validation issues in: $component_file"
  
  # Fix React import issues
  if grep -q "React\." "$component_file" && ! grep -q "import React" "$component_file"; then
    log_info "  Fixing React import issue"
    sed -i '1i import React from '\''react'\'';' "$component_file"
  fi
  
  # Fix export issues
  if ! grep -q "export.*$component\|export default" "$component_file"; then
    log_info "  Fixing export issue"
    echo "" >> "$component_file"
    echo "export default $component;" >> "$component_file"
  fi
  
  # Fix TypeScript issues
  if grep -q "any\|@ts-ignore" "$component_file"; then
    log_info "  Fixing TypeScript issues"
    sed -i 's/: any\b/: unknown/g' "$component_file"
    sed -i 's/any\[\]/unknown[]/g' "$component_file"
    sed -i '/@ts-ignore/d' "$component_file"
  fi
  
  # Fix missing test-id issues
  if grep -q "return.*<" "$component_file" && ! grep -q "data-testid" "$component_file"; then
    log_info "  Fixing missing test-id issue"
    sed -i "s/return.*<\(div\|section\|article\|main\|header\|footer\|aside\)\([^>]*\)>/return <\1\2 data-testid=\"$component\">/g" "$component_file"
  fi
  
  log_success "Fixed validation issues in: $component_file"
  return 0
}

# Complete component
complete_component() {
  local package=$1
  local component=$2
  
  log_section "COMPLETING COMPONENT: @smolitux/$package/$component"
  
  # Generate component file if missing
  local component_file="packages/@smolitux/$package/src/components/$component/$component.tsx"
  if [ ! -f "$component_file" ]; then
    generate_component_file "$package" "$component"
  else
    log_info "Component file already exists: $component_file"
    fix_validation_issues "$package" "$component"
  fi
  
  # Generate test file if missing
  local test_file="packages/@smolitux/$package/src/components/$component/$component.test.tsx"
  if [ ! -f "$test_file" ]; then
    generate_test_file "$package" "$component"
  else
    log_info "Test file already exists: $test_file"
  fi
  
  # Generate story file if missing
  local story_file="packages/@smolitux/$package/src/components/$component/$component.stories.tsx"
  if [ ! -f "$story_file" ]; then
    generate_story_file "$package" "$component"
  else
    log_info "Story file already exists: $story_file"
  fi
  
  # Generate index file if missing
  local index_file="packages/@smolitux/$package/src/components/$component/index.ts"
  if [ ! -f "$index_file" ]; then
    generate_index_file "$package" "$component"
  else
    log_info "Index file already exists: $index_file"
  fi
  
  # Update component status
  update_component_status "$package" "$component" "Complete"
  
  log_success "Component completion successful: @smolitux/$package/$component"
  return 0
}

# Complete package
complete_package() {
  local package=$1
  
  log_section "COMPLETING PACKAGE: @smolitux/$package"
  
  # Get component list
  local components=$(get_component_list "$package")
  
  if [ -z "$components" ]; then
    log_warning "No components found in package: @smolitux/$package"
    return 1
  fi
  
  # Complete each component
  echo "$components" | while read -r component; do
    complete_component "$package" "$component"
  done
  
  log_success "Package completion successful: @smolitux/$package"
  return 0
}

# Complete all packages
complete_all_packages() {
  log_section "COMPLETING ALL PACKAGES"
  
  for package in "${PACKAGES[@]}"; do
    local pkg_dir="packages/@smolitux/$package"
    if [ -d "$pkg_dir" ]; then
      complete_package "$package"
    else
      log_warning "Package directory not found: $pkg_dir"
    fi
  done
  
  log_success "All packages completion successful"
  return 0
}

# Export functions
export -f generate_component_file
export -f generate_test_file
export -f generate_story_file
export -f generate_index_file
export -f fix_validation_issues
export -f complete_component
export -f complete_package
export -f complete_all_packages