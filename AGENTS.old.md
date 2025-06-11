# Smolitux UI - Codex Agent System

## 🎯 Mission Statement

The Smolitux UI Codex Agent System is designed to facilitate the development, testing, and deployment of the Smolitux UI component library. This document serves as the central reference for AI agents working with the codebase.

**Primary Goals:**
- Complete the Smolitux UI component library to production-ready status
- Ensure 100% functional components across all packages
- Maintain zero TypeScript/ESLint errors
- Achieve comprehensive test coverage with passing tests
- Provide complete Storybook documentation
- Ensure full accessibility compliance

## 📋 Repository Structure

```
smolitux-ui/
├── packages/                       # Component packages
│   └── @smolitux/
│       ├── core/                   # Foundation components
│       ├── theme/                  # Design system & theming
│       ├── utils/                  # Utility functions
│       ├── testing/                # Test utilities
│       ├── layout/                 # Layout components
│       ├── charts/                 # Data visualization
│       ├── media/                  # Media components
│       ├── community/              # Social features
│       ├── ai/                     # AI components
│       ├── blockchain/             # Blockchain components
│       ├── resonance/              # Platform features
│       ├── federation/             # Cross-platform integration
│       └── voice-control/          # Voice interfaces
├── docs/                           # Documentation
│   └── wiki/
│       ├── codex/                  # Codex documentation
│       ├── components/             # Component documentation
│       └── development/            # Development guides
├── scripts/                        # Development scripts
│   ├── core/                       # Core script modules
│   ├── workflows/                  # Workflow scripts
│   └── packages/                   # Package-specific scripts
├── prompts/                        # Prompt system
│   ├── core/                       # Core prompt components
│   ├── packages/                   # Package-specific prompts
│   └── workflows/                  # Workflow prompts
└── .github/                        # GitHub configuration
    └── workflows/                  # CI/CD workflows
```

## 🚀 Quick Start Guide

### Initial Setup Verification

**IMPORTANT:** Always verify repository setup before starting any development work:

```bash
# 1. Verify git repository and remote configuration
git remote -v
# Should show: origin  https://github.com/EcoSphereNetwork/smolitux-ui.git (fetch/push)

# 2. Verify GitHub CLI authentication
gh auth status
# Should show: ✓ Logged in to github.com account [username]

# 3. If setup is missing or incomplete, the environment should have run the setup script automatically
# If not, you can manually verify setup requirements are met
```

### Repository Analysis

Before starting any work, analyze the current state of the repository:

```bash
# Run the repository analyzer
bash scripts/workflows/analyze-repo.sh

# Check component status
cat COMPONENT_STATUS.md
```

### Development Workflow

Choose the appropriate workflow based on the repository state:

#### 1. Bulk Completion (>50% missing files)

```bash
# Generate missing files
bash scripts/workflows/complete-components.sh --all

# Validate quality
bash scripts/workflows/validate-quality.sh
```

#### 2. Package-by-Package Development (<50% missing files)

```bash
# Select a package (start with core)
PACKAGE="core"

# List components
find packages/@smolitux/$PACKAGE/src/components -type d -mindepth 1 -maxdepth 1

# Complete components
bash scripts/workflows/complete-components.sh --package $PACKAGE
```

#### 3. Component-by-Component Development (Quality enhancement)

```bash
# Select a component
PACKAGE="core"
COMPONENT="Button"

# Analyze component
bash scripts/workflows/analyze-component.sh --package $PACKAGE --component $COMPONENT

# Complete component
bash scripts/workflows/complete-component.sh --package $PACKAGE --component $COMPONENT
```

## 🔧 Git & GitHub Operations

### Repository State Validation

Before any git operations, ensure proper setup:

```bash
# Verify repository remote
if [ -z "$(git remote)" ]; then
    echo "❌ No remote configured"
    git remote add origin https://github.com/EcoSphereNetwork/smolitux-ui.git
    git fetch origin --prune
fi

# Verify GitHub CLI authentication
if ! gh auth status &>/dev/null; then
    echo "❌ GitHub CLI not authenticated"
    echo "Run: gh auth login --web"
fi
```

