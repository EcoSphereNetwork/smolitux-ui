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

## 🚀 Codex Operation Modes

**IMPORTANT:** Codex operates in different modes depending on the prompt received. Focus on the specific task assigned by the prompt.

### **Mode 1: PR Management** 🔀
**When:** Received PR merge/management prompts
**Focus:** ONLY on merging PRs chronologically with code preservation
**Do NOT run:** Additional analysis scripts, component generation, or other workflows
**Goal:** Merge all PRs successfully preserving all code improvements

### **Mode 2: Component Development** 🔧
**When:** Received component development prompts
**Focus:** Creating, completing, and testing components
**Priority:** Quality over quantity, systematic package completion

### **Mode 3: Repository Analysis** 🔍
**When:** Received analysis or audit prompts
**Focus:** Understanding current state, generating reports
**Tools:** Analysis scripts and status generation

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
├── scripts/                        # Development scripts (use only when specifically instructed)
├── prompts/                        # Prompt system
└── .github/                        # GitHub configuration
```

## 🔧 Initial Setup Verification

**ONLY FOR NEW ENVIRONMENTS** - Skip if already configured:

```bash
# Verify git repository and remote configuration
git remote -v
# Should show: origin  https://github.com/EcoSphereNetwork/smolitux-ui.git (fetch/push)

# Verify GitHub CLI authentication
gh auth status
# Should show: ✓ Logged in to github.com account [username]

# If setup is missing, the environment setup script should handle this automatically
```

## 🔧 Git & GitHub Operations

### Repository State Validation (when needed)

```bash
# Verify repository remote (only if issues detected)
if [ -z "$(git remote)" ]; then
    git remote add origin https://github.com/EcoSphereNetwork/smolitux-ui.git
    git fetch origin --prune
fi

# Verify GitHub CLI authentication (only if issues detected)
if ! gh auth status &>/dev/null; then
    echo "Run: gh auth login --web"
fi
```

## 📊 Package Priority Matrix

**FOR COMPONENT DEVELOPMENT MODE ONLY:**

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

**FOR COMPONENT DEVELOPMENT MODE ONLY:**

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
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
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

## 🚨 Critical Guidelines

### ✅ GENERAL PRINCIPLES
1. **Focus on assigned task** - Follow the specific prompt received
2. **Validate setup first** - Ensure git/GitHub configuration when needed
3. **Follow TypeScript strict mode** - Zero `any` types
4. **Include accessibility tests** - jest-axe for all components
5. **Use forwardRef pattern** - For proper ref forwarding
6. **Add proper test-ids** - data-testid for all testable elements

### ❌ NEVER DO
1. **Mix operation modes** - Don't run development scripts during PR operations
2. **Skip setup validation** - Always ensure proper configuration
3. **Use any types** - Always use proper TypeScript typing
4. **Ignore accessibility** - Include a11y tests from start
5. **Run unnecessary scripts** - Only use tools relevant to current task
6. **Ignore performance** - Monitor bundle size and render time

## 🎯 Mode-Specific Guidelines

### **PR Management Mode** 🔀
**When:** PR merge/management prompts received
**Focus:** 
- Merge PRs chronologically
- Preserve ALL code improvements
- Handle conflicts properly
- Recover closed PRs
**Do NOT:**
- Run analysis scripts
- Generate components
- Execute workflow scripts
- Start development processes

### **Component Development Mode** 🔧
**When:** Component development prompts received
**Focus:**
- Create/complete components systematically
- Follow quality standards
- Work through packages by priority
- Run relevant validation tools
**Tools:** May use development scripts when specifically needed

### **Analysis Mode** 🔍
**When:** Analysis/audit prompts received
**Focus:**
- Repository analysis
- Status reporting
- Quality assessment
**Tools:** Analysis and reporting scripts

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

---

**This document serves as the central reference for AI agents working with the Smolitux UI component library. Focus on the task assigned by your specific prompt and avoid running unnecessary workflows that waste tokens and reduce efficiency.**
