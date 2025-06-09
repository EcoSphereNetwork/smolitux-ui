# 🚀 CODEX DEVELOPER PROMPT: Complete Smolitux UI Component Library

**Systematic completion of Smolitux UI to production-ready status with zero errors and 100% functionality**

## 🎯 **PRIMARY MISSION**

Complete the Smolitux UI component library to achieve:
- ✅ **100% functional components** across all 13 packages  
- ✅ **Zero TypeScript/ESLint errors** in all builds
- ✅ **All tests passing** with ≥95% coverage
- ✅ **Complete Storybook documentation** for all components
- ✅ **Full accessibility compliance** (WCAG 2.1 AA)

## 📊 **REPOSITORY OVERVIEW**

**Location:** `packages/@smolitux/` (13 packages, ~350+ components)

**Package Priority:**
1. **P0:** `core` (60+ components), `theme` (5 components) - **START HERE**
2. **P1:** `utils` (20), `testing` (10), `layout` (15) - Infrastructure  
3. **P2:** `charts` (45), `media` (28) - Visualization
4. **P3:** `ai` (38), `blockchain` (33), `community` (17) - Features
5. **P4:** `resonance` (81), `federation` (16), `voice-control` (20) - Platform

**Available Tools:**
- `bash scripts/smolitux-analyzer.sh` - Analyzes current state
- `bash scripts/smolitux-completion-finisher.sh` - Generates missing files
- `./generate-coverage-dashboard.sh` - Creates coverage reports

## ⚡ **QUICK START STRATEGY**

### **STEP 1: Assessment (30 seconds)**
```bash
# Analyze current repository state
bash scripts/smolitux-analyzer.sh

# Determine approach based on missing files:
# High missing (>50%) → Use bulk completion
# Medium missing (20-50%) → Targeted development  
# Low missing (<20%) → Quality enhancement
```

### **STEP 2: Choose Approach**

#### **Approach A: Bulk Completion** (if >50% missing)
```bash
# Generate missing tests and stories
bash scripts/smolitux-completion-finisher.sh --detailed

# Then enhance generated files with component-specific logic
```

#### **Approach B: Targeted Development** (if 20-50% missing)
```bash
# Work systematically through packages in priority order
# Use 5-8 minute per-component workflow
```

#### **Approach C: Quality Enhancement** (if <20% missing)
```bash
# Focus on improving existing components
# Fix TypeScript/ESLint errors, enhance tests, optimize performance
```

## 🔧 **5-8 MINUTE COMPONENT WORKFLOW**

### **Template for Each Component:**

#### **Minute 0-1: Analysis**
```bash
COMPONENT="ComponentName"  # Replace with actual component
PACKAGE="core"            # Replace with actual package

# Quick inspection
ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/
echo "Checking component: $COMPONENT"

# Identify missing files
[ ! -f "packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.test.tsx" ] && echo "❌ Missing test"
[ ! -f "packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.stories.tsx" ] && echo "❌ Missing story"
```

#### **Minute 1-3: Implementation**
**Ensure EVERY component follows this pattern:**

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  'aria-label'?: string;
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ children, className, variant = 'primary', disabled, onClick, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={clsx('component', `component--${variant}`, className)}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
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

#### **Minute 3-5: Testing**
**Ensure EVERY component has comprehensive tests:**

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

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Component onClick={handleClick}>Test</Component>);
    
    await user.click(screen.getByTestId('Component'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Component ref={ref}>Test</Component>);
    expect(ref.current).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports all variants', () => {
    const variants = ['primary', 'secondary', 'danger'] as const;
    variants.forEach(variant => {
      const { rerender } = render(<Component variant={variant}>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass(`component--${variant}`);
      rerender(<div />);
    });
  });
});
```

#### **Minute 5-7: Documentation**
**Ensure EVERY component has complete Storybook stories:**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/[Package]/Component',
  component: Component,
  parameters: { layout: 'centered' },
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

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    onClick: () => console.log('Component clicked!'),
  },
};
```

#### **Minute 7-8: Validation**
```bash
# Validate implementation
npm run lint --workspace=@smolitux/$PACKAGE
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests
npm run build --workspace=@smolitux/$PACKAGE

# Update progress
echo "✅ $COMPONENT (@smolitux/$PACKAGE): Complete - $(date)" >> COMPONENT_STATUS.md
```

## 🛠️ **QUALITY REQUIREMENTS**

### **MANDATORY for EVERY Component:**
1. **TypeScript Strict:** No `any` types, complete interfaces
2. **forwardRef Pattern:** All components must forward refs
3. **Test ID:** `data-testid` attribute on main element
4. **Accessibility:** `jest-axe` tests, ARIA attributes
5. **Event Handling:** Proper TypeScript typing for all events
6. **Variants:** Support multiple visual variants
7. **Documentation:** Complete JSDoc comments
8. **Performance:** React.memo where appropriate

### **MANDATORY for EVERY Package:**
1. **Build Success:** Zero TypeScript/ESLint errors
2. **Test Coverage:** ≥95% across all metrics
3. **Export Structure:** Proper index.ts with all exports
4. **Dependencies:** No circular dependencies
5. **Integration:** Cross-package compatibility