### PR Operations (when applicable)

For environments with PR access:

```bash
# List PRs chronologically (oldest first)
gh pr list --json number,title,createdAt --jq 'sort_by(.createdAt) | .[] | "#\(.number): \(.title) (Created: \(.createdAt[:10]))"'

# Checkout specific PR
gh pr checkout [PR-NUMBER]

# Repository synchronization
git fetch origin --prune
```

## 📊 Package Priority Matrix

| Priority | Package | Complexity | Dependencies | Focus |
|----------|---------|------------|--------------|-------|
| **P0** | `core` | High | None | Foundation components |
| **P0** | `theme` | Medium | None | Design system |
| **P1** | `utils` | Low | None | Utility functions |
| **P1** | `testing` | Medium | Core | Test utilities |
| **P1** | `layout` | Medium | Core, Theme | Layout components |
| **P2** | `charts` | High | Core, Utils | Data visualization |
| **P2** | `media` | High | Core, Utils | Media components |
| **P3** | `community` | Medium | Core, Media | Social features |
| **P3** | `ai` | High | Core, Utils | AI components |
| **P3** | `blockchain` | High | Core, Utils | Blockchain components |
| **P4** | `resonance` | High | All above | Platform features |
| **P4** | `federation` | High | Core, Community | Cross-platform integration |
| **P4** | `voice-control` | High | Core, AI | Voice interfaces |

## 🔧 Component Development Guide

### Component Structure

Each component should follow this structure:

```
Component/
├── Component.tsx              # Main component implementation
├── Component.test.tsx         # Test suite
├── Component.stories.tsx      # Storybook stories
└── index.ts                   # Re-export
```

### Implementation Template

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ComponentProps {
  /** Component content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Component variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Disabled state */
  disabled?: boolean;
  /** Event handlers with proper typing */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ children, className, variant = 'primary', disabled, onClick, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={clsx('component-base', `component--${variant}`, className)}
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

### Test Template

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    render(<Component className="custom">Test</Component>);
    expect(screen.getByTestId('Component')).toHaveClass('custom');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Component ref={ref}>Test</Component>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('handles user interactions', async () => {
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

### Story Template

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
      options: ['primary', 'secondary', 'danger'],
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
      <Component variant="danger">Danger</Component>
      <Component disabled>Disabled</Component>
    </div>
  ),
};
```

## 📈 Quality Assurance Standards

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

## 🛠️ Advanced Development Patterns

### Specialized Component Types

#### Form Components

```typescript
interface FormComponentProps {
  value?: string;
  onChange?: (value: string, event?: React.ChangeEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}
```

#### Interactive Components

```typescript
interface InteractiveComponentProps {
  onFocus?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: boolean;
}
```

#### Data Display Components

```typescript
interface DataComponentProps {
  data: unknown[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  'aria-label'?: string;
  'aria-live'?: 'polite' | 'assertive';
}
```

### Package-Specific Considerations

#### @smolitux/ai Components

```typescript
// Mock AI services in tests
jest.mock('@smolitux/ai-services', () => ({
  sentimentAnalysis: jest.fn().mockResolvedValue({ 
    score: 0.8, 
    label: 'positive' 
  }),
  contentModerator: jest.fn().mockResolvedValue({ 
    safe: true, 
    confidence: 0.95 
  }),
}));
```

#### @smolitux/blockchain Components

```typescript
// Mock wallet connections
jest.mock('@smolitux/wallet-connector', () => ({
  useWallet: () => ({ 
    connected: true, 
    address: '0x123...',
    balance: '1.5',
    networkId: 1
  }),
}));
```

#### @smolitux/voice-control Components

```typescript
// Mock Speech APIs
Object.defineProperty(window, 'SpeechRecognition', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    addEventListener: jest.fn(),
  })),
});
```

## 🔄 Development Process

### Phase 1: Foundation (P0 Packages)
1. Complete `core` package
2. Complete `theme` package
3. Validate cross-package integration
4. Establish development patterns

### Phase 2: Infrastructure (P1 Packages)
1. Complete `utils` package
2. Complete `testing` package
3. Complete `layout` package
4. Establish testing patterns

### Phase 3: Visualization (P2 Packages)
1. Complete `charts` package
2. Complete `media` package
3. Optimize performance for data-heavy components
4. Establish performance benchmarks

### Phase 4: Features (P3 Packages)
1. Complete `ai` package
2. Complete `blockchain` package
3. Complete `community` package
4. Establish feature integration patterns

### Phase 5: Platform (P4 Packages)
1. Complete `resonance` package
2. Complete `federation` package
3. Complete `voice-control` package
4. Final integration testing

## 📊 Progress Tracking

### Automated Tools

```bash
# Repository analysis
bash scripts/workflows/analyze-repo.sh

