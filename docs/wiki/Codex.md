# Codex Guide: Smolitux UI Component Library

**Comprehensive guide for AI agents working on the Smolitux UI component library**

## 🎯 **Mission Overview**

Transform the Smolitux UI component library into a **production-ready, fully-tested, and documented component system** with 100% coverage across all packages. This guide provides both strategic overview and tactical execution plans.

---

## 📋 **Quick Start Workflows**

### **🚀 Zero-Setup Direct Component Work**
*For immediate productivity when dependencies are working*

```bash
# 1. Quick assessment (30 seconds)
find packages/@smolitux/core/src/components -maxdepth 1 -type d | head -5

# 2. Component-by-component workflow (8 min each)
COMPONENT="Button"  # Iterate through each
echo "🧩 FIXING: $COMPONENT"
# → Analyze → Fix TypeScript → Tests → Stories → Validate → Next
```

### **🔧 Comprehensive Analysis & Bulk Completion**
*For systematic repository-wide improvements*

```bash
# 1. Repository state analysis
bash scripts/smolitux-analyzer.sh

# 2. Bulk completion (if needed)
bash scripts/smolitux-completion-finisher.sh --detailed

# 3. Package-by-package refinement
# Focus on quality enhancement of generated files
```

---

## 🏗️ **Strategic Approach**

### **Phase 0: Assessment & Planning**
**Always start here** to understand the current state and plan the approach.

#### **Repository Analysis**
```bash
# Run the analyzer to understand current state
bash scripts/smolitux-analyzer.sh

# Key metrics to examine:
# - Test coverage by package
# - Missing test/story files
# - TypeScript/ESLint issues
# - Component completion status
```

#### **Decision Matrix**
- **High missing files (>50%)** → Use bulk completion finisher
- **Medium missing files (20-50%)** → Targeted component work
- **Low missing files (<20%)** → Quality enhancement focus

### **Phase 1: Foundation Setup** 
*Only if environment issues exist*

#### **Dependency Management**
```bash
# Clean installation (only if needed)
rm -rf node_modules package-lock.json
npm install --force --no-audit --no-fund

# Install missing testing dependencies
npm install --save-dev \
  @typescript-eslint/eslint-plugin \
  jest jest-axe jest-environment-jsdom \
  @testing-library/react @testing-library/user-event \
  tsup ts-node
```

#### **Environment Validation**
```bash
# Quick environment check
npm run lint --workspace=@smolitux/core | head -5
npm test --workspace=@smolitux/core --passWithNoTests | head -5
```

### **Phase 2: Strategic Component Work**

#### **Package Priority (Execution Order)**
1. **`@smolitux/core`** ⭐⭐⭐ - Foundation (Button, Input, Modal, Table)
2. **`@smolitux/theme`** ⭐⭐ - Design system
3. **`@smolitux/layout`** ⭐⭐ - Layout components  
4. **`@smolitux/utils`** ⭐⭐ - Utilities & helpers
5. **`@smolitux/testing`** ⭐ - Test utilities
6. **`@smolitux/charts`** ⭐⭐ - Data visualization
7. **`@smolitux/media`** ⭐⭐ - Media components
8. **`@smolitux/community`** ⭐⭐ - Social features
9. **`@smolitux/ai`** ⭐⭐⭐ - AI-powered components
10. **`@smolitux/blockchain`** ⭐⭐⭐ - Crypto/DeFi
11. **`@smolitux/resonance`** ⭐⭐⭐ - Platform features
12. **`@smolitux/federation`** ⭐⭐⭐ - Cross-platform
13. **`@smolitux/voice-control`** ⭐⭐⭐ - Voice interfaces

#### **Component Selection Strategy**
```bash
# For each package, prioritize in this order:
# 1. Core components (Button, Input, Card)
# 2. Layout components (Container, Grid, Flex)
# 3. Form components (Form, Field, Select)
# 4. Navigation components (Menu, Tabs, Breadcrumb)
# 5. Feedback components (Alert, Toast, Modal)
# 6. Complex components (Table, Carousel, Chart)
```

---

## 🔧 **Tactical Component Development**

### **Per-Component Workflow (8 minutes target)**

#### **1. Component Analysis (30 seconds)**
```bash
COMPONENT="Button"  # Replace with target component
PACKAGE="core"      # Replace with target package

echo "🔍 ANALYZING: $COMPONENT"
ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/
head -20 packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.tsx
```

#### **2. TypeScript Implementation (2 minutes)**
**Ensure every component has:**
```typescript
// Complete interface with JSDoc
interface ComponentProps {
  /** Component content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Component variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// forwardRef implementation
export const Component = forwardRef<HTMLButtonElement, ComponentProps>(
  ({ children, className, variant = 'primary', disabled, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx('component', `component--${variant}`, className)}
        disabled={disabled}
        onClick={onClick}
        data-testid="Component"
        {...props}
      >
        {children}
      </button>
    );
  }
);

Component.displayName = 'Component';

export default Component;
```

