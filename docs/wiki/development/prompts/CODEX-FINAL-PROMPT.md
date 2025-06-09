# 🚀 Smolitux UI Component Development

**Ziel:** Vervollständige Smolitux UI packages systematisch zu 100% funktionsfähigem Status.

## 📋 Package Priorität

**Arbeite in dieser Reihenfolge:**
1. **`core`** (wichtigste Basis-Komponenten)
2. **`theme`** (Styling-System)  
3. **`utils`** (Helper-Funktionen)
4. **`layout`** (Layout-Komponenten)
5. **`testing`** (Test-Utilities)

*Danach: charts, media, ai, blockchain, community, resonance, federation, voice-control*

## ⚡ Workflow pro Komponente (5 Min)

### 1. Analyse (30s)
```bash
# Check was fehlt
COMPONENT="ButtonName"  # Anpassen
PACKAGE="core"         # Anpassen

ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/
```

### 2. Implementierung (2 Min)
**Jede Komponente braucht:**

```typescript
// Component.tsx - MINIMAL Template
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ children, className, disabled, onClick, ...props }, ref) => (
    <element
      ref={ref}
      className={clsx('component', className)}
      disabled={disabled}
      onClick={onClick}
      data-testid="Component"
      {...props}
    >
      {children}
    </element>
  )
);

Component.displayName = 'Component';
export default Component;
```

### 3. Test (1.5 Min)
```typescript
// Component.test.tsx - MINIMAL Template
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component>Test</Component>);
    expect(screen.getByTestId('Component')).toBeInTheDocument();
  });

  it('handles clicks', async () => {
    const onClick = jest.fn();
    render(<Component onClick={onClick}>Test</Component>);
    
    await userEvent.click(screen.getByTestId('Component'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### 4. Story (1 Min)
```typescript
// Component.stories.tsx - MINIMAL Template
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Package/Component',
  component: Component,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Default' },
};
```

### 5. Validierung (30s)
```bash
# Quick check
npm test -- --testPathPattern="$COMPONENT" --passWithNoTests
npm run lint --workspace=@smolitux/$PACKAGE
```

## 🎯 Package-spezifische Patterns

### AI Components
```typescript
// Mock AI in tests
jest.mock('@smolitux/ai-services', () => ({
  analyze: jest.fn().mockResolvedValue({ result: 'positive' }),
}));
```

### Blockchain Components  
```typescript
// Mock wallet in tests
jest.mock('@smolitux/wallet', () => ({
  useWallet: () => ({ connected: true, address: '0x123' }),
}));
```

### Voice Control Components
```typescript
// Mock Speech API
Object.defineProperty(window, 'SpeechRecognition', {
  value: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
});
```

## ✅ Quality Checklist

**Pro Komponente:**
- [ ] TypeScript strict (no `any`)
- [ ] forwardRef pattern
- [ ] data-testid attribute
- [ ] Basic tests (render + interaction)
- [ ] Storybook story
- [ ] ESLint/TypeScript builds ohne Fehler

**Pro Package:**
- [ ] Alle Komponenten komplett
- [ ] Tests laufen durch
- [ ] Build erfolgreich
- [ ] Korrekte index.ts exports

## 🚀 Start-Strategie

### Option A: Neues Package
```bash
# 1. State checken
bash scripts/smolitux-analyzer.sh

# 2. Ein Package wählen (beginne mit core)
cd packages/@smolitux/core

# 3. Fehlende Komponenten auflisten
find src/components -type d -mindepth 1 -maxdepth 1

# 4. Eine Komponente zur Zeit abarbeiten
```

### Option B: Bulk Generation
```bash
# Wenn >50% fehlt, nutze Generator
bash scripts/smolitux-completion-finisher.sh --detailed

# Danach: Generated files manuell verbessern
```

## 📊 Progress Tracking

**Nach jeder Session:**
```bash
# Status update
echo "✅ $(date): @smolitux/$PACKAGE - $COMPONENT complete" >> PROGRESS.md

# Quick validation
npm run build && npm test
```

## ⚠️ Do's & Don'ts

**✅ DO:**
- Ein Package zur Zeit
- Templates als Startpunkt nutzen  
- Immer testen vor next component
- Build errors sofort fixen

**❌ DON'T:**
- Überspringen von Tests
- `any` types verwenden
- Breaking changes machen
- Ohne Validierung weitermachen

---

**🎯 START JETZT:** Wähle ein Package, liste fehlende Komponenten auf, und arbeite systematisch durch - 5 Minuten pro Komponente!
