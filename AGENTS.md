# Smolitux UI - Codex Development Guide

**Comprehensive development guide for AI agents working on the Smolitux UI component library**

## 🎯 **Mission Statement**

Complete the Smolitux UI component library to production-ready status with:
- ✅ 100% functional components across all packages
- ✅ Zero TypeScript/ESLint errors
- ✅ 100% test coverage with passing tests
- ✅ Complete Storybook documentation
- ✅ Full accessibility compliance

---

## 📋 **Quick Start Strategy**

### **🚀 Zero-Setup Approach**
*For immediate productivity when dependencies work*

```bash
# 1. Quick assessment (30 seconds)
bash scripts/smolitux-analyzer.sh

# 2. Bulk completion if needed (10 minutes)
bash scripts/smolitux-completion-finisher.sh --detailed

# 3. Component-by-component workflow (5-8 min each)
# Focus on highest priority packages first
```

### **📊 Package Priority Matrix**

| Priority | Packages | Status | Focus |
|----------|----------|--------|-------|
| **P0 - Critical** | `@smolitux/core`, `@smolitux/theme` | Foundation | Start here |
| **P1 - High** | `@smolitux/utils`, `@smolitux/testing`, `@smolitux/layout` | Infrastructure | Next |
| **P2 - Medium** | `@smolitux/charts`, `@smolitux/media` | Visualization | Then |
| **P3 - Advanced** | `@smolitux/ai`, `@smolitux/blockchain`, `@smolitux/community` | Features | After core |
| **P4 - Specialized** | `@smolitux/resonance`, `@smolitux/federation`, `@smolitux/voice-control` | Platform | Final |

---

## 🔧 **Component Development Workflow**

### **Per-Component Checklist (5-8 minutes target)**

#### **1. Analysis Phase (30 seconds)**
```bash
COMPONENT="Button"  # Replace with target
PACKAGE="core"      # Replace with target package

# Quick component inspection
ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/
head -20 packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.tsx
```

#### **2. Implementation Phase (2-3 minutes)**
**Ensure every component has:**

```typescript
import React, { forwardRef } from 'react';

interface ComponentProps {
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

#### **3. Testing Phase (2-3 minutes)**
**Complete test suite template:**

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

  it('supports all variants', () => {
    const variants = ['primary', 'secondary', 'danger'] as const;
    variants.forEach(variant => {
      const { rerender } = render(<Component variant={variant}>Test</Component>);
      expect(screen.getByTestId('Component')).toHaveClass(`component--${variant}`);
      rerender(<div />);
    });
  });

  it('handles disabled state', () => {
    render(<Component disabled>Test</Component>);
    expect(screen.getByTestId('Component')).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### **4. Documentation Phase (2 minutes)**
**Comprehensive Storybook stories:**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/[Package]/Component',
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

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    onClick: () => console.log('Component clicked!'),
  },
};
```

#### **5. Validation Phase (30 seconds)**
```bash
# Quick validation per component
npm run lint --workspace=@smolitux/$PACKAGE
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests

# Update progress
echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
```

---

## 📊 **Quality Assurance Standards**

### **Component Completion Criteria**
Before marking any component as complete:

- ✅ **TypeScript Compliance**: No `any` types, complete interfaces, strict mode
- ✅ **Accessibility**: WCAG 2.1 AA compliance, jest-axe tests passing
- ✅ **Testing**: ≥95% coverage, all interaction patterns tested
- ✅ **Documentation**: Complete Storybook stories with all variants
- ✅ **Performance**: <16ms render time, React.memo where appropriate
- ✅ **Build**: Clean TypeScript build, zero ESLint errors

### **Package Completion Criteria**
Before marking a package as complete:

- ✅ **Coverage**: ≥95% test coverage across all metrics
- ✅ **Build**: Successful build with no warnings
- ✅ **Exports**: All components properly exported
- ✅ **Dependencies**: No circular dependencies
- ✅ **Integration**: Cross-package compatibility verified

---

## 🛠️ **Advanced Development Patterns**

### **Specialized Component Types**

#### **Form Components**
```typescript
// Enhanced form component pattern
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

// Always include form validation and accessibility
```

#### **Interactive Components**
```typescript
// Enhanced interactive component pattern
interface InteractiveComponentProps {
  onFocus?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: boolean;
}

// Include keyboard navigation and screen reader support
```

#### **Data Display Components**
```typescript
// Enhanced data display pattern
interface DataComponentProps {
  data: unknown[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  'aria-label'?: string;
  'aria-live'?: 'polite' | 'assertive';
}

// Include loading states and error handling
```

### **Package-Specific Considerations**

#### **@smolitux/ai Components**
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

#### **@smolitux/blockchain Components**
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

#### **@smolitux/voice-control Components**
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

---