#### **3. Test Implementation (3 minutes)**
**Create comprehensive test suite:**
```typescript
// ComponentName.test.tsx
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
    render(<Component className="custom">Test</Component>);
    expect(screen.getByTestId('Component')).toHaveClass('custom');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Component ref={ref}>Test</Component>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Component onClick={handleClick}>Test</Component>);
    
    await user.click(screen.getByTestId('Component'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports disabled state', () => {
    render(<Component disabled>Test</Component>);
    expect(screen.getByTestId('Component')).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders all variants correctly', () => {
    const variants = ['primary', 'secondary', 'danger'] as const;
    variants.forEach(variant => {
      const { rerender } = render(<Component variant={variant}>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass(`component--${variant}`);
      rerender(<div />); // Clean up
    });
  });
});
```

#### **4. Story Implementation (2 minutes)**
**Create comprehensive Storybook stories:**
```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Core/Component',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible component with multiple variants and states.',
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
  args: {
    children: 'Default Component',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Component',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Component',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Component',
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Component',
    disabled: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled Component',
    className: 'custom-component-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    onClick: () => console.log('Component clicked!'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="danger">Danger</Component>
      <Component disabled>Disabled</Component>
    </div>
  ),
};
```

#### **5. Validation & Cleanup (30 seconds)**
```bash
# Quick validation
npm run type-check --workspace=@smolitux/$PACKAGE
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests

# Update progress
echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
```

---

## 📊 **Quality Assurance**

### **Component Quality Checklist**
**Before marking any component complete:**

- ✅ **TypeScript Compliance**
  - No `any` types used
  - Complete prop interfaces with JSDoc
  - Proper ref forwarding
  - Strict mode compatible

- ✅ **Test Coverage (≥90%)**
  - Unit tests for all props
  - Interaction tests with user-event
  - Accessibility tests with jest-axe
  - Edge cases and error handling
  - Snapshot tests where appropriate

- ✅ **Storybook Integration**
  - Default story showcasing basic usage
  - Stories for all prop variations
  - Interactive stories for complex components
  - Comprehensive documentation

- ✅ **Accessibility Compliance**
  - Semantic HTML structure
  - ARIA attributes where needed
  - Keyboard navigation support
  - Screen reader compatibility
  - Color contrast compliance

- ✅ **Performance Optimization**
  - React.memo for expensive components
  - Proper dependency arrays
  - Bundle size considerations
  - Render performance < 16ms

- ✅ **Build & Lint Compliance**
  - Clean TypeScript build
  - Zero ESLint errors
  - Minimal warnings
  - Package exports working

### **Package-Level Quality Gates**
**Before marking a package complete:**

- ✅ **Coverage Metrics:** ≥90% across statements, branches, functions, lines
- ✅ **Accessibility:** All components pass jest-axe tests
- ✅ **Performance:** Bundle size within acceptable limits
- ✅ **Documentation:** Complete README with usage examples
- ✅ **Build:** Successful build with no errors/warnings
- ✅ **Integration:** Cross-package dependencies working

---

## 🔄 **Advanced Workflows**

### **Bulk Completion Workflow**
*For repositories with many missing files*

#### **Step 1: Analysis**
```bash
# Run repository analyzer
bash scripts/smolitux-analyzer.sh

# Review output for:
# - Packages with low test coverage
# - High number of missing test/story files
# - Common validation issues
```

#### **Step 2: Bulk Generation**
```bash
# Run improved completion finisher
bash scripts/smolitux-completion-finisher.sh --detailed

# This will:
# - Generate missing test files with templates
# - Generate missing story files with templates
# - Fix common TypeScript/ESLint issues
# - Update COMPONENT_STATUS.md
```

#### **Step 3: Quality Enhancement**
After bulk generation, manually enhance:
- **Review generated tests** - Add component-specific logic
- **Enhance stories** - Add realistic scenarios and interactions
- **Validate functionality** - Ensure tests pass and stories work
- **Optimize implementations** - Improve TypeScript types and performance

### **Specialized Package Workflows**

#### **AI Package Components**
```bash
# Special considerations for AI components:
# - Mock AI service responses in tests
# - Performance testing for real-time analytics
# - Error handling for API failures
# - Accessibility for dynamic content

# Example test setup:
jest.mock('@smolitux/ai-services', () => ({
  sentimentAnalysis: jest.fn().mockResolvedValue({ score: 0.8, label: 'positive' }),
}));
```

#### **Blockchain Package Components**
```bash
# Special considerations for blockchain components:
# - Mock wallet connections
# - Test currency formatting
# - Handle async operations
# - Error states for failed transactions

# Example wallet mock:
jest.mock('@smolitux/wallet-connector', () => ({
  useWallet: () => ({ connected: true, address: '0x123...' }),
}));
```

#### **Voice Control Package Components**
```bash
# Special considerations for voice components:
# - Mock browser Speech APIs
# - Test different recognition engines
# - Accessibility with ARIA live regions
# - Performance for real-time processing

# Example Speech API mock:
Object.defineProperty(window, 'SpeechRecognition', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    addEventListener: jest.fn(),
  })),
});
```

