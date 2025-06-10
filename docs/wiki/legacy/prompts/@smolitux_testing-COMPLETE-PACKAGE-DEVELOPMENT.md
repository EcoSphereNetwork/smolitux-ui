# 🧪 @smolitux/testing - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS TESTING INFRASTRUCTURE 100% COMPLETE
while [ "$(find packages/@smolitux/testing/src -name "*.ts" -o -name "*.tsx" | wc -l)" -lt 10 ]; do
  bash scripts/smolitux-analyzer.sh --package=testing
  cd packages/@smolitux/testing
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE TEST UTILITY
  TEST_UTILS=("render" "matchers" "mocks" "a11y" "user-events" "providers" "setup" "helpers" "generators" "config")
  
  NEXT=$(for util in "${TEST_UTILS[@]}"; do
    if [ ! -f "src/${util}.ts" ] && [ ! -f "src/${util}.tsx" ] && [ ! -f "src/${util}/index.ts" ]; then
      echo "$util"; break
    fi
  done)
  
  echo "🎯 COMPLETING TEST UTILITY: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE TEST UTILITY
  [IMPLEMENT_OR_IMPROVE_TEST_UTILITY]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(testing): complete $NEXT - test infrastructure component"
  git push origin main
  gh pr create --title "Complete Test Utility: $NEXT" --body "Testing infrastructure with TypeScript support"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src -name "*.ts" -o -name "*.tsx" | wc -l)/10 Test Utils"
done
echo "🎉 @smolitux/testing 100% COMPLETE!"
```

---

## 📋 **TESTING PACKAGE SPEZIFIKATIONEN:**

### **🎯 Test Utilities (10 Total):**
```
render matchers mocks a11y user-events providers setup helpers generators config
```

### **✅ Pro Test Utility REQUIRED:**
- **TypeScript:** Strict typing for test utilities
- **Jest Integration:** Custom matchers and helpers
- **React Testing Library:** Enhanced render utilities
- **Accessibility:** jest-axe integration
- **Mocking:** Component and API mocks

### **🔧 CORE Test Utils PRIORITÄT:**
```typescript
// 1. render - Enhanced RTL render
export function render(ui: ReactElement, options?: RenderOptions): RenderResult

// 2. matchers - Custom Jest matchers
expect.extend({
  toBeAccessible: async (received: HTMLElement) => boolean,
  toHaveStyles: (received: HTMLElement, styles: CSSProperties) => boolean,
  toBeVisible: (received: HTMLElement) => boolean
})

// 3. a11y - Accessibility testing
export const a11y = {
  configure: (config: AxeConfig) => void,
  test: (container: HTMLElement) => Promise<AxeResults>,
  toHaveNoViolations: () => CustomMatcher
}

// 4. mocks - Component and data mocks
export const mocks = {
  components: { Button: MockButton, Input: MockInput },
  data: { user: mockUser, posts: mockPosts },
  apis: { fetch: mockFetch, localStorage: mockStorage }
}
```

### **📁 File Structure:**
```
src/
├── render.tsx               # Enhanced render utility
├── matchers.ts              # Custom Jest matchers
├── mocks/                   # Mock utilities
│   ├── components.tsx
│   ├── data.ts
│   └── apis.ts
├── a11y.ts                  # Accessibility testing
├── providers.tsx            # Test providers wrapper
├── generators.ts            # Test data generators
└── index.ts                # Main exports
```

### **🧪 TESTING Features:**
```typescript
// ENHANCED Render with Providers:
export const renderWithProviders = (
  ui: ReactElement,
  options?: {
    theme?: ThemeConfig;
    user?: UserEvent;
    initialState?: any;
  }
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={options?.theme}>
      {children}
    </ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};

// ACCESSIBILITY Testing:
export const testA11y = async (container: HTMLElement) => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

// CUSTOM Matchers:
toBeAccessible, toHaveStyles, toBeVisible, toHaveAttribute
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-testing.md`
- **PEER DEPS:** Jest, RTL, jest-axe als peer dependencies
- **INTEGRATION:** Funktioniert mit allen @smolitux packages

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
TEST_UTIL_COUNT=$(find src -name "*.ts" -o -name "*.tsx" | wc -l)
if [ $TEST_UTIL_COUNT -lt 10 ]; then
  echo "🔄 CONTINUE: $TEST_UTIL_COUNT/10 Complete - Next test utility..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 TEST INFRASTRUCTURE COMPLETE: @smolitux/testing 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **10/10 Test Utilities** fully implemented
- **Cross-Package Testing** support for all @smolitux packages
- **Accessibility Integration** with jest-axe
- **Custom Matchers** for better assertions
- **Complete Mock Library** for testing isolation

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **Enhanced Render:**
```typescript
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';

export const render = (ui: ReactElement, options?: RenderOptions & { theme?: ThemeConfig }) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={options?.theme}>
      {children}
    </ThemeProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};
```

### **Custom Matchers:**
```typescript
expect.extend({
  toBeAccessible: async (received: HTMLElement) => {
    const results = await axe(received);
    return {
      pass: results.violations.length === 0,
      message: () => `Expected element to be accessible`
    };
  }
});
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-testing.md << EOF
# @smolitux/testing Status
Last Updated: $(date)
Progress: $(find src -name "*.ts" -o -name "*.tsx" | wc -l)/10 ($(echo "scale=0; $(find src -name "*.ts" -o -name "*.tsx" | wc -l) * 100 / 10" | bc)%)
Test Infrastructure: $([ -f "src/render.tsx" ] && echo "✅" || echo "🔄")
Latest: $NEXT ✅
Integration: All @smolitux packages supported
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 10/10 TEST UTILITIES = 100% TEST INFRASTRUCTURE!**