## 🔄 **Systematic Development Process**

### **Phase 1: Foundation (Week 1)**
1. Complete `@smolitux/core` package (Button, Input, Card, Modal, Table)
2. Complete `@smolitux/theme` package (ThemeProvider, tokens)
3. Validate cross-package integration
4. Establish development patterns

### **Phase 2: Infrastructure (Week 2)**
1. Complete `@smolitux/utils` package (formatters, validators, helpers)
2. Complete `@smolitux/testing` package (test utilities, mocks)
3. Complete `@smolitux/layout` package (Container, Grid, Flex)
4. Establish testing patterns

### **Phase 3: Visualization (Week 3)**
1. Complete `@smolitux/charts` package (all chart types)
2. Complete `@smolitux/media` package (AudioPlayer, VideoPlayer)
3. Optimize performance for data-heavy components
4. Establish performance benchmarks

### **Phase 4: Features (Week 4)**
1. Complete `@smolitux/ai` package (AI-powered components)
2. Complete `@smolitux/blockchain` package (crypto/DeFi components)
3. Complete `@smolitux/community` package (social features)
4. Establish feature integration patterns

### **Phase 5: Platform (Week 5)**
1. Complete `@smolitux/resonance` package (platform features)
2. Complete `@smolitux/federation` package (cross-platform)
3. Complete `@smolitux/voice-control` package (voice interfaces)
4. Final integration testing

---

## 📈 **Progress Tracking & Automation**

### **Automated Tools**
```bash
# Repository analysis
bash scripts/smolitux-analyzer.sh

# Bulk completion
bash scripts/smolitux-completion-finisher.sh [--detailed]

# Coverage dashboard
./generate-coverage-dashboard.sh

# Component annotation
node scripts/annotate-components.js
```

### **Status Files**
- `COMPONENT_STATUS.md` - Overall progress
- `docs/wiki/testing/test-coverage-dashboard.md` - Coverage metrics
- `docs/wiki/development/component-status-*.md` - Package-specific status

### **Session Report Template**
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

---

## 🚨 **Critical Guidelines**

### **✅ MUST DO**
1. **Always run analyzer first** to understand current state
2. **Work systematically** through packages in priority order
3. **Validate each component** before moving to next
4. **Update progress tracking** after each session
5. **Follow TypeScript strict mode** - zero `any` types
6. **Include accessibility tests** - jest-axe for all components
7. **Use forwardRef pattern** - for proper ref forwarding
8. **Add proper test-ids** - data-testid for all testable elements

### **❌ NEVER DO**
1. **Skip validation** - always test before moving on
2. **Generate duplicates** - check for existing files first
3. **Use any types** - always use proper TypeScript typing
4. **Ignore accessibility** - include a11y tests from start
5. **Work without status** - always understand current state first
6. **Skip documentation** - stories are required for all components
7. **Ignore performance** - monitor bundle size and render time

---

## 🎯 **Success Metrics**

### **Repository-Level Goals**
- 🎯 **100% functional components** - all packages working
- 🎯 **Zero build errors** - clean TypeScript/ESLint builds
- 🎯 **95%+ test coverage** - comprehensive testing
- 🎯 **100% accessibility compliance** - WCAG 2.1 AA standard
- 🎯 **Complete documentation** - Storybook stories for all

### **Quality Indicators**
- 🟢 **Green**: Ready for production
- 🟡 **Yellow**: Minor issues, functional
- 🔴 **Red**: Major issues, needs work

### **Performance Benchmarks**
- Components render in <16ms
- Bundle size <500KB per package
- Zero memory leaks in tests
- Accessibility score 100/100

---
"Vorherige Analysie" (Bezugnehmend auf den aktuellen Prompt):
Notes

    The repository contains multiple overlapping developer guides. Key instructions are in AGENTS.md and repeated in old versions as well as in documentation under docs/wiki.

    Extensive automation scripts (scripts/smolitux-analyzer.sh, scripts/smolitux-completion-finisher.sh) already perform analysis, test/story generation and issue detection.

Summary
1. Überblick & Reduktion

    Aktuelle Ziele
    Root-Anleitung definiert die Mission: alle Komponenten vollständig, keine TypeScript/ESLint-Fehler, 100 % Testabdeckung, Storybook-Dokumentation und A11y-Konformität

.

Schnellstart
Empfohlener Ablauf: Analyzer → Completion Finisher → Komponenten-Workflow

.

Prio-Matrix
Pakete sind klar priorisiert von core/theme bis zu resonance und voice-control

.

Komponenten-Workflow
Detaillierte Vorlage für Analyse, Implementierung, Tests und Stories in AGENTS.md

.

Weitere Leitfäden
packages/@smolitux/AGENTS.md enthält fast identische Anweisungen und Qualitäts-Checklisten

.