---

## 📈 **Progress Tracking & Reporting**

### **Automated Status Updates**
The completion finisher automatically updates:
- `COMPONENT_STATUS.md` - Component-level progress
- `docs/wiki/testing/test-coverage-dashboard.md` - Coverage metrics
- `docs/wiki/development/component-status.md` - Development status

### **Session Report Template**
```markdown
# Codex Session Report - [Date]

## 📊 Session Overview
- **Package:** @smolitux/[package]
- **Duration:** [X] minutes
- **Components Worked:** [X] components
- **Approach:** [Bulk/Targeted/Quality Enhancement]

## ✅ Completed Components
| Component | Implementation | Tests | Stories | Coverage | Status |
|-----------|---------------|-------|---------|----------|--------|
| Button    | ✅            | ✅    | ✅      | 95%      | Complete |
| Input     | ✅            | ✅    | ✅      | 92%      | Complete |
| Card      | ✅            | ✅    | ✅      | 88%      | Needs Coverage |

## 🔧 Issues Resolved
- Fixed TypeScript strict mode violations in 5 components
- Added missing accessibility attributes
- Resolved ESLint errors across package
- Enhanced test coverage from 65% to 89%

## 📊 Metrics Improvement
- **Test Coverage:** 65% → 89%
- **Story Coverage:** 30% → 85%
- **TypeScript Errors:** 15 → 0
- **ESLint Errors:** 8 → 0

## 🎯 Next Session Focus
- Complete remaining 3 components in @smolitux/core
- Enhance test quality for complex components
- Begin @smolitux/layout package
- Focus on cross-package integration testing

## ⚠️ Issues/Blockers
- [List any encountered problems and solutions]

## 📋 Quality Status
- All components pass TypeScript strict mode ✅
- All components have ≥90% test coverage ✅
- All accessibility tests passing ✅
- Build successful with no warnings ✅
```

---

## 🛠️ **Tool Reference**

### **Available Scripts**
```bash
# Repository analysis
bash scripts/smolitux-analyzer.sh

# Bulk completion (improved, no duplicates)
bash scripts/smolitux-completion-finisher.sh [--detailed]

# Coverage dashboard generation
./generate-coverage-dashboard.sh --package <name>

# Package-specific commands
npm run test --workspace=@smolitux/<package>
npm run build --workspace=@smolitux/<package>
npm run lint --workspace=@smolitux/<package>
```

### **Key Files to Monitor**
- `COMPONENT_STATUS.md` - Overall progress tracking
- `docs/wiki/testing/test-coverage-dashboard.md` - Coverage metrics
- `docs/wiki/development/component-status.md` - Development status
- `packages/@smolitux/*/coverage/` - Package-specific coverage reports

---

## 🎯 **Success Criteria**

### **Repository-Level Goals**
- 🎯 **100% component test coverage** across all packages
- 🎯 **100% story coverage** for all public components  
- 🎯 **Zero TypeScript/ESLint errors** in production build
- 🎯 **Complete accessibility compliance** (jest-axe passing)
- 🎯 **Comprehensive documentation** with usage examples

### **Package-Level Goals**
- 🎯 **≥90% test coverage** (statements, branches, functions, lines)
- 🎯 **All components fully documented** with props and examples
- 🎯 **Performance benchmarks met** (<16ms render time)
- 🎯 **Bundle size optimized** (track with bundlephobia)
- 🎯 **Cross-browser compatibility** verified

### **Component-Level Goals**
- 🎯 **Complete TypeScript typing** (no `any` types)
- 🎯 **All user interactions tested** with realistic scenarios  
- 🎯 **Accessibility attributes complete** (ARIA, semantic HTML)
- 🎯 **Error boundaries implemented** where appropriate
- 🎯 **Performance optimized** (React.memo, proper deps)

---

## 💡 **Best Practices & Tips**

### **Efficiency Tips**
1. **Start with assessment** - Always run analyzer first
2. **Use bulk tools wisely** - Completion finisher for high missing counts
3. **Work systematically** - Complete packages fully before moving on
4. **Focus on quality** - 8 minutes per component target includes quality
5. **Validate continuously** - Quick tests after each component

### **Common Pitfalls to Avoid**
1. **Duplicate file generation** - Use improved scripts only
2. **Working blind** - Always assess current state first
3. **Skipping validation** - Test each component before moving on
4. **Ignoring accessibility** - Include jest-axe tests from start
5. **Poor TypeScript hygiene** - Avoid `any` types and ensure strict compliance

### **Quality Shortcuts**
1. **Template reuse** - Copy proven test/story patterns
2. **Incremental testing** - Run tests per component, not per package
3. **Accessibility first** - Design with a11y in mind from start
4. **Performance awareness** - Monitor bundle size during development
5. **Documentation as you go** - Write JSDoc comments immediately

---

**🎯 This comprehensive guide ensures systematic, high-quality completion of the entire Smolitux UI component library while maintaining efficiency and avoiding common pitfalls.**