# Component completion
bash scripts/workflows/complete-components.sh

# Quality validation
bash scripts/workflows/validate-quality.sh

# Coverage dashboard
bash scripts/workflows/generate-coverage-dashboard.sh
```

### Status Files

- `COMPONENT_STATUS.md` - Overall progress
- `docs/wiki/testing/test-coverage-dashboard.md` - Coverage metrics
- `docs/wiki/development/component-status-*.md` - Package-specific status

### Session Report Template

```markdown
# Codex Session Report - [Date]

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
```

## 🚨 Critical Guidelines

### ✅ MUST DO
1. **Always verify setup first** - check git/GitHub configuration before work
2. **Work systematically** through packages in priority order
3. **Validate each component** before moving to next
4. **Update progress tracking** after each session
5. **Follow TypeScript strict mode** - zero `any` types
6. **Include accessibility tests** - jest-axe for all components
7. **Use forwardRef pattern** - for proper ref forwarding
8. **Add proper test-ids** - data-testid for all testable elements

### ❌ NEVER DO
1. **Skip setup validation** - always ensure git/GitHub is properly configured
2. **Generate duplicates** - check for existing files first
3. **Use any types** - always use proper TypeScript typing
4. **Ignore accessibility** - include a11y tests from start
5. **Work without status** - always understand current state first
6. **Skip documentation** - stories are required for all components
7. **Ignore performance** - monitor bundle size and render time

## 🎯 Success Metrics

### Repository-Level Goals
- 🎯 **100% functional components** - all packages working
- 🎯 **Zero build errors** - clean TypeScript/ESLint builds
- 🎯 **95%+ test coverage** - comprehensive testing
- 🎯 **100% accessibility compliance** - WCAG 2.1 AA standard
- 🎯 **Complete documentation** - Storybook stories for all

### Quality Indicators
- 🟢 **Green**: Ready for production
- 🟡 **Yellow**: Minor issues, functional
- 🔴 **Red**: Major issues, needs work

### Performance Benchmarks
- Components render in <16ms
- Bundle size <500KB per package
- Zero memory leaks in tests
- Accessibility score 100/100

## 📚 Additional Resources

### Documentation
- [Codex Documentation](docs/wiki/codex/index.md)
- [Component Patterns](docs/wiki/codex/component-patterns.md)
- [Workflow Documentation](docs/wiki/codex/workflows.md)
- [Troubleshooting Guide](docs/wiki/codex/troubleshooting.md)

### Scripts
- [Script Documentation](scripts/README.md)
- [Workflow Scripts](scripts/workflows/README.md)
- [Core Script Modules](scripts/core/README.md)

### Prompts
- [Prompt System](prompts/README.md)
- [Core Prompt Components](prompts/core/README.md)
- [Workflow Prompts](prompts/workflows/README.md)

---

**This document serves as the central reference for AI agents working with the Smolitux UI component library. For package-specific guidelines, refer to the AGENTS.md file in the respective package directory.**