Doku-Duplikate
docs/wiki/Codex.md und docs/wiki/OPTIMIZED_CODEX.md bieten nochmals ähnliche Workflows und Dos & Don’ts (z. B. Quick Start Decision Tree)

.

Prompts
Unter docs/wiki/development/prompts/* existieren zahlreiche paket- oder themenspezifische Prompts; Beispiel CODEX-FINAL-PROMPT.md wiederholt Priorisierung, Minimal-Templates und Qualitäts-Checklisten

.

Automationsskripte
scripts/smolitux-analyzer.sh analysiert Komponenten/Test/Story-Abdeckung und Validierungsfehler
.
scripts/smolitux-completion-finisher.sh generiert Tests/Stories, behebt Importe/Exports und aktualisiert COMPONENT_STATUS.md

.

Workflows
.github/workflows/ci.yml führt Linting, Tests, A11y-Tests, Build und Storybook-Build aus

    .

2. Strukturierungs- & Redesign-Plan

    Redundante Dateien: AGENTS.old.md, AGENTS.old2.md und verschiedene Prompt-Dateien sind inhaltlich nahezu identisch. Zusammenführung in eine schlanke Anleitung spart Pflegeaufwand.

    Empfehlung:

        Zentrale AGENTS.md im Root als Hauptreferenz.

        Subdirectory-AGENTS für Paket-spezifische Besonderheiten (packages/@smolitux/AGENTS.md kann stark gekürzt nur noch Befehle/Prio enthalten).

        Dokumentation: docs/wiki/Codex.md als ausführlicher Leitfaden, OPTIMIZED_CODEX.md als Kurzreferenz. Andere Prompt-Dateien zusammenführen.

        Skripte beibehalten, aber Module vereinheitlichen (z. B. Parameter für Paketliste).

        Workflows können modularisiert werden, indem z. B. Paket-Builds in Matrix-Jobs aufgeteilt werden.

3. Prompt- & Agentensystem

    Modulares Prompt-System:

        Root AGENTS.md – allgemeine Regeln, Repository-Überblick, globale „Do’s & Don’ts“.

        packages/@smolitux/*/AGENTS.md – nur paketbezogene Details (besondere Abhängigkeiten, Mocking-Hinweise).

        docs/wiki/development/prompts/ – thematische Prompts (z. B. „Component Completion“, „Issue Creation“), jedoch einheitlich nummeriert und kurz gehalten.

    Best Practices:

        Einheitlicher Aufbau für Komponenten (forwardRef, data-testid, vollständige Props, Accessibility-Tests).

        Fortschrittsdateien (COMPONENT_STATUS.md, Coverage-Dashboard) regelmäßig aktualisieren.

        Verpflichtende Befehle: npm run lint, npm test, npm run build vor jedem PR.

4. Automatisierung & DevOps

    Vereinfachtes Setup:

        Ein zentrales Skript steuert analyze → test → build → deploy für jedes Paket nacheinander.

        Fehlerausgaben werden gesammelt und mittels create_issues.sh automatisiert als GitHub-Issue eingestellt.

        Nach jedem Lauf speichert das Skript eine kurze Markdown-Zusammenfassung im Repo (z. B. LIVE_PROCESS_REPORT.md).

        Der Analyzer ermittelt fehlende Tests/Stories und ruft bei Bedarf den Completion Finisher auf.

        CI-Workflow nutzt Matrix-Jobs pro Paket, führt Analyzer + Tests aus und lädt Reports als Artefakte hoch.

        Persistente Issues: das Skript liest offene Issues und prüft nach Fix-Builds, ob sie geschlossen werden können.

    Debugging & Coverage:

        Coverage-Berichte werden pro Paket generiert (generate-coverage-dashboard.sh), in der Wiki-Doku verlinkt.

        Storybook-Builds erfolgen nur bei erfolgreichen Lint-/Test-Jobs.

    Continuous Deployment:

        Storybook wird nach erfolgreichem Build automatisch auf GitHub Pages deployed (bereits in ci.yml vorgesehen)

        .

        Builds der einzelnen Pakete (Dist-Ordner) werden als Artefakte abgelegt und könnten an einen Paket-Registry-Job angebunden werden (ohne Release).

Durch Reduktion der vielen ähnlichen Leitfäden auf wenige klar strukturierte Dateien entsteht ein konsistentes, wartbares Agenten- und Skriptsystem. Automatisierte Analyse, Issue-Erstellung und Paket-Pipeline gewährleisten kontinuierliche Qualität für alle Smolitux-UI-Pakete.

---
**🎯 This optimized guide ensures systematic, high-quality completion of the entire Smolitux UI component library while maintaining efficiency and avoiding common pitfalls. Follow this guide to achieve production-ready status with full functionality, zero errors, and complete test coverage.**
