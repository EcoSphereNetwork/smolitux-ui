# 🔧 @smolitux/utils - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS UTILS 100% COMPLETE
while [ "$(find packages/@smolitux/utils/src -name "*.ts" | wc -l)" -lt 15 ]; do
  bash scripts/smolitux-analyzer.sh --package=utils
  cd packages/@smolitux/utils
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE UTILITY
  UTILS=("cn" "formatters" "validators" "helpers" "guards" "dom" "async" "math" "string" "array" "object" "date" "color" "debounce" "throttle")
  
  NEXT=$(for util in "${UTILS[@]}"; do
    if [ ! -f "src/${util}.ts" ] && [ ! -f "src/${util}/index.ts" ]; then
      echo "$util"; break
    fi
  done)
  
  echo "🎯 COMPLETING UTILITY: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE UTILITY
  [IMPLEMENT_OR_IMPROVE_UTILITY]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(utils): complete $NEXT - utility functions with TypeScript"
  git push origin main
  gh pr create --title "Complete Utility: $NEXT" --body "TypeScript utility with tests and documentation"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src -name "*.ts" | wc -l)/15 Utilities"
done
echo "🎉 @smolitux/utils 100% COMPLETE!"
```

---

## 📋 **UTILS PACKAGE SPEZIFIKATIONEN:**

### **🎯 Utility Functions (15 Total):**
```
cn formatters validators helpers guards dom async math 
string array object date color debounce throttle
```

### **✅ Pro Utility REQUIRED:**
- **TypeScript:** Strict typing, generics where needed
- **Tests:** Edge cases, error handling, performance
- **JSDoc:** Complete documentation with examples
- **Tree-shakable:** Individual function exports

### **🔧 CORE Utilities PRIORITÄT:**
```typescript
// 1. cn - className utility (clsx wrapper)
export function cn(...inputs: ClassValue[]): string

// 2. formatters - Data formatting
export const formatters = {
  currency: (value: number, currency?: string) => string,
  date: (date: Date, format?: string) => string,
  number: (value: number, options?: NumberFormatOptions) => string,
  bytes: (bytes: number) => string,
  percentage: (value: number, decimals?: number) => string
}

// 3. validators - Input validation
export const validators = {
  email: (email: string) => boolean,
  url: (url: string) => boolean,
  phone: (phone: string) => boolean,
  required: (value: any) => boolean,
  minLength: (value: string, min: number) => boolean
}

// 4. guards - Type guards
export const is = {
  string: (value: unknown): value is string,
  number: (value: unknown): value is number,
  array: (value: unknown): value is unknown[],
  object: (value: unknown): value is Record<string, unknown>,
  function: (value: unknown): value is Function
}
```

### **📁 File Structure:**
```
src/
├── cn.ts                    # className utility
├── formatters/              # Data formatting utilities
│   ├── currency.ts
│   ├── date.ts
│   └── index.ts
├── validators/              # Input validation
├── guards/                  # Type guards
├── dom/                     # DOM utilities
├── async/                   # Async utilities
└── index.ts                # Main exports
```

### **🧪 TESTING Requirements:**
```typescript
// REQUIRED für jede Utility:
✅ Happy path tests
✅ Edge cases (null, undefined, empty)
✅ Error handling
✅ Performance tests (für async/dom utils)
✅ Type checking tests
```

### **📚 DOCUMENTATION:**
```typescript
/**
 * Combines class names using clsx
 * @param inputs - Class names, objects, or arrays
 * @returns Combined class string
 * @example
 * cn('base', { active: true }, ['extra']) // 'base active extra'
 */
export function cn(...inputs: ClassValue[]): string
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-utils.md`
- **DEPENDENCY:** Zero external dependencies where possible
- **PERFORMANCE:** Optimize for tree-shaking and bundle size

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
UTIL_COUNT=$(find src -name "*.ts" | wc -l)
if [ $UTIL_COUNT -lt 15 ]; then
  echo "🔄 CONTINUE: $UTIL_COUNT/15 Complete - Next utility..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 UTILITY LIBRARY COMPLETE: @smolitux/utils 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **15/15 Utilities** fully implemented
- **Zero Dependencies** (except peer deps)
- **Tree-shakable** bundle structure
- **100% Test Coverage** with edge cases
- **Complete JSDoc** documentation

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **cn Utility (Höchste Priorität):**
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### **Formatter Pattern:**
```typescript
export const formatCurrency = (
  value: number,
  currency = 'USD',
  locale = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};
```

### **Validator Pattern:**
```typescript
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-utils.md << EOF
# @smolitux/utils Status
Last Updated: $(date)
Progress: $(find src -name "*.ts" | wc -l)/15 ($(echo "scale=0; $(find src -name "*.ts" | wc -l) * 100 / 15" | bc)%)
Core Utils: $([ -f "src/cn.ts" ] && echo "✅" || echo "🔄")
Latest: $NEXT ✅
Bundle Size: Tree-shakable
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 15/15 UTILITIES = 100% UTILITY LIBRARY!**
