# 📐 @smolitux/layout - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS LAYOUT SYSTEM 100% COMPLETE
while [ "$(find packages/@smolitux/layout/src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)" -lt 12 ]; do
  bash scripts/smolitux-analyzer.sh --package=layout
  cd packages/@smolitux/layout
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE LAYOUT KOMPONENTE
  LAYOUTS=("Container" "Grid" "Flex" "Stack" "Header" "Footer" "Sidebar" "Navigation" "Section" "Page" "Divider" "Spacer")
  
  NEXT=$(for layout in "${LAYOUTS[@]}"; do
    if [ ! -f "src/components/$layout/$layout.tsx" ] || [ ! -f "src/components/$layout/$layout.test.tsx" ] || [ ! -f "src/components/$layout/$layout.stories.tsx" ]; then
      echo "$layout"; break
    fi
  done)
  
  echo "🎯 COMPLETING LAYOUT: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE LAYOUT KOMPONENTE
  [IMPLEMENT_OR_IMPROVE_LAYOUT]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(layout): complete $NEXT - responsive layout component"
  git push origin main
  gh pr create --title "Complete Layout: $NEXT" --body "Responsive layout component with TypeScript"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/12 Layout Components"
done
echo "🎉 @smolitux/layout 100% COMPLETE!"
```

---

## 📋 **LAYOUT PACKAGE SPEZIFIKATIONEN:**

### **🎯 Layout Components (12 Total):**
```
Container Grid Flex Stack Header Footer Sidebar Navigation Section Page Divider Spacer
```

### **✅ Pro Layout Component REQUIRED:**
- **Responsive:** Mobile-first design with breakpoints
- **Flexbox/Grid:** Modern CSS layout techniques
- **TypeScript:** Strict typing for layout props
- **Composable:** Components work together seamlessly
- **Accessibility:** Semantic HTML and ARIA landmarks

### **🔧 CORE Layout Components PRIORITÄT:**
```typescript
// 1. Container - Content wrapper with max-width
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  center?: boolean;
}

// 2. Grid - CSS Grid wrapper
interface GridProps {
  cols?: ResponsiveValue<number>;
  gap?: ResponsiveValue<string>;
  areas?: string;
  rows?: ResponsiveValue<number>;
}

// 3. Flex - Flexbox wrapper
interface FlexProps {
  direction?: ResponsiveValue<'row' | 'column'>;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: ResponsiveValue<string>;
  wrap?: boolean;
}

// 4. Stack - Vertical/horizontal stacking
interface StackProps {
  direction?: 'vertical' | 'horizontal';
  spacing?: ResponsiveValue<string>;
  divider?: ReactNode;
}
```

### **📁 Component Structure:**
```
src/components/
├── Container/               # Content wrapper
├── Grid/                   # CSS Grid
├── Flex/                   # Flexbox
├── Stack/                  # Stacking layout
├── Header/                 # Page header
├── Footer/                 # Page footer
├── Sidebar/                # Navigation sidebar
├── Navigation/             # Navigation component
├── Section/                # Content section
├── Page/                   # Full page layout
├── Divider/                # Content divider
└── Spacer/                 # Spacing utility
```

### **📱 RESPONSIVE Design:**
```typescript
// RESPONSIVE Values Support:
type ResponsiveValue<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

// BREAKPOINTS Integration:
const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};
```

### **🧪 TESTING Requirements:**
```typescript
// REQUIRED für jede Layout Component:
✅ Responsive behavior tests
✅ CSS Grid/Flexbox functionality
✅ Accessibility landmarks (header, nav, main, footer)
✅ Composition tests (components together)
✅ Breakpoint behavior
```

### **📚 STORYBOOK Layouts:**
```typescript
// REQUIRED Stories:
✅ Default layout
✅ Responsive examples
✅ Layout combinations
✅ Real-world page layouts
✅ Grid/Flex demonstrations
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-layout.md`
- **THEME INTEGRATION:** Use @smolitux/theme breakpoints and spacing
- **SEMANTIC HTML:** Proper landmarks and structure

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
LAYOUT_COUNT=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)
if [ $LAYOUT_COUNT -lt 12 ]; then
  echo "🔄 CONTINUE: $LAYOUT_COUNT/12 Complete - Next layout component..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 LAYOUT SYSTEM COMPLETE: @smolitux/layout 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **12/12 Layout Components** fully implemented
- **Responsive Design** across all breakpoints
- **Semantic HTML** with proper landmarks
- **CSS Grid/Flexbox** modern layout techniques
- **Component Composition** seamless integration

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **Container Component:**
```typescript
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = 'xl', padding = true, center = true, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          { 'px-4 sm:px-6 lg:px-8': padding },
          { 'mx-auto': center },
          // Max width variants
          {
            'max-w-sm': maxWidth === 'sm',
            'max-w-md': maxWidth === 'md',
            'max-w-lg': maxWidth === 'lg',
            'max-w-xl': maxWidth === 'xl',
            'max-w-2xl': maxWidth === '2xl',
            'max-w-none': maxWidth === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
```

### **Grid Component:**
```typescript
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols, gap = '4', areas, rows, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('grid', className)}
        style={{
          gridTemplateColumns: typeof cols === 'object' 
            ? undefined 
            : `repeat(${cols}, minmax(0, 1fr))`,
          gap: typeof gap === 'string' ? `var(--spacing-${gap})` : gap,
          gridTemplateAreas: areas,
          gridTemplateRows: typeof rows === 'object'
            ? undefined
            : rows ? `repeat(${rows}, minmax(0, 1fr))` : undefined,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-layout.md << EOF
# @smolitux/layout Status
Last Updated: $(date)
Progress: $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/12 ($(echo "scale=0; $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l) * 100 / 12" | bc)%)
Responsive: ✅ Mobile-first design
Latest: $NEXT ✅
Integration: @smolitux/theme compatible
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 12/12 LAYOUT COMPONENTS = 100% LAYOUT SYSTEM!**