## 🎯 **SPECIALIZED PACKAGE PATTERNS**

### **AI Components (`@smolitux/ai`)**
```typescript
// Mock AI services in tests
jest.mock('@smolitux/ai-services', () => ({
  sentimentAnalysis: jest.fn().mockResolvedValue({ score: 0.8, label: 'positive' }),
  contentModerator: jest.fn().mockResolvedValue({ safe: true, confidence: 0.95 }),
}));

// Include loading states and error handling
interface AIComponentProps {
  data: unknown[];
  loading?: boolean;
  error?: string;
  onAnalysisComplete?: (result: AnalysisResult) => void;
}
```

### **Blockchain Components (`@smolitux/blockchain`)**
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

// Include wallet states and transaction handling
interface BlockchainComponentProps {
  walletAddress?: string;
  networkId?: number;
  onTransactionComplete?: (tx: Transaction) => void;
}
```

### **Voice Control Components (`@smolitux/voice-control`)**
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

// Include voice recognition patterns
interface VoiceComponentProps {
  language?: string;
  continuous?: boolean;
  onSpeechResult?: (transcript: string) => void;
}
```

## 📊 **PROGRESS TRACKING**

### **After Each Session, Update:**
```bash
# Generate updated status
bash scripts/smolitux-analyzer.sh

# Update progress files
echo "Session $(date): Completed @smolitux/$PACKAGE" >> COMPONENT_STATUS.md

# Generate coverage dashboard  
./generate-coverage-dashboard.sh
```

### **Session Report Template:**
```markdown
## Codex Session Report - $(date +%Y-%m-%d)

### 📊 Session Metrics
- **Package:** @smolitux/[package]
- **Components Fixed:** [X]
- **Tests Added:** [X]
- **Stories Added:** [X]
- **Coverage:** [X]% → [Y]%

### ✅ Completed Components
- [Component1]: ✅ Implementation ✅ Tests ✅ Stories
- [Component2]: ✅ Implementation ✅ Tests ✅ Stories

### 🔧 Issues Fixed
- Fixed [X] TypeScript errors
- Added [X] missing accessibility tests
- Resolved [X] ESLint violations

### 📈 Quality Improvements
- TypeScript Errors: [X] → 0
- ESLint Errors: [X] → 0
- Build Status: ✅ Success
- Test Coverage: [X]% → [Y]%

### 🎯 Next Session Priority
- Focus on @smolitux/[next-package]
- Target: [X] components remaining
```

## ⚠️ **CRITICAL SUCCESS FACTORS**

### **✅ ALWAYS DO:**
1. **Start with analyzer** - Understand current state first
2. **Work systematically** - Follow package priority order
3. **Validate each component** - Test before moving to next
4. **Use strict TypeScript** - Zero `any` types allowed
5. **Include accessibility** - jest-axe tests mandatory
6. **Follow patterns** - Use provided templates consistently
7. **Update progress** - Maintain status files after each session

### **❌ NEVER DO:**
1. **Skip validation** - Always test implementation
2. **Use any types** - Maintain TypeScript strict compliance
3. **Ignore accessibility** - A11y tests are mandatory
4. **Generate duplicates** - Check existing files first
5. **Work without context** - Always understand current state
6. **Skip documentation** - Stories required for all components
7. **Make breaking changes** - Maintain backward compatibility

## 🎯 **SUCCESS VALIDATION**

### **Final Production Check:**
```bash
# Comprehensive validation before completion
echo "🎯 PRODUCTION READINESS CHECK"

# 1. Build validation
npm run build && echo "✅ Build successful" || echo "❌ Build failed"

# 2. Test validation  
npm test && echo "✅ All tests pass" || echo "❌ Test failures"

# 3. Lint validation
npm run lint && echo "✅ No lint errors" || echo "❌ Lint errors"

# 4. Coverage validation
total_components=$(find packages/@smolitux -name "*.tsx" | grep -v "\.test\.\|\.stories\." | wc -l)
total_tests=$(find packages/@smolitux -name "*.test.tsx" | wc -l)
coverage=$(( total_tests * 100 / total_components ))

[ $coverage -ge 95 ] && echo "✅ Coverage: $coverage%" || echo "❌ Coverage too low: $coverage%"

echo "🎯 Production readiness validation complete!"
```

### **Completion Criteria:**
- ✅ All 13 packages build successfully
- ✅ All ~350 components fully functional  
- ✅ Zero TypeScript/ESLint errors
- ✅ ≥95% test coverage with all tests passing
- ✅ Complete Storybook documentation
- ✅ Full accessibility compliance
- ✅ Performance benchmarks met

---

**🚀 EXECUTE THIS PROMPT:** Use this systematic approach to complete the Smolitux UI component library. Start with the analyzer, work through packages in priority order, follow the 5-8 minute component workflow, maintain quality standards, and validate progress continuously. Achieve production-ready status with zero errors and complete functionality across all packages.
